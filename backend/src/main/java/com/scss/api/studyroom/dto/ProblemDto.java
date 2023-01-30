package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProblemDto {
    private String name;
    private int difficulty;
    private String problemFolder;
    private int memoryLimit ;
    private int timeLimit;
    private int submissionNumber;
    private int acceptedNumber;
    private int algoId;
}
