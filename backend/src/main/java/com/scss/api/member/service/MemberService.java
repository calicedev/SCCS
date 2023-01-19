package com.scss.api.member.service;


import com.scss.api.member.dto.MemberDto;
import java.util.Map;


public interface MemberService {

    public String signUp(MemberDto memberDto);

    public String logIn(Map<String, Object> map);
}
