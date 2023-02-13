package com.sccs.api.studyroom.controller;

import com.sccs.api.aws.dto.FileDto;
import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.studyroom.dto.ProblemDto;
import com.sccs.api.studyroom.dto.StudyroomDto;
import com.sccs.api.studyroom.dto.SubmissionDto;
import com.sccs.api.studyroom.file.FileStore;
import com.sccs.api.studyroom.service.StudyroomService;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudyroomController {

    private static final Logger logger = LoggerFactory.getLogger(StudyroomController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final StudyroomService studyroomService;
    private final FileStore fileStore;
    private static final RestTemplate REST_TEMPLATE;
    private final AwsS3Service awsS3service;

    static {
        // RestTemplate 기본 설정을 위한 Factory 생성
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(30000);
        factory.setReadTimeout(30000);
        factory.setBufferRequestBody(false); // 파일 전송은 이 설정을 꼭 해주자.
        REST_TEMPLATE = new RestTemplate(factory);
    }

    /**
     * 방 생성
     **/
    @PostMapping("/studyroom")
    public ResponseEntity<?> createStudyroom(@Validated @RequestBody StudyroomDto studyroomDto) {
        int studyroomId = studyroomService.createStudyroom(studyroomDto);
        Map<String, Object> resultMap = new HashMap<>();
        if (studyroomId != 0) {
            resultMap.put("studyroomId", studyroomId);
            return new ResponseEntity<>(resultMap, HttpStatus.OK); // 200

        } else {

            resultMap.put("message", "방 생성 실패");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST); // 400
        }

    }

    /**
     * 메인 페이지에서 전체 방 조회
     **/
    @GetMapping("/studyroom")
    public ResponseEntity<?> selectAllStudyroom() {
        List<Map<String, Object>> studyrooms = studyroomService.selectAllStudyroom();
        if (!studyrooms.isEmpty()) {
            return new ResponseEntity<>(studyrooms, HttpStatus.OK);
        } else {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("message", "조회 된 스터디룸이 없음");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 메인 페이지에서 전체 조건별 조회
     **/
    @PostMapping("/studyroom/detail")
    public ResponseEntity<?> selectStudyroom(@RequestBody StudyroomDto studyroomDto) {
        List<Map<String, Object>> studyrooms = studyroomService.selectStudyroom(studyroomDto);
        if (!studyrooms.isEmpty()) {
            return new ResponseEntity<>(studyrooms, HttpStatus.OK);
        } else {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("message", "조회 된 스터디룸이 없음");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 방 입장시 비밀번호 체크
     **/
    @PostMapping("/studyroom/password")
    public ResponseEntity<?> checkStudyroomPassword(@RequestBody StudyroomDto studyroomDto) {
        Map<String, Object> resultMap = new HashMap<>();
        if (studyroomService.checkStudyroomPassword(studyroomDto).equals(SUCCESS)) {
            resultMap.put("result", SUCCESS);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put("message", "방 입장 비밀번호가 일치하지 않습니다.");
            return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * 특정 스터디 방으로 입장 : 대기방으로 입장
     **/
    @GetMapping("/studyroom/waitingroom/{studyroomId}")
    public ResponseEntity<?> enterStudyroom(@PathVariable("studyroomId") int id) {
        Map<String, Object> resultMap = new HashMap<>();
        if (studyroomService.isExistStudyroom(id)) {
            Map<String, Object> s = studyroomService.enterStudyroom(id);
            if (!s.containsKey("result")) {
                return new ResponseEntity<>(s, HttpStatus.OK);
            } else if (s.get("result").equals("isSolving")) {
                resultMap.put("message", "이미 문제를 풀고 있는 방입니다.");
                return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
            } else if (s.get("result").equals("full")) {
                resultMap.put("message", "입장 인원을 초과했기에 입장 불가합니다.");
                return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
            }
        } else {
            resultMap.put("message", "존재하지 않는 방입니다");
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        }
        return null;
    }

    /**
     * 코딩 테스트 시작하기
     **/
    @PostMapping("/studyroom/codingtest")
    public ResponseEntity<?> startCodingTest(@RequestBody StudyroomDto studyroomDto)
            throws IOException {
        if (studyroomService.isExistStudyroom(studyroomDto.getId())) {
            return new ResponseEntity<>(studyroomService.startCodingTest(studyroomDto), HttpStatus.OK);
        } else {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("message", "존재하지 않는 방입니다");
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 코딩 문제 제출
     **/
    @PostMapping("/studyroom/codingtest/submission")
    public ResponseEntity<?> submitProblem(@ModelAttribute SubmissionDto submissionDto) throws IOException {
        return new ResponseEntity<>(studyroomService.submitProblem(submissionDto), HttpStatus.OK);
    }

    /**
     * 코딩 테스트 문제 제출
     **/
    @PostMapping("/studyroom/codingtest/test")
    public ResponseEntity<?> testProblem(@ModelAttribute SubmissionDto submissionDto) throws IOException {
        return new ResponseEntity<>(studyroomService.submitTest(submissionDto), HttpStatus.OK);
    }

    /**
     * 스터디 시작
     **/
    @PostMapping("/studyroom/study")
    public ResponseEntity<?> startStudy(@RequestBody StudyroomDto studyroomDto) throws IOException {
        List resultMap = studyroomService.startStudy(studyroomDto);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

}
