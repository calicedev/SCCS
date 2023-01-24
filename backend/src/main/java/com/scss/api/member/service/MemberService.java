package com.scss.api.member.service;


import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.dto.UniqueDto;

import java.util.Map;


public interface MemberService {

    public String signUp(MemberDto memberDto);
    public MemberDto memberInfo(String id);
    public String findId(Map<String, String> map);
    public String modify(MemberDto memberDto);
    public String modifyPassword(MemberDto memberDto);
    public String uniqueParam(UniqueDto uniqueDto);
}
