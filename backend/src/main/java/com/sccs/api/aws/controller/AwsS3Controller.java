package com.sccs.api.aws.controller;

import com.sccs.api.aws.dto.FileDto;
import com.sccs.api.aws.service.AwsS3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/s3")
@Api(tags = "AWS S3 컨트롤러 API")
public class AwsS3Controller {

  private final AwsS3Service awsS3service;

  //this is upload image and make a link to public
  //this is insecure because this link can access from everyone.
  @PostMapping("/upload")
  @ApiOperation(value = "AWS S3 프로필 사진 업로드", notes = "<strong>Multipart 형식의 File</strong>을 받아서 AWS S3 sccs 폴더에 업로드하고 접근할 수 있는 링크를 제공한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "file", value = "업로드하고 싶은 프로필 사진(.gif 가능)", required = true),
  })
  public FileDto upload(@RequestParam(value = "file") MultipartFile multipartFile)
      throws IOException {
    return awsS3service.upload(multipartFile, "sccs");
  }

  @PostMapping("/uploadProblem")
  @ApiOperation(value = "AWS S3 문제 파일 업로드", notes = "<strong>Multipart 형식의 File</strong>을 받아서 AWS S3 problem 폴더에 업로드하고 접근할 수 있는 링크를 제공한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "file", value = "업로드하고 싶은 문제 파일", required = true),
  })
  public FileDto uploadProblem(@RequestParam(value = "file") MultipartFile multipartFile)
      throws IOException {
    return awsS3service.upload(multipartFile, "problem");
  }

  //this link is access denied because this url is private.
  //if s3 settings that all user can be access all of objects that are same as upload method will be insecure.
  @GetMapping("/getImageUrl")
  @ApiOperation(value = "AWS S3 이미지 URL 요청", notes = "<strong>filename</strong>을 받아서 AWS S3에 접근하여 해당 파일의 URL을 제공한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "filename", value = "URL을 받고싶은 파일이름", required = true),
  })
  public String getImageUrl(@RequestParam(value = "filename") String path)
      throws IOException {
    return awsS3service.getFilePath(path);
  }

  //this is upload image and making temporary link to access image
  @PostMapping("/getPresignedUrl")
  @ApiOperation(value = "AWS S3 이미지 pre-signed URL 요청", notes = "<strong>Multipart 형식의 File</strong>을 받아서 AWS S3 sccs 폴더에 업로드를 하고 pre-signed URL을 제공한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "file", value = "업로드하고 싶은 파일", required = true),
  })
  public FileDto getPresignedUrl(@RequestParam(value = "file") MultipartFile multipartFile)
      throws IOException {
    return awsS3service.uploadToPresignUrl(multipartFile, "sccs");
  }

  //get temporary presignedurl from filename
  @GetMapping("/temporaryUrl")
  @ApiOperation(value = "AWS S3 pre-signed URL 요청", notes = "<strong>filename</strong>을 받아서 AWS S3에 접근하여 pre-signed URL을 제공한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "filename", value = "URL을 받고싶은 파일이름", required = true),
  })
  public String getTemporaryUrl(String filename)
      throws IOException {
    return awsS3service.getTemporaryUrl(filename);
  }

}
