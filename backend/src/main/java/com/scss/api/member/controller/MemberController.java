package com.scss.api.member.controller;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.service.JWTService;
import com.scss.api.member.service.MemberService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final MemberService memberService;
    private final JWTService jwtService;


    @PostMapping("/member")
    public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto) {

        logger.debug("memberDto: {}", memberDto);
        logger.debug("id: {}",memberDto.getId());

        if (memberService.signUp(memberDto).equals(SUCCESS)) {
            String accessToken = jwtService.createToken(memberDto.getId());
            logger.debug("토큰 생성: {}", accessToken);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
        }
    }

    // 토큰 검증
    @PostMapping("/member/login")
    public ResponseEntity<?> logIn(@RequestBody Map<String, Object> map) {
        // 아이디와 비밀번호 확인 후 토큰 리턴
        String id = (String) map.get("id");
        String password = (String) map.get("password");
        logger.debug("id: {} ", id);
        logger.debug("password: {}", password);

        Map<String, String> resultmap = new HashMap<>();


        if (memberService.logIn(map).equals(SUCCESS)) {
            resultmap.put("accessToken", "dvdorvndftobjdfipvkjfdoigjdfiojbvfdoijv");
            resultmap.put("refreshToken", "cvcxiovjxcovcjxoivjxcoivjcxoivjxocijvcxo");
            return ResponseEntity.ok().body(resultmap);
        } else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }


}
