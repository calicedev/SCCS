package com.scss.api.studyroom.service;

import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.dto.SubmissionDto;

import java.util.List;
import java.util.Map;

public interface StudyroomService {
    public String createStudyroom(StudyroomDto studyroomDto);
    public List<Map<String, Object>> selectAllStudyroom();

    public List<Map<String, Object>> selectStudyroom(StudyroomDto studyroomDto);
    public String checkStudyroomPassword(StudyroomDto studyroomDto);
    public Map<String, Object> startCodingTest(StudyroomDto studyroomDto);

    public void submitProblem(SubmissionDto submissionDto);

    public String endStudyroomByOwner(StudyroomDto studyroomDto);
}
