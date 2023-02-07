package com.sccs.api.aws.controller;

import com.sccs.api.aws.dto.FileDto;
import com.sccs.api.aws.service.AwsS3Service;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class AwsS3Controller {

  private final AwsS3Service awsS3service;

  //this is upload image and make a link to public
  //this is insecure because this link can access from everyone.
  @PostMapping("/upload")
  public FileDto upload(@RequestParam(value = "file") MultipartFile multipartFile)
      throws IOException {
    return awsS3service.upload(multipartFile, "sccs");
  }

  //this link is access denied because this url is private.
  //if s3 settings that all user can be access all of objects that are same as upload method will be insecure.
  @GetMapping("/getimageurl")
  public String getimageurl(@RequestParam(value = "filename") String path)
      throws IOException {
    return awsS3service.getFilePath(path);
  }

  //this is upload image and making temporary link to access image
  @PostMapping("/getpresignurl")
  public FileDto getpresignurl(@RequestParam(value = "file") MultipartFile multipartFile)
      throws IOException {
    return awsS3service.uploadToPresignUrl(multipartFile, "sccs");
  }

  //get temporary presignurl from filename
  @GetMapping("/temporaryurl")
  public String gettemporaryurl(String filename)
      throws IOException {
    return awsS3service.getTemporaryUrl(filename);
  }

}
