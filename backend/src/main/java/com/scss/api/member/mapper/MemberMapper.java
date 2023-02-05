package com.scss.api.member.mapper;

import com.scss.api.member.dto.MemberDto;
import java.lang.reflect.Member;
import java.util.Map;

import com.scss.api.member.dto.UniqueDto;
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
