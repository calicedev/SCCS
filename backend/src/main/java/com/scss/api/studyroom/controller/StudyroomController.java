package com.scss.api.studyroom.controller;

import com.scss.api.member.dto.MemberDto;
import com.scss.api.studyroom.dto.SendFileDto;
import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.dto.SubmissionDto;
import com.scss.api.studyroom.file.FileStore;
import com.scss.api.studyroom.service.StudyroomService;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudyroomController {
    private static final Logger logger = LoggerFactory.getLogger(StudyroomController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final StudyroomService studyroomService;
    private final FileStore fileStore;

    @PostMapping("/studyroom")
    public ResponseEntity<?> createStudyroom(@RequestBody StudyroomDto studyroomDto) {

        logger.debug("studyroomDto", studyroomDto);

        if (studyroomService.createStudyroom(studyroomDto).equals(SUCCESS)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }

    }

    @GetMapping("/studyroom")
    public ResponseEntity<List<Map<String, Object>>> selectAllStudyroom() {
        return new ResponseEntity<>(studyroomService.selectAllStudyroom(), HttpStatus.OK);
    }


    @PostMapping("/studyroom/detail")
    public ResponseEntity<List<Map<String, Object>>> selectStudyroom(@RequestBody StudyroomDto studyroomDto){
        return new ResponseEntity<>(studyroomService.selectStudyroom(studyroomDto), HttpStatus.OK);

    }

    @PostMapping("/studyroom/password")
    public ResponseEntity<?> checkStudyroomPassword(@RequestBody StudyroomDto studyroomDto){

        if (studyroomService.checkStudyroomPassword(studyroomDto).equals(SUCCESS)) {
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/codingtest")
    public ResponseEntity<?> startCodingTest(@RequestBody StudyroomDto studyroomDto){
        //코딩 테스트 시작하기
        return new ResponseEntity<>(studyroomService.startCodingTest(studyroomDto), HttpStatus.OK);
    }

    @PostMapping("/problem")
    public String submitProblem(@ModelAttribute SubmissionDto submissionDto)  throws IOException{
        //코딩 테스트 시작하기
        SendFileDto sendFileDto = fileStore.storeFile(submissionDto.getFormFile());
        //데이터베이스에 저장
        SubmissionDto s = new SubmissionDto();
        s.setMemberId(submissionDto.getMemberId());
        s.setLanguageId(submissionDto.getLanguageId());
        s.setProblemId(submissionDto.getProblemId());
        s.setStudyroomId(submissionDto.getStudyroomId());
        s.setSendFileName(sendFileDto.getSendFileName());
        s.setStoreFileName(sendFileDto.getStoreFileName());
        studyroomService.submitProblem(s);
        return "redirect:/items/{itemId}";
    }

    @PatchMapping("/codingtest")
    public ResponseEntity<?> endStudyroomByOwner(@RequestBody StudyroomDto studyroomDto){
        //코딩 테스트 시작하기
        return new ResponseEntity<>(studyroomService.endStudyroomByOwner(studyroomDto), HttpStatus.OK);
    }


}
