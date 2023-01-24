package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomProblemDto {
    int id;
    int problemId;
    int studyroomId;
}
