package com.scss.api.member.controller;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.service.JWTService;
import com.scss.api.member.service.MemberService;
import java.lang.reflect.Member;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final int SALT_SIZE = 16;

    private final MemberService memberService;
    private final JWTService jwtService;

    // 회원 가입
    @PostMapping("/member")
    public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto)
            throws NoSuchAlgorithmException {

        String password = memberDto.getPassword(); // 암호화 전 비밀번호
        String hex = ""; // 암호화 후 비밀번호
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG"); // 암호용을 강화된 난수 생성 객체
        byte[] bytes = new byte[16];
        random.nextBytes(bytes); // 암호용 난수 바이트 생성

        String salt = new String(Base64.getEncoder().encode(bytes)); // 암호용 난수 생성
        String rawAndSalt = password + salt; // 암호화 전 비밀번호 + 암호용 난수
        MessageDigest md = MessageDigest.getInstance("SHA-256"); // 암호화 알고리즘 선택

        // 평문 + 암호화
        md.update(rawAndSalt.getBytes()); // 암호화 전 비밀번호 + 암호용 난수 ==> 해쉬
        hex = String.format("%064x", new BigInteger(1, md.digest())); // 16진수 64바이트로 암호화 후 비밀번호 생성
        logger.debug("암호화 후 비밀번호 : {}", hex);

        memberDto.setPassword(hex);
        memberDto.setSalt(salt);

        Map<String, String> resultMap = new HashMap<>();

        if (memberService.signUp(memberDto).equals(SUCCESS)) {
            resultMap.put("message", "회원 가입 성공");
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put("message", "회원 가입 실패");
            return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
        }
    }

    // 로그인 : 아이디, 비밀번호 일치시 토큰 생성
    @PostMapping("/member/login")
    public ResponseEntity<?> logIn(@RequestBody Map<String, String> paramMap)
            throws NoSuchAlgorithmException {
        Map<String, String> resultmap = new HashMap<>(); // 결과를 담는 자료구조

        try {
            MemberDto memberDto = memberService.memberInfo(paramMap.get("id")); // member를 DB에서 조회

            String password = paramMap.get("password");
            String salt = memberDto.getSalt();
            String rawAndSalt = password + salt;
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            String hex = "";
            // 평문 + 암호화
            md.update(rawAndSalt.getBytes());
            hex = String.format("%064x", new BigInteger(1, md.digest()));
            if (hex.equals(memberDto.getPassword())) {
                String accessToken = jwtService.createToken(paramMap.get("id"), "access",
                        (2 * 1000 * 60));
                String refreshToken = jwtService.createToken(paramMap.get("id"), "refresh",
                        (5 * 1000 * 60));
                resultmap.put("accessToken", accessToken);
                resultmap.put("refreshToken", refreshToken);

                logger.debug("로그인 성공");
                logger.debug("accessToken:: {}", accessToken);
                logger.debug("refreshToken:: {}", refreshToken);
                return new ResponseEntity<Map>(resultmap, HttpStatus.OK);
            } else {
                logger.debug("비밀번호 불일치!!!");
                resultmap.put("message", "아이디나 비밀번호가 잘못되었습니다.");
                return new ResponseEntity<>(resultmap, HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            logger.debug("아이디가 존재하지 않습니다.");
            resultmap.put("message", "아이디나 비밀번호가 잘못되었습니다.");
            return new ResponseEntity<>(resultmap, HttpStatus.UNAUTHORIZED);
        }
    }

    // 회원 정보
    @GetMapping("/member")
    public ResponseEntity<?> memberInfo(@RequestParam("id") String id) {
        logger.debug("memberInfo() is called // member id : {}", id);

        Map<String, Object> resultMap = new HashMap<>();

        MemberDto memberDto = memberService.memberInfo(id);
        if (memberDto != null) {
            System.out.println(memberDto);
            resultMap.put("data", memberDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            logger.debug("아이디가 존재하지 않습니다.");
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }

    // 아이디 찾기 : 이름과 이메일로 아이디 찾기
    @PostMapping("/member/id")
    public ResponseEntity<?> findId(@RequestBody HashMap<String, String> map) {

        String id = memberService.findId(map);

        if (id != null) {
            return new ResponseEntity<String>(id,HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }

    }

    // 토큰 검증


}
