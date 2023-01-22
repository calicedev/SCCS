package com.scss.api.member.service;


import com.scss.api.member.dto.MemberDto;
import java.util.Map;


public interface MemberService {

    public String signUp(MemberDto memberDto);

    public MemberDto memberInfo(String id);

    public String findId(Map<String, String> map);
}
