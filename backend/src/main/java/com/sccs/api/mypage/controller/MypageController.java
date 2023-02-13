package com.sccs.api.mypage.controller;

import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.mypage.service.MypageService;
import com.sccs.api.studyroom.controller.StudyroomController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
@Api(tags = "마이페이지 컨트롤러 API")
public class MypageController {

  private static final Logger logger = LoggerFactory.getLogger(StudyroomController.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private final MypageService mypageService;
  private final AwsS3Service awsS3service;

  @GetMapping("/history/{memberId}/{year}/{month}")
  @ApiOperation(value = "스터디 기록 조회", notes = "<strong>날짜</strong>와 로그인하고있는 <strong>아이디</strong>를 받아서 해당 아이디의 스터디 기록을 조회한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "memberId", value = "로그인하고있는 아이디", required = true),
      @ApiImplicitParam(name = "year", value = "조회하고싶은 연도", required = true),
      @ApiImplicitParam(name = "month", value = "조회하고싶은 달", required = true)
  })
  public ResponseEntity<?> getHistory(
      @PathVariable String memberId,
      @PathVariable String year,
      @PathVariable String month) {
    List<HashMap<String, Object>> targets = mypageService.getHistory(memberId, year, month);

    if (targets != null) {
      return ResponseEntity.ok(targets);
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @GetMapping("/history/detail/{studyId}")
  @ApiOperation(value = "스터디 기록 상세 조회", notes = "해당 <strong>스터디의 아이디</strong>를 받아서 스터디에 대한 상세정보를 조회한다.")
  @ApiImplicitParam(name = "studyId", value = "스터디 아이디", required = true)
  public ResponseEntity<?> getHistoryDetail(@PathVariable int studyId) {
    HashMap<String, Object> targets = mypageService.getHistoryDetail(studyId);

    ArrayList<HashMap<String, Object>> problems;
    problems = (ArrayList<HashMap<String, Object>>) targets.get("studyroomWithProblems");
    for (int i = 0; i < problems.size(); i++) {
      ArrayList<HashMap<String, Object>> participants;
      participants = (ArrayList<HashMap<String, Object>>) problems.get(i)
          .get("participantWithCode");
      for (int j = 0; j < participants.size(); j++) {
        String filename = (String) participants.get(j).get("submissionFileName");
        String realFilePath = "submission/" + filename;
        String tempFileUrl = awsS3service.getTemporaryUrl(realFilePath);
        participants.get(j).put("submissionFileName", tempFileUrl);
      }
      String url = (String) problems.get(i).get("problemFolder");
      String realPath = "problem/" + url + ".jpg";
      String tempUrl = awsS3service.getTemporaryUrl(realPath);
      problems.get(i).put("problemFolder", tempUrl);
    }
    if (targets != null) {
      return ResponseEntity.ok(targets);
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @GetMapping("/problem/{memberId}")
  @ApiOperation(value = "내가 푼 문제 조회", notes = "<strong>로그인하고있는 아이디</strong>를 받아서 해당 아이디가 푼 문제를 모두 조회한다.")
  @ApiImplicitParam(name = "memberId", value = "로그인하고있는 아이디", required = true)
  public ResponseEntity<?> getSubmissions(@PathVariable String memberId) {
    List<HashMap<String, Object>> targets = mypageService.getProblems(memberId);

    if (targets != null) {
      return ResponseEntity.ok(targets);
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @GetMapping("/problem/{memberId}/solve/{problemId}")
  public HashMap<String, Object> getProblemUrl(@PathVariable String memberId,
      @PathVariable int problemId) {
    HashMap<String, Object> targets = mypageService.getProblemUrl(memberId, problemId);
    ArrayList<HashMap<String, Object>> problems = (ArrayList<HashMap<String, Object>>) targets.get(
        "submissionInfo");
    for (int i = 0; i < problems.size(); i++) {
      String submissionFilename = (String) problems.get(i).get("submissionFile");
      String path = "submission/" + submissionFilename;
      problems.get(i).put("submissionFile", awsS3service.getTemporaryUrl(path));
    }
    String filename = (String) targets.get("problemUrl");
    String realPath = "problem/" + filename + ".jpg";
    targets.put("problemUrl", awsS3service.getTemporaryUrl(realPath));

    return targets;
  }

  @GetMapping("/problem/solve/{problemId}")
  public String getProblemUrlOnly(@PathVariable int problemId) {
    String pUrl = mypageService.getProblemUrlOnly(problemId);
    String pRealPath = "problem/" + pUrl + ".jpg";
    pUrl = awsS3service.getTemporaryUrl(pRealPath);

    return pUrl;
  }


}
