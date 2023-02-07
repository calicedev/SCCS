package com.sccs.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProblemDto {

  int id;
  String name;
  int difficulty;
  String problemFolder;
  int memoryLimit;
  int timeLimit;
  int submissionNumber;
  int acceptedNumber;
  int algoId;
  String problemImageUrl;
}
