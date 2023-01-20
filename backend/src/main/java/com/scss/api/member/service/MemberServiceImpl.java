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
            logger.debug("회원 가입 성공");
            return SUCCESS;
        } catch (Exception e) {
            logger.debug("회원 가입 실패 [아이디 혹은 이메일 중복]");
            return FAIL;
        }
    }


    @Override
    public MemberDto memberInfo(String id) {

        return memberMapper.memberInfo(id);
    }
}
