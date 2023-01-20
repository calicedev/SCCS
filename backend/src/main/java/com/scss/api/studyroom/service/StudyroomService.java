package com.scss.api.studyroom.service;

import com.scss.api.studyroom.dto.StudyroomDto;

public interface StudyroomService {
    public String createStudyroom(StudyroomDto studyroomDto);

    public String insertLanguageType(StudyroomDto studyroomDto);
}
