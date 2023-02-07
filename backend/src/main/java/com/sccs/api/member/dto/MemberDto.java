package com.sccs.api.member.dto;

import io.swagger.annotations.ApiModelProperty;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDto {

  String id;
  String password;
  String name;
  String nickname;
  @ApiModelProperty(example = "ssafy@naver.com")
  String email;
  String profileImage;
  int score;
  Timestamp joinDate;
  String salt;
}
