package com.sccs.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomProblemDto {

  private int id;
  private int problemId;
  private int studyroomId;
}
