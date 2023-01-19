package com.scss.api.member.service;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.mapper.MemberMapper;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    // 생성자 주입
    private final MemberMapper memberMapper;


    // 회원 가입
    @Override
    public String signUp(MemberDto memberDto) {
        try {
            memberMapper.signUp(memberDto);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return FAIL;
        }
    }

    // 로그인
    @Override
    public String logIn(Map<String, Object> map) {
        logger.debug("{}", map.get("id"));
        if (memberMapper.logIn(map) != null) {
            return SUCCESS;
        } else {
            return FAIL;
        }
    }
}
