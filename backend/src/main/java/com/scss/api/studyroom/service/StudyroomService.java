package com.scss.api.studyroom.service;

import com.scss.api.studyroom.dto.StudyroomDto;

import java.util.List;

public interface StudyroomService {
    public String createStudyroom(StudyroomDto studyroomDto);
    public List<StudyroomDto> selectAllStudyroom();



}