package com.scss.api.studyroom.service;

import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.mapper.StudyroomMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyroomServiceImpl implements StudyroomService{
    private static final Logger logger = LoggerFactory.getLogger(StudyroomServiceImpl.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    // 생성자 주입
    private final StudyroomMapper studyroomMapper;

    // 회원 가입 (임시)
    @Override
    public String createStudyroom(StudyroomDto studyroomDto) {
        try {
            studyroomMapper.createStudyroom(studyroomDto);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return FAIL;
        }
    }

    @Override
    public String insertLanguageType(StudyroomDto studyroomDto) {
        try {
            studyroomMapper.insertLanguageType(studyroomDto);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return FAIL;
        }
    }

}
