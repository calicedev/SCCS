package com.sccs.api.studyroom.dto;

import java.sql.Timestamp;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomDto {

  private int id;
  private String title;
  private String password;
  private Timestamp createDateTime;
  private Timestamp destroyDatetime;
  private Boolean isActive;
  private Boolean isSolving;
  private List<Integer> languageIds;
  private List<Integer> algoIds;
  private List<String> memberIds;

  private List<Integer> problemIds;
  private Boolean isPrivate;
  private int languageId;
  private int algoId;
  private int problemId;

  private String hostId;
  private int personnel;
  private String nickname;
}
