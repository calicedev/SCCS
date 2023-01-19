package com.scss.api.member.controller;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final MemberService memberService;


    @PostMapping("/member")
    public ResponseEntity<?> signup(@RequestBody MemberDto memberDto) {

        logger.debug("memberDto", memberDto);

        if (memberService.signup(memberDto).equals(SUCCESS)) {
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<Boolean>(false, HttpStatus.NO_CONTENT);
        }
    }
}
