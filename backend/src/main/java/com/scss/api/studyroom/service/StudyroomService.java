package com.scss.api.studyroom.service;

import com.scss.api.studyroom.dto.StudyroomDto;
import java.util.List;
import java.util.Map;

public interface StudyroomService {
    public String createStudyroom(StudyroomDto studyroomDto);

    public List<Map<String, Object>> selectAllStudyroom();

    public String checkStudyroomPassword(StudyroomDto studyroomDto);

    public List<StudyroomDto> searchStudyroom(StudyroomDto studyroomDto);
}
