package com.scss.api.studyroom.file;

import com.scss.api.studyroom.dto.SendFileDto;
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
    public SendFileDto storeFile(MultipartFile multipartFile) throws IOException
    {
        if (multipartFile.isEmpty()) {
            return null;
        }
        String originalFilename = multipartFile.getOriginalFilename();
        String storeFileName = createStoreFileName();
        multipartFile.transferTo(new File(getFullPath(storeFileName)));
        return new SendFileDto(originalFilename, storeFileName);
    }
    private String createStoreFileName() {
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + "py";
    }
}