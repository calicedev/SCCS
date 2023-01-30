package com.scss.api.mypage.dto;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.studyroom.dto.ProblemDto;
import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.dto.SubmissionDto;
import lombok.Data;

@Data
public class MypageDto {

  private StudyroomDto studyroom;
  private SubmissionDto submission;
  private ProblemDto problem;
  private MemberDto member;

}
