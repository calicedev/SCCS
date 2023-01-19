package com.scss.api.member.mapper;

import com.scss.api.member.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MemberMapper {

    public void signup(MemberDto memberDto);


}
