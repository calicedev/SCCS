package com.scss.api.member.service;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.mapper.MemberMapper;

import java.math.BigInteger;
import java.security.MessageDigest;
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

    // 회원 정보 조회
    @Override
    public MemberDto memberInfo(String id) {
        return memberMapper.memberInfo(id);
    }

    // 아이디 찾기
    @Override
    public String findId(Map<String, String> map) {
        return memberMapper.findId(map);
    }

    // 회원 정보 수정
    @Override
    public String modify(MemberDto memberDto) {
        try {
            memberMapper.modify(memberDto);
            logger.debug("회원 정보 수정 성공");
            return SUCCESS;
        } catch (Exception e) {
            logger.debug("회원 정보 수정 실패");
            return FAIL;
        }
    }

    // 비밀번호 수정
    @Override
    public String modifyPassword(MemberDto memberDto) {
        try {
            // 비밀번호 암호화
            String password = memberDto.getPassword();

            String hex = "";
            String salt = memberDto.getSalt();
            String rawAndSalt = password + salt;
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            md.update(rawAndSalt.getBytes());
            hex = String.format("%064x", new BigInteger(1, md.digest()));
            memberDto.setPassword(hex);


            memberMapper.modifyPassword(memberDto);
            logger.debug("비밀번호 수정 성공");
            return SUCCESS;
        } catch (Exception e) {
            logger.debug("비밀번호 수정 실패");
            return FAIL;
        }
    }
}
