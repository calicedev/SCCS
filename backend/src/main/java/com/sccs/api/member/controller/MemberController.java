package com.sccs.api.member.controller;

import com.amazonaws.util.IOUtils;
import com.sccs.api.aws.dto.FileDto;
import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.member.dto.UniqueDto;
import com.sccs.api.member.service.JWTService;
import com.sccs.api.member.service.MemberService;
import com.sccs.api.member.util.CookieService;
import com.sccs.api.member.util.EmailService;
import com.sccs.api.member.util.EncryptService;
import com.sccs.api.member.util.RedisService;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@RestController
@RequestMapping("/api")
@Api(tags = "회원 컨트롤러 API")
@RequiredArgsConstructor
public class MemberController {

  private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private static final int MINUTE = 1000 * 60; // 1분
  private static final int HOUR = MINUTE * 60; // 1시간
  private static final int DAY = HOUR * 24; // 24시간
  private static final int WEEK = DAY * 7; // 1주일
  private static final String HEADER_AUTH = "authorization";

  private final MemberService memberService;
  private final JWTService jwtService;
  private final EncryptService encryptService;
  private final EmailService emailService;
  private final RedisService redisService;
  private final CookieService cookieService;
  private final AwsS3Service awsS3Service;

  /**
   * 회원 가입
   **/
  @PostMapping("/member")
  @ApiOperation(value = "회원 가입", notes = "아이디, 이름, 닉네임, 이메일, 비밀번호를 매개변수로 받습니다.")
  @ApiResponses({
          @ApiResponse(code = 200, message = "회원 가입 성공"),
          @ApiResponse(code = 401, message = "회원 가입 실패")
  })
//  @ApiImplicitParams({
//          @ApiImplicitParam(name = "id", value = "아이디", required = true),
//          @ApiImplicitParam(name = "name", value = "이름", required = true),
//          @ApiImplicitParam(name = "nickname", value = "닉네임", required = true),
//          @ApiImplicitParam(name = "email", value = "이메일", required = true),
//          @ApiImplicitParam(name = "password", value = "비밀번호", required = true),
//  })
  public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto)
      throws NoSuchAlgorithmException {
    Map<String, String> resultMap = new HashMap<>();

    String password = memberDto.getPassword(); // 암호화 전 비밀번호
    String salt = encryptService.newSalt(); // 암호용 난수
    String hex = encryptService.encryptPassword(password, salt); // 암호화 후 비밀번호

    memberDto.setPassword(hex); // 설정된 DTO가 DB에 반영될 예정
    memberDto.setSalt(salt); // salt 값을 기록. 로그인 처리시 비밀번호 검증시 사용

    if (memberService.signUp(memberDto).equals(SUCCESS)) {
      logger.debug("[signUp]회원 가입 성공");
      resultMap.put("message", "성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK); // 200
    } else {
      logger.debug("[signUp]회원 가입 실패");
      resultMap.put("message", "실패");
      return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED); // 401
    }
  }

  /**
   * 로그인 : id, password 일치시 토큰 생성
   **/
  @PostMapping("/member/login")
  public ResponseEntity<?> logIn(@RequestBody Map<String, String> paramMap,
      HttpServletResponse response) {
    Map<String, Object> resultmap = new HashMap<>();

    try {
      MemberDto memberDto = memberService.memberInfo(paramMap.get("id")); // memberDto를 DB에서 조회

      String password = paramMap.get("password"); // 암호화 전 비밀번호
      String salt = memberDto.getSalt(); // DTO에 저장된 salt 값 불러오기
      String hex = encryptService.encryptPassword(password, salt); // 암호화 후 비밀번호

//      logger.debug("[logIn]로그인 시도 비번 : {}", hex);
//      logger.debug("[logIn]기존   비밀번호 : {}", memberDto.getPassword());

      if (hex.equals(memberDto.getPassword())) { // DB에 저장되어있는 비밀번호와 새롭게 들어온 비밀번호와 같은지 비교
        logger.debug("[logIn]로그인 성공");

        String accessToken = jwtService.createToken(paramMap.get("id"), "accessToken",
                (HOUR * 9));
        long exp = System.currentTimeMillis() + (HOUR * 9);
        String refreshToken = jwtService.createToken(paramMap.get("id"), "refreshToken",
                (HOUR * 10));

//        resultmap.put("accessToken", accessToken);
//        resultmap.put("refreshToken", refreshToken);

        // 쿠키 생성
        Cookie accessTokenCookie = cookieService.createCookie("accessToken", accessToken);
        Cookie refreshTokenCookie = cookieService.createCookie("refreshToken", refreshToken);

        // Redis에 리프레쉬 토큰 저장
        try {
          redisService.setRefreshTokenWithRedis(refreshToken,
              memberDto.getId()); // vDeXz2onv3wFn : ssafy
          logger.debug("[logIn]레디스 리프레시토큰 저장완료");
        } catch (Exception e) {
          logger.error("[login]레디스 값 저장 실패, {}", e.getMessage());
          return new ResponseEntity<>(resultmap, HttpStatus.BAD_GATEWAY);
        }
        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

//        Claims claims = jwtService.getToken(accessToken);
//        String exp = (String) jwtService.getToken(accessToken).get("expiration");

        logger.debug("[login]로그인 성공");
        resultmap.put("message", "성공");
        resultmap.put("expiration", exp);
        return new ResponseEntity<>(resultmap, HttpStatus.OK); // 200
      } else {
        logger.debug("[logIn]비밀번호 불일치");
        resultmap.put("message", "아이디나 비밀번호가 잘못되었습니다.");
        return new ResponseEntity<>(resultmap, HttpStatus.UNAUTHORIZED); // 401
      }
    } catch (Exception e) {
      logger.debug("[logIn]아이디가 존재하지 않습니다.");
      resultmap.put("message", "아이디나 비밀번호가 잘못되었습니다.");
      return new ResponseEntity<>(resultmap, HttpStatus.UNAUTHORIZED); // 401
    }
  }

  /**
   * 회원 정보
   * Auth
   **/
  @GetMapping("/member")
  public ResponseEntity<?> memberInfo(HttpServletRequest request) { // @CookieValue String accessToken
    Map<String, Object> resultMap = new HashMap<>();


    logger.info("회원정보 조회 컨트롤러 입장 !!");
    Cookie[] cookies = request.getCookies();
    logger.debug("쿠키에서 값 가져오기 1!!! : {}", cookies[0].getName());
    String accessToken = cookies[0].getValue();

    // 헤더 방식
    // final String token = request.getHeader(HEADER_AUTH).substring("Bearer ".length()); // 헤더에서 토큰 파싱
    // String id = (String) jwtService.getToken(token).get("id"); // 회원 아이디를 accessToken에서 파싱

    String id = (String) jwtService.getToken(accessToken).get("id");
    MemberDto memberDto = memberService.memberInfo(id);

    if (memberDto != null) { // 회원 정보 반환
      resultMap.put("id", memberDto.getId());
      resultMap.put("name", memberDto.getName());
      resultMap.put("nickname", memberDto.getNickname());
      resultMap.put("email", memberDto.getEmail());
      resultMap.put("profileImage", memberDto.getProfileImage());
      resultMap.put("score", memberDto.getScore());
      resultMap.put("joinDate", new SimpleDateFormat("yyyy-MM-dd").format(memberDto.getJoinDate()));

      logger.debug("[memberInfo]회원 정보 조회 성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK); // 200
    } else { // id가 없는 경우
      logger.debug("[memberInfo]회원이 존재하지 않습니다.");
      resultMap.put("message", "회원이 존재하지 않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND); // 404
    }
  }

  /**
   * 아이디 찾기 : name, password 일치시 로직 실행
   **/
  @PostMapping("/member/id")
  public ResponseEntity<?> findId(@RequestBody HashMap<String, String> map) {
    String id = memberService.findId(map); // name과 email로 id 찾기

    if (id != null) {
      logger.debug("[findId]아이디 찾기 성공");
      return new ResponseEntity<>(id, HttpStatus.OK); // 200
    } else {
      logger.debug("[findId]회원정보가 존재하지 않습니다.");
      HashMap<String, String> resultMap = new HashMap<>();
      resultMap.put("message" , "회원정보가 존재하지 않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND); // 404
    }
  }

  /**
   * 회원 정보 수정
   * Auth
   **/
  @PatchMapping("/member")
  public ResponseEntity<?> modify(String email,
      String nickname, MultipartFile mfile,
      @CookieValue String accessToken) throws IOException {
    Map<String, String> resultMap = new HashMap<>();

    Claims claims = jwtService.getToken(accessToken);   // accessToken에서 Claims 파싱
    String id = (String) claims.get("id");              // accessToken에서 회원 id 파싱

    MemberDto memberDto = memberService.memberInfo(id);

    FileDto fileDto = null;

    logger.debug("[modify]회원정보 수정 전 : {}", memberDto);

    if (mfile != null) {
      fileDto = awsS3Service.upload(mfile, "sccs");

      logger.info("[modify]파일이름 : {}", fileDto.getFileName());
      logger.info("[modify]파일경로 : {}", fileDto.getUrl());
      memberDto.setProfileImage(fileDto.getUrl());
    }
      if (nickname != null || !nickname.equals("")) {
          memberDto.setNickname(nickname);
      }
      if (email != null || !email.equals("")) {
          memberDto.setEmail(email);
      }
    logger.debug("[modify]회원정보 수정 후 : {}", memberDto);

    if (memberService.modify(memberDto).equals(SUCCESS)) {
      logger.debug("[modify]회원정보 수정 성공");
      resultMap.put("message", "성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK); // 200
    } else {
      logger.debug("[modify]회원정보 수정 실패");
      resultMap.put("message", "실패");
      return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED); // 401
    }
  }

  /**
   * 비밀번호 수정
   * Auth
   **/
  @PatchMapping("/member/password")
  public ResponseEntity<?> modifyPassword(@RequestBody HashMap<String, String> paramMap,
      @CookieValue String accessToken) {
    String newPassword = paramMap.get("newPassword"); // 변경하고자 하는 비밀번호
    logger.debug("[modifyPassword]변경하고자 하는 비밀번호 : {}", newPassword);

    Map<String, String> resultMap = new HashMap<>();

    Claims claims = jwtService.getToken(accessToken);
    String id = null;
      if (claims != null) {
          id = (String) claims.get("id"); // accessToken에서 회원 id 파싱
      }

    MemberDto memberDto = memberService.memberInfo(id); // DB에서 회원 정보 조회
    memberDto.setPassword(newPassword); // modifyPassword 에서 암호화 하기 때문에 여기선 세팅만 해준다.

    if (memberService.modifyPassword(memberDto).equals(SUCCESS)) {
      logger.debug("[modifyPassword]비밀번호 수정 성공");
      resultMap.put("message", "성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK); // 200
    } else {
      logger.debug("[modifyPassword]비밀번호 수정 실패");
      resultMap.put("message", "실패");
      return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED); // 401
    }
  }


  /**
   * 아이디, 이메일, 닉네임 중복 검사
   **/
  @GetMapping("/unique/{type}/{param}")
  public ResponseEntity<?> duplicateParam(@PathVariable String type, @PathVariable String param) {
    UniqueDto uniqueDto = new UniqueDto(); // 중복여부를 관리하는 DTO
    uniqueDto.setType(type);
    uniqueDto.setParam(param);

    String result = memberService.uniqueParam(uniqueDto); // DB에서 해당 param이 있는지 조회 (값이 있다면 중복임)

    Map<String, Object> resultMap = new HashMap<>();

    if (result == null) { // 중복이 존재하지 않는 경우 unique = true
      logger.debug("[duplicateParam]사용 가능한 {}입니다.", uniqueDto.getType());
      resultMap.put("unique", true);
      resultMap.put("message", "사용 가능한 " + uniqueDto.getType() + " 입니다");
      return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
    } else { // 중복인 경우 unique = false
      logger.debug("[duplicateParam]이미 존재하는 {}입니다.", uniqueDto.getType());
      resultMap.put("unique", false);
      resultMap.put("message", "이미 존재하는 " + uniqueDto.getType() + "입니다");
      return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
  }

  /**
   * 비밀번호 초기화
   **/
  @ApiOperation(value = "비밀번호 초기화 with 구글메일", notes = "이메일과 아이디를 입력한다. 그리고 이메일 전송 성공여부에 따라 '성공' 또는 '실패' 문자열을 반환한다.", response = String.class)
  @PostMapping("/member/password")
  public ResponseEntity<?> initPassword(
      @RequestBody @ApiParam(value = "아이디와 이메일", required = true) Map<String, String> paramMap)
      throws MessagingException {
    String email = paramMap.get("email"); // 받는 사람 주소
    String id = paramMap.get("id"); // 회원 아이디

    HashMap<String, String> resultMap = new HashMap();

    MemberDto memberDto = memberService.memberInfo(id);

    if (memberDto == null) {
      logger.debug("[initPassword]유효하지 않은 아이디 입니다.");
      resultMap.put("message", "유효하지 않은 아이디 입니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
    }

    if (!memberDto.getEmail().equals(email)) {
      logger.debug("[initPassword]이메일 정보가 일치하지 않습니다.");
      resultMap.put("message", "이메일 정보가 일치하지 않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
    }

    if (emailService.sendEmail(id, email)) {
      logger.debug("[initPassword]비밀번호 초기화 성공");
      resultMap.put("message", "성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    logger.debug("[initPassword]비밀번호 초기화 실패");
    resultMap.put("message", "실패");
    return new ResponseEntity<>(resultMap, HttpStatus.OK);
  }

  /**
   * access-token 재발급
   **/
  @GetMapping("/member/refreshToken")
  public ResponseEntity<?> refreshToken(@CookieValue String refreshToken, HttpServletResponse response) {
    HashMap<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.OK;

    if (jwtService.checkToken(refreshToken)) {
      Claims claims = jwtService.getToken(refreshToken);
      String id = (String) claims.get("id");
      logger.debug("[refreshToken]토큰 인증 성공");
      if (id.equals(redisService.getRefreshTokenWithRedis(refreshToken))) {
        logger.debug("[refreshToken]레디스에서 토큰 조회 성공");
        String newAccessToken = jwtService.createToken(id, "accessToken", 9 * HOUR);

        long exp = System.currentTimeMillis() + (HOUR * 9);

        // 토큰 생성
        Cookie accessTokenCookie = cookieService.createCookie("accessToken", newAccessToken);

        // 엑세스 토큰 세팅
        response.addCookie(accessTokenCookie);

        resultMap.put("message", SUCCESS);
        resultMap.put("expiration", exp);
      }
    } else {
      logger.debug("리프레쉬 토큰 사용 불가");
      resultMap.put("message", "리프레쉬 토큰 사용 불가 \n 로그인 페이지로 이동하세요");
      status = HttpStatus.UNAUTHORIZED;
    }
    return new ResponseEntity<>(resultMap, status);
  }

  @DeleteMapping("/member")
  public ResponseEntity<?> delete(@CookieValue String accessToken) {
    HashMap<String, String> resultMap = new HashMap<>();

    Claims claims = jwtService.getToken(accessToken);
    String id = (String) claims.get("id");

    if (memberService.delete(id).equals(SUCCESS)) {
      logger.debug("[delete]회원 탈퇴 성공");
      resultMap.put("message", "성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    logger.debug("[delete]회원 탈퇴 실패");
    resultMap.put("message", "실패");
    return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED);
  }


  /**
   * 레디스 특정 키 값 삭제
   */
  @DeleteMapping ("/member/refreshToken")
  public ResponseEntity<?> deleteRefreshToken(@CookieValue String refreshToken) {
    HashMap<String, String> resultMap = new HashMap<>();
    if (redisService.deleteKey(refreshToken) == SUCCESS) {
      logger.debug("deleteRefreshToken레디스 값 삭제 성공");
      resultMap.put("message", "성공");
      return new ResponseEntity<>(resultMap, HttpStatus.OK);
    } else {
      logger.debug("[deleteRefreshToken]레디스 값 삭제 실패");
      resultMap.put("message", "실패");
      return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * 레디스 전체 키 개수 조회
   **/
  @GetMapping("/redisKeys")
  public ResponseEntity<?> showRedisKeys() {
    int result = redisService.showAllKeys();
    return new ResponseEntity<>("모든 키 조회 성공: " + result + "개", HttpStatus.OK);
  }

  /**
   * 레디스 전체 키-밸류 삭제
   **/
  @DeleteMapping("/redisKeys")
  public ResponseEntity<?> deleteKeys() {
    redisService.deleteAllKeys();
    return new ResponseEntity<>("모든 키 삭제 성공", HttpStatus.OK);
  }

}
