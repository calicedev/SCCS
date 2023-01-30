package com.scss.api.mypage.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubmissionDto {

  int id;
  String code;
  int runtime;
  int memory;
  boolean result;
  LocalDateTime submitDatetime;
  int problemId;
  String memberId;
  int languageId;
  int studyroomId;

}
