package com.scss.api.studyroom.mapper;

import com.scss.api.studyroom.dto.StudyroomDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudyroomMapper {
    public void createStudyroom(StudyroomDto studyroomDto);

    public void insertLanguageType(StudyroomDto studyroomDto);
}
