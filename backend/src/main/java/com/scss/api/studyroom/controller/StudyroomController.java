package com.scss.api.studyroom.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.scss.api.studyroom.dto.ProblemDto;
import com.scss.api.studyroom.dto.SendFileDto;
import com.scss.api.studyroom.dto.StudyroomDto;
import com.scss.api.studyroom.dto.SubmissionDto;
import com.scss.api.studyroom.file.FileStore;
import com.scss.api.studyroom.service.StudyroomService;

import java.io.IOException;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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

    private static final RestTemplate REST_TEMPLATE;


    static {
        // RestTemplate 기본 설정을 위한 Factory 생성
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        factory.setBufferRequestBody(false); // 파일 전송은 이 설정을 꼭 해주자.
        REST_TEMPLATE = new RestTemplate(factory);
    }

    @PostMapping("/studyroom")
    public ResponseEntity<?> createStudyroom(@Validated @RequestBody StudyroomDto studyroomDto) {

        logger.debug("studyroomDto", studyroomDto);
        int pk = studyroomService.createStudyroom(studyroomDto);
        if (pk!=0) {
            return new ResponseEntity<String>(String.valueOf(pk), HttpStatus.OK);
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
    public  ResponseEntity<?> submitProblem(@ModelAttribute SubmissionDto submissionDto)  throws IOException{
        ProblemDto problemDto = studyroomService.getProblemInfo(submissionDto.getProblemId());

        //파일을 원하는 경로에 실제로 저장한다.
        String fileName = fileStore.storeFile(submissionDto, problemDto.getProblemFolder());

        // 폴더에서 채점 서버로 보낼 파일 가져와서 resource에 담기
        UrlResource resource = new UrlResource("file:" + fileStore.getFullPath(problemDto.getProblemFolder(), fileName));

        String tempNo = problemDto.getProblemFolder().substring(problemDto.getProblemFolder().lastIndexOf("/")+1);

        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        HttpStatus httpStatus = HttpStatus.CREATED;
        map.add("mfile",resource);
        System.out.println(problemDto.getTimeLimit());
        map.add("runtime",problemDto.getTimeLimit());
        map.add("type",problemDto.getAlgoId());
        map.add("no",tempNo);
        map.add("memory",problemDto.getMemoryLimit());

        //여기서 찬희님한테 파일 전달
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        //채점 서버 url
        String url ="http://70.12.246.161:9999";
        if(submissionDto.getLanguageId()==1){
            url+="/api/solve/python";
        }else if(submissionDto.getLanguageId()==2){
            url+="/api/solve/java";
        }

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
        SubmissionDto s = REST_TEMPLATE.postForObject(url, requestEntity, SubmissionDto.class);
        //문제 제출 정보를 실제 디비에 저장한다.
        submissionDto.setFileName(fileName);
        submissionDto.setResult(s.getResult());
        submissionDto.setMemory(s.getMemory());
        submissionDto.setRuntime(s.getRuntime());
        studyroomService.submitProblem(submissionDto);

        return new ResponseEntity<>(SUCCESS, httpStatus);

    }

    @PatchMapping("/codingtest")
    public ResponseEntity<?> endStudyroomByOwner(@RequestBody StudyroomDto studyroomDto){
        //코딩 테스트 시작하기
        return new ResponseEntity<>(studyroomService.endStudyroomByOwner(studyroomDto), HttpStatus.OK);
    }


}
