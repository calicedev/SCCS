package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubmissionDto {

    private int id;
    private int runtime;
    private int memory;
    private boolean result;
    private Timestamp submitDatetime;
    private int problemId;
    private String memberId;
    private int languageId;
    private int studyroomId;
    private MultipartFile formFile;
    private SendFileDto file;
    private String sendFileName;
    private String storeFileName;

}
