package com.sccs.api.member.service;

import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.member.dto.UniqueDto;
import com.sccs.api.member.mapper.MemberMapper;
import com.sccs.api.member.util.EncryptService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";

  // 생성자 주입
  private final MemberMapper memberMapper;
  private final EncryptService encryptService;

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

  /**
   * 비밀번호 수정
   **/
  @Override
  public String modifyPassword(MemberDto memberDto) {
    try {
      String password = memberDto.getPassword();
      String salt = memberDto.getSalt();
      logger.debug("저장된 salt  : {} ", salt);
      String hex = encryptService.encryptPassword(password, salt); // 암호화 후 비밀번호
      logger.debug("새로운 비번 + 암호화 : {}", hex);
      memberDto.setPassword(hex);

      memberMapper.modifyPassword(memberDto); // DB 값 수정
      logger.debug("비밀번호 수정 성공");
      return SUCCESS;
    } catch (Exception e) {
      logger.debug("비밀번호 수정 실패");
      return FAIL;
    }
  }

  @Override
  public String uniqueParam(UniqueDto uniqueDto) {
    return memberMapper.uniqueParam(uniqueDto);
  }

  @Override
  public String delete(String id) {
    try {
      memberMapper.delete(id);
      return SUCCESS;
    } catch (Exception e) {
      logger.info("회원 삭제 실패 !!");
      logger.error(e.getMessage());
      return FAIL;
    }
  }
}
