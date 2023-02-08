package com.sccs.api.member.mapper;

import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.member.dto.UniqueDto;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MemberMapper {

  public void signUp(MemberDto memberDto);

  public MemberDto memberInfo(String id);

  public String findId(Map<String, String> map);

  public void modify(MemberDto memberDto);

  public void modifyPassword(MemberDto memberDto);

  public String uniqueParam(UniqueDto uniqueDto);

  public void delete(String id);
}
