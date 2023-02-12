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

  @ApiModelProperty(value = "아이디", example = "ssafy", required = true)
  String id;
  @ApiModelProperty(value = "비밀번호", example = "1234qwer!", required = true)
  String password;
  @ApiModelProperty(value = "이름", example = "김싸피", required = true)
  String name;
  @ApiModelProperty(value = "닉네임", example = "김별명", required = true)
  String nickname;
  @ApiModelProperty(value = "이메일", example = "ssafy@naver.com", required = true)
  String email;
  @ApiModelProperty(value = "프로필이미지", example = "url", required = false)
  String profileImage;
  int score;
  Timestamp joinDate;
  String salt;
}
