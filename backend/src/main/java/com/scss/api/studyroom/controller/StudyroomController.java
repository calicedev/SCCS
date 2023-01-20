package com.scss.api.studyroom.controller;

import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.service.StudyroomService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudyroomController {
    private static final Logger logger = LoggerFactory.getLogger(StudyroomController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final StudyroomService studyroomService;


    @PostMapping("/studyroom")
    public ResponseEntity<?> createStudyroom(@RequestBody StudyroomDto studyroomDto) {

        logger.debug("studyroomDto", studyroomDto);

        if (studyroomService.createStudyroom(studyroomDto).equals(SUCCESS) && studyroomService.insertLanguageType(studyroomDto).equals(SUCCESS)) {
            return new ResponseEntity<String>(FAIL, HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.NO_CONTENT);
        }
    }
}
