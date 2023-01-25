package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProblemDto {
    String name;
    int difficulty;
    String problemFolder;
    int memoryLimit ;
    int timeLimit;
    int submissionNumber;
    int acceptedNumber;
    int algoId;
}
