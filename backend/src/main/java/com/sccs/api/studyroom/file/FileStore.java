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
  public String getFullPath(String path, String filename) {
    return fileDir + path + "/" + filename;
  }

  public MultipartFile storeFile(SubmissionDto submissionDto, String problemFolder) throws IOException {
    MultipartFile file = submissionDto.getFormFile();
    int languageId = submissionDto.getLanguageId();
    String path = problemFolder;
    String end = null;
    if (file.isEmpty()) {
      return null;
    }
    if (languageId == 1) {
      end = "py";
    } else if (languageId == 2) {
      end = "java";
    }
    String fileName = createStoreFileName(end);
    File f = new File(getFullPath(path, fileName));
    file.transferTo(f);
    FileItem fileItem = new DiskFileItem(fileName, Files.probeContentType(f.toPath()), false, f.getName(), (int) f.length(), f.getParentFile());
    InputStream input = new FileInputStream(f);
    OutputStream os = fileItem.getOutputStream();
    IOUtils.copy(input, os);
    MultipartFile mFile = new CommonsMultipartFile(fileItem);
    return mFile;
  }

  public MultipartFile storeTextFile(SubmissionDto submissionDto, String problemFolder) throws IOException {
    MultipartFile file = submissionDto.getFormFile();
    int languageId = submissionDto.getLanguageId();
    String path = problemFolder;
    String end = "txt";
    String fileName = file.getName()+end;
    File f = new File(getFullPath(path, fileName));
    file.transferTo(f);
    FileItem fileItem = new DiskFileItem(fileName, Files.probeContentType(f.toPath()), false, f.getName(), (int) f.length(), f.getParentFile());
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
