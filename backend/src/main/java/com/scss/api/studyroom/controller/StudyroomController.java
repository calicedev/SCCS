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

    /** 방 생성 **/
    @PostMapping("/studyroom")
    public ResponseEntity<?> createStudyroom(@Validated @RequestBody StudyroomDto studyroomDto) {
        int studyroomId = studyroomService.createStudyroom(studyroomDto);
        Map<String, Object> resultMap = new HashMap<>();
        if (studyroomId!=0) {
            resultMap.put("studyroomId", studyroomId);
            return new ResponseEntity<>(resultMap, HttpStatus.OK); // 200
        } else {

            resultMap.put("message", "방 생성 실패");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST); // 400
        }

    }
    /** 메인 페이지에서 전체 방 조회 **/
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

    /** 메인 페이지에서 전체 조건별 조회 **/
    @PostMapping("/studyroom/detail")
    public ResponseEntity<?> selectStudyroom(@RequestBody StudyroomDto studyroomDto){
        List<Map<String,Object>> studyrooms =studyroomService.selectStudyroom(studyroomDto);
        if(!studyrooms.isEmpty()){
            return new ResponseEntity<>(studyrooms, HttpStatus.OK);
        }else{
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("message", "조회 된 스터디룸이 없음");
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    /** 방 입장시 비밀번호 체크 **/
    @PostMapping("/studyroom/password")
    public ResponseEntity<?> checkStudyroomPassword(@RequestBody StudyroomDto studyroomDto){
        Map<String, Object> resultMap = new HashMap<>();
        if (studyroomService.checkStudyroomPassword(studyroomDto).equals(SUCCESS)) {
            resultMap.put("result",SUCCESS);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put("message", "방 입장 비밀번호가 일치하지 않습니다.");
            return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED);
        }
    }

    /** 특정 스터디 방으로 입장 : 대기방으로 입장 **/
    @GetMapping("/studyroom/waitingroom/{studyroomId}")
    public ResponseEntity <?> enterStudyroom(@PathVariable("studyroomId") int id) {
        Map<String, Object> resultMap = new HashMap<>();
        if(studyroomService.isExistStudyroom(id)){
            Map<String, Object> s = studyroomService.enterStudyroom(id);
            if(!s.containsKey("result")){
                return new ResponseEntity<>(s, HttpStatus.OK);
            }
            else if(s.get("result").equals("full")){
                resultMap.put("message", "입장 인원을 초과했기에 입장 불가합니다.");
                return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
            }
        }
        else {
            resultMap.put("message", "존재하지 않는 방입니다");
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        }
        return null;
    }

    /** 코딩 테스트 시작하기 **/
    @PostMapping("/studyroom/codingtest")
    public ResponseEntity<?> startCodingTest(@RequestBody StudyroomDto studyroomDto){
        if(studyroomService.isExistStudyroom(studyroomDto.getId())){
            return new ResponseEntity<>(studyroomService.startCodingTest(studyroomDto), HttpStatus.OK);
        }else{
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("message", "존재하지 않는 방입니다");
            return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
        }
    }

    /** 코딩 테스트 문제 제출 **/
    @PostMapping("/studyroom/codingtest/submission")
    public  ResponseEntity<?> submitProblem(@ModelAttribute SubmissionDto submissionDto)  throws IOException{
        System.out.println("지금 채점 서버 잘 도착합니다!!!!!!!!!!!!!");
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
        String url ="https://sccs.kr";
        if(submissionDto.getLanguageId()==1){
            url+="/solve/python";
        }else if(submissionDto.getLanguageId()==2){
            url+="/solve/java";
        }

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
        SubmissionDto s = REST_TEMPLATE.postForObject(url, requestEntity, SubmissionDto.class);
        //문제 제출 정보를 실제 디비에 저장한다.
        submissionDto.setFileName(fileName);
        submissionDto.setResult(s.getResult());
        submissionDto.setMemory(s.getMemory());
        submissionDto.setRuntime(s.getRuntime());
        studyroomService.submitProblem(submissionDto);

        s.setProblemId(submissionDto.getProblemId());
        s.setStudyroomId(submissionDto.getStudyroomId());
        s.setLanguageId(submissionDto.getLanguageId());
        s.setMemberId(submissionDto.getMemberId());
        return new ResponseEntity<>(s, httpStatus);

    }

    /** 코딩 테스트 방장에 의해 끝내기 **/
    @PatchMapping("/studyroom/codingtest")
    public ResponseEntity<?> endStudyroomByOwner(@RequestBody StudyroomDto studyroomDto){
        //코딩 테스트 끝내기
        
        return new ResponseEntity<>(studyroomService.endStudyroomByOwner(studyroomDto), HttpStatus.OK);
    }


}
