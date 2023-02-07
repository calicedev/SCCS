package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubmissionDto {

    private int id;
    private int runtime;
    private int memory;
    private String result;
    private Timestamp submitDatetime;
    private int problemId;
    private String memberId;
    private int languageId;
    private int studyroomId;
    private MultipartFile formFile;
    private String fileName;

    private List<Map<String,Object>> data;
    private UrlResource S;

}
