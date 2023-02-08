package com.sccs.api.member.service;


import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.member.dto.UniqueDto;
import java.util.Map;


public interface MemberService {

  public String signUp(MemberDto memberDto);

  public MemberDto memberInfo(String id);

  public String findId(Map<String, String> map);

  public String modify(MemberDto memberDto);

  public String modifyPassword(MemberDto memberDto);

  public String uniqueParam(UniqueDto uniqueDto);

  public String delete(String id);
}
