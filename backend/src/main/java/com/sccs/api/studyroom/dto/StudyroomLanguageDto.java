package com.sccs.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomLanguageDto {

  private int id;
  private int studyroomId;
  private int languageId;
}
