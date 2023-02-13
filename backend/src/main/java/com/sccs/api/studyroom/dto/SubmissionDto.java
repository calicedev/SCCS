package com.sccs.api.studyroom.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubmissionDto {

  private int id;
  private double runtime;
  private int memory;
  private Boolean result;
  private Timestamp submitDatetime;
  private int problemId;
  private String memberId;
  private int languageId;
  private int studyroomId;
  private MultipartFile formFile;
  private String fileName;
  private String fileUrl;

  private String memberNickname;

}
