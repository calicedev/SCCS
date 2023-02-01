package com.scss.api.studyroom.file;

import com.scss.api.studyroom.dto.SendFileDto;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Component
public class FileStore {
    @Value("${file.dir}")
    private String fileDir;
    public String getFullPath(String filename) {
        return fileDir + filename;
    }
    public SendFileDto storeFile(MultipartFile multipartFile, int languageId) throws IOException
    {
        String end = null;
        if (multipartFile.isEmpty()) {
            return null;
        }
        if(languageId==1){
            end = "py";
        }else if(languageId==2){
            end = "java";
        }
        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName(end);
        multipartFile.transferTo(new File(getFullPath(storeFileName)));
        return new SendFileDto(originalFilename, storeFileName);
    }
    private String createStoreFileName(String end) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + end;
    }
}