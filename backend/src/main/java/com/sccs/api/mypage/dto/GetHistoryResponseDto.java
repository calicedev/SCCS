package com.sccs.api.mypage.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetHistoryGetResponse")
public class GetHistoryResponseDto {

  public class problem {

    @ApiModelProperty(example = "문제 이름")
    private String problemName;
    @ApiModelProperty(example = "문제 번호")
    private int problemId;
  }

  @ApiModelProperty(example = "스터티룸이 만들어진 시간")
  private String studyroomCreateDatetime;
  @ApiModelProperty(example = "스터티룸 이름")
  private String studyroomTitle;
  @ApiModelProperty(example = "스터티룸의 고유아이디")
  private int studyroomId;
  @ApiModelProperty(example = "스터티룸에서 풀은 문제들")
  private List<problem> problems;

}
