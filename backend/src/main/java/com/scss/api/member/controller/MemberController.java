package com.scss.api.member.controller;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.dto.UniqueDto;
import com.scss.api.member.service.JWTService;
import com.scss.api.member.service.MemberService;
import com.scss.api.member.util.EmailService;
import com.scss.api.member.util.EncryptService;
import com.scss.api.member.util.RedisService;
import java.lang.reflect.Member;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.sun.org.apache.xpath.internal.operations.Bool;
import io.jsonwebtoken.Claims;
import javax.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping( "/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    //private static final int SALT_SIZE = 16;

    private final MemberService memberService;
    private final JWTService jwtService;
    private final EncryptService encryptService;
    private final EmailService emailService;
    private final RedisService redisService;

    /** 회원 가입 **/
    @PostMapping("/member")
    public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto)
            throws NoSuchAlgorithmException {
        String password = memberDto.getPassword(); // 암호화 전 비밀번호
        String salt = encryptService.newSalt(); // 암호용 난수
        String hex = encryptService.encryptPassword(password, salt); // 암호화 후 비밀번호

        logger.debug("[signUp]암호화 후 비밀번호 : {}", hex);
        memberDto.setPassword(hex); // 설정된 DTO가 DB에 반영될 예정
        memberDto.setSalt(salt); // salt 값을 기록. 로그인 처리시 비밀번호 검증시 사용

        Map<String, String> resultMap = new HashMap<>();

        if (memberService.signUp(memberDto).equals(SUCCESS)) {
            resultMap.put("message", "회원 가입 성공");
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put("message", "회원 가입 실패");
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
        }
    }

    /** 로그인 : 아이디, 비밀번호 일치시 토큰 생성 **/
    // ToDo : refreshtoken Redis에 저장하기 (key: 'refreshToken:사용자 id', value: refreshToken)
    @PostMapping("/member/login")
    public ResponseEntity<?> logIn(@RequestBody Map<String, String> paramMap)
            throws NoSuchAlgorithmException {
        Map<String, String> resultmap = new HashMap<>(); // 결과를 담는 자료구조
        try {
            MemberDto memberDto = memberService.memberInfo(paramMap.get("id")); // member를 DB에서 조회

            String password = paramMap.get("password"); // 암호화 전 비밀번호
            String salt = memberDto.getSalt(); // DTO에 저장된 salt 값 불러오기
            String hex = encryptService.encryptPassword(password, salt); // 암호화 후 비밀번호

            logger.debug("[logIn]로그인 시도 비번 : {}", hex);
            logger.debug("[logIn]기존   비밀번호 : {}", memberDto.getPassword());

            if (hex.equals(memberDto.getPassword())) { // DB에 저장되어있는 비밀번호와 새롭게 들어온 비밀번호와 같은지 비교
                String accessToken = jwtService.createToken(paramMap.get("id"), "accesstoken",
                        (5 * 1000 * 60)); // 5분
                String refreshToken = jwtService.createToken(paramMap.get("id"), "refreshtoken",
                        (10 * 1000 * 60)); // 10분
                resultmap.put("accesstoken", accessToken);
                resultmap.put("refreshtoken", refreshToken);

                // Redis에 회원 id 값으로, refreshToken 저장
                String refreshTokenKey = "refreshToken:"+memberDto.getId();
                redisService.setRefreshTokenWithRedis(refreshTokenKey, refreshToken);
                logger.debug("[logIn]Redis에 refreshToken 저장완료 id : {}, token : {}", memberDto.getId(), refreshToken);

                logger.debug("[logIn]로그인 성공");
                logger.debug("accesstoken : {}", accessToken);
                logger.debug("refreshtoken : {}", refreshToken);
                return new ResponseEntity<Map>(resultmap, HttpStatus.OK);
            } else {
                logger.debug("[logIn]비밀번호 불일치!!!");
                resultmap.put("message", "아이디나 비밀번호가 잘못되었습니다.");
                return new ResponseEntity<>(resultmap, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            logger.debug("[logIn]아이디가 존재하지 않습니다.");
            resultmap.put("message", "아이디나 비밀번호가 잘못되었습니다.");
            return new ResponseEntity<>(resultmap, HttpStatus.UNAUTHORIZED);
        }
    }

    /** 회원 정보 **/
    // ToDo : accesstoken 검증 로직 추가하기
    @GetMapping("/member")
    public ResponseEntity<?> memberInfo(@RequestParam("id") String id) {
        logger.debug("memberInfo() is called // member id : {}", id);
        Map<String, Object> resultMap = new HashMap<>(); // 결과를 담는 자료구조

        MemberDto memberDto = memberService.memberInfo(id); // id값과 일치하는 회원정보 조회
        if (memberDto != null) {
            System.out.println(memberDto);
            resultMap.put("data", memberDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            logger.debug("[memberInfo]아이디가 존재하지 않습니다.");
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    /** 아이디 찾기 : 이름과 이메일로 아이디 찾기 **/
    @PostMapping("/member/id")
    public ResponseEntity<?> findId(@RequestBody HashMap<String, String> map) {
        String id = memberService.findId(map); // 이름과 이메일이 담겨있는 map을 넘겨주어 일치하는 아이디 값을 가져온다.

        if (id != null) {
            return new ResponseEntity<String>(id,HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    /** 회원 정보 수정 **/
    @PatchMapping("/member")
    public ResponseEntity<?> modify(@RequestBody HashMap<String, String> param, HttpServletRequest request) {

        Cookie[] list = request.getCookies(); // 클라이언트에서 넘어온 토큰 리스트
        for (Cookie cookie : list) {
            if (cookie.getName().equalsIgnoreCase("accesstoken")) { // 토큰 이름이 accesstoken일 때
                String accessToken = cookie.getValue(); // 쿠키에서 accessToken 파싱
                Claims claims = jwtService.getToken(accessToken); // accessToken에서 Claims 파싱
                String id = (String) claims.get("member_id"); // accessToken에서 회원 id 파싱

                MemberDto memberDto = memberService.memberInfo(id);

                logger.debug("[modify]수정 전 : {}", memberDto);
                if (param.get("nickname") != null) memberDto.setNickname(param.get("nickname")); // null 이 넘어오면 수정 x (기존 값 유지)
                if (param.get("email") != null) memberDto.setEmail(param.get("email"));
                if (param.get("profile_image") != null) memberDto.setProfile_image(param.get("profile_image"));
                logger.debug("[modify]수정 후 : {}", memberDto);

                Map<String, String> resultMap = new HashMap<>();

                if (memberService.modify(memberDto).equals(SUCCESS)) {
                    resultMap.put("message", "성공");
                    return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
                } else {
                    resultMap.put("message", "권한이 없습니다");
                    return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
                }
            }
        }
        return null;
    }

    /** 비밀번호 수정 **/
    @PatchMapping("/member/password")
    public ResponseEntity<?> modifyPassword(@RequestBody HashMap<String, String> param, HttpServletRequest request) {
        String newPassword = param.get("new_password"); // 클라이언트에서 넘어온 변경하고자 하는 비밀번호
        logger.debug("변경하고자 하는 비밀번호 : {}", newPassword);

        Map<String, String> resultMap = new HashMap<>(); // 결과를 담을 자료구조
        Cookie[] list = request.getCookies(); // 클라이언트에서 넘어온 토큰 리스트
        for (Cookie cookie : list) {
            if (cookie.getName().equalsIgnoreCase("accesstoken")) { // 토큰 이름이 accesstoken일 때
                String accessToken = cookie.getValue(); // 쿠키에서 accessToken 파싱
                Claims claims = jwtService.getToken(accessToken); // accessToken에서 Claims 파싱
                if (claims != null) {
                    String id = (String) claims.get("member_id"); // accessToken에서 회원 id 파싱

                    logger.debug("회원 아이디 : {}", id);

                    MemberDto memberDto = memberService.memberInfo(id); // DB에서 회원 정보 조회

                    memberDto.setPassword(newPassword);

                    if (memberService.modifyPassword(memberDto).equals(SUCCESS)) {
                        resultMap.put("message", "성공");
                        return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
                    } else {
                        resultMap.put("message", "실패");
                        return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
                    }
                } else {
                    resultMap.put("message", "토큰 정보가 유효하지 않거나 토큰이 만료되었습니다");
                    return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
                }
            }
        }
        return null; // \\ 이렇게 두는게 맞을까?? //
    }


    /** 아이디, 이메일, 닉네임 중복 검사 **/
    @GetMapping("/unique/{type}/{param}")
    public ResponseEntity<?> duplicateParam(@PathVariable String type, @PathVariable String param) {
        UniqueDto uniqueDto = new UniqueDto(); // 중복여부를 관리하는 DTO
        uniqueDto.setType(type);
        uniqueDto.setParam(param);

        String result = memberService.uniqueParam(uniqueDto); // DB에서 해당 param이 있는지 조회 (값이 있다면 중복임)

        Map<String, Object> resultMap = new HashMap<>(); // 결과를 담는 자료구조

        if (result == null) { // 중복이 존재하지 않는 경우 unique = true
            resultMap.put("unique", true);
            resultMap.put("message", "사용 가능한 " + uniqueDto.getType() + " 입니다");
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } else { // 중복인 경우 unique = false
            resultMap.put("unique", false);
            resultMap.put("message", "이미 존재하는 " + uniqueDto.getType() + " 입니다");
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        }
    }

    /** 비밀번호 초기화 **/
    @PostMapping("/member/password")
    public ResponseEntity<?> initPassword(@RequestBody Map<String, String> paramMap)
            throws MessagingException {

        logger.debug("paramMap : {}", paramMap);
        String mail = paramMap.get("email"); // 받는 사람 주소
        String id = paramMap.get("id"); // 회원 아이디

        emailService.sendEmail(id, mail);

        return new ResponseEntity<String>("응답임", HttpStatus.OK);
    }

}
