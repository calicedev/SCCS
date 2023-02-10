package com.sccs.api.mypage.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProblemResponseDto {

  @ApiModelProperty(example = "문제 이름")
  private String problemName;
  @ApiModelProperty(example = "문제 번호")
  private int problemId;
}
