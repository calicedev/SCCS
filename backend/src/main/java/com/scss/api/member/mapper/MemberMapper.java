package com.scss.api.member.mapper;

import com.scss.api.member.dto.MemberDto;
import java.lang.reflect.Member;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MemberMapper {

    public void signUp(MemberDto memberDto);


    public MemberDto memberInfo(String id);
}
