package com.sccs.api.studyroom.dto;

import lombok.Data;

@Data
public class SendFileDto {

  private String sendFileName;
  private String storeFileName;

  public SendFileDto(String uploadFileName, String storeFileName) {
    this.sendFileName = uploadFileName;
    this.storeFileName = storeFileName;
  }


}
