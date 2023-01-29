package com.scss.api.mypage.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubmissionDto {

    int id;
    String code;
    int runtime;
    int memory;
    boolean result;
    Timestamp submitDatetime;
    int problemId;
    String memberId;
    int languageId;
    int studyroomId;

}
