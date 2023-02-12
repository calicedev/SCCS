package com.sccs.api.studyroom.file;
import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.studyroom.dto.SubmissionDto;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.apache.commons.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Component
@RequiredArgsConstructor
public class FileStore {

  @Value("${file.dir}")
  private String fileDir;
  private final AwsS3Service awsS3service;
  public String getFullPath(String filename) {
    return fileDir + filename;
  }

  public MultipartFile storeFile(MultipartFile file) throws IOException {
    String end = "txt";
    if (file.isEmpty()) {
      return null;
    }

    // 랜덤 파일명을 정한다.
    String randomName = createStoreFileName(end);
    // 위에서 정한 랜덤 파일명으로 새로운 파일을 생성한다.
    File f = new File(getFullPath(randomName));
    file.transferTo(f);

    //MultipartFile 파일로 바꿔주는 과정
    FileItem fileItem = new DiskFileItem(randomName, Files.probeContentType(f.toPath()), false, f.getName(), (int) f.length(), f.getParentFile());
    InputStream input = new FileInputStream(f);
    OutputStream os = fileItem.getOutputStream();
    IOUtils.copy(input, os);
    MultipartFile mFile = new CommonsMultipartFile(fileItem);
    return mFile;
  }

  private String createStoreFileName(String end) {
    String uuid = UUID.randomUUID().toString();
    return uuid + "." + end;
  }

}
