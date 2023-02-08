package com.sccs.api.aws.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.sccs.api.aws.dto.FileDto;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  public FileDto upload(MultipartFile multipartFile, String dirName)
      throws IOException {

    File uploadFile = convert(multipartFile)
        .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
    return upload(uploadFile, dirName);
  }

  private FileDto upload(File uploadFile, String dirName) {
    String fileName = dirName + "/" + uploadFile.getName();
    String uploadImageUrl = putS3(uploadFile, fileName);
    removeNewFile(uploadFile);

    return new FileDto(fileName, uploadImageUrl);
  }

  public FileDto uploadToPresignUrl(MultipartFile multipartFile, String dirName)
      throws IOException {

    File uploadFile = convert(multipartFile)
        .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
    return uploadToPresignUrl(uploadFile, dirName);
  }

  private FileDto uploadToPresignUrl(File uploadFile, String dirName) {
    String fileName = dirName + "/" + uploadFile.getName();
    String uploadImageUrl = putPresignedUrl(uploadFile, fileName);
    removeNewFile(uploadFile);

    return new FileDto(fileName, uploadImageUrl);
  }

  //if you set to private, change variable PublicRead to Private
  private String putS3(File uploadFile, String fileName) {
    amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
        CannedAccessControlList.PublicRead));
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }

  private void removeNewFile(File targetFile) {
    if (targetFile.delete()) {
      log.info("파일이 삭제되었습니다.");
    } else {
      log.info("파일이 삭제되지 못했습니다.");
    }
  }

  private Optional<File> convert(MultipartFile file) throws IOException {
    File convertFile = new File(file.getOriginalFilename());
    if (convertFile.createNewFile()) {
      try (FileOutputStream fos = new FileOutputStream(convertFile)) {
        fos.write(file.getBytes());
      }
      return Optional.of(convertFile);
    }

    return Optional.empty();
  }

  //this is access denied because this url is private.
  //if s3 settings that all user can be access all of object will be insecure.
  public String getFilePath(String path) {
    return amazonS3Client.getUrl(bucket, path).toString();
  }

  public String putPresignedUrl(File uploadFile, String fileName) {
    String preSignedURL = "";

    Date expiration = new Date();
    long expTimeMillis = expiration.getTime();
    expTimeMillis += 1000 * 60 * 120; //expired 2 min
    expiration.setTime(expTimeMillis);

    log.info(expiration.toString());

    try {
      amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
          CannedAccessControlList.Private));
      GeneratePresignedUrlRequest generatePresignedUrlRequest =
          new GeneratePresignedUrlRequest(bucket, fileName)
              .withMethod(HttpMethod.GET)
              .withExpiration(expiration);
      URL url = amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);
      preSignedURL = url.toString();
      log.info("Pre-Signed URL : " + url.toString());

    } catch (Exception e) {
      e.printStackTrace();
    }

    return preSignedURL;
  }

  public String getTemporaryUrl(String fileName) {
    String preSignedURL = "";

    Date expiration = new Date();
    long expTimeMillis = expiration.getTime();
    expTimeMillis += 1000 * 60 * 120; //expired 2 min
    expiration.setTime(expTimeMillis);

    log.info(expiration.toString());

    try {
      GeneratePresignedUrlRequest generatePresignedUrlRequest =
          new GeneratePresignedUrlRequest(bucket, fileName)
              .withMethod(HttpMethod.GET)
              .withExpiration(expiration);
      URL url = amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);
      preSignedURL = url.toString();
      log.info("Temporary URL : " + url.toString());

    } catch (Exception e) {
      e.printStackTrace();
    }

    return preSignedURL;
  }

}