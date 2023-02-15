package com.sccs.api.mypage.controller;

import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.mypage.service.MypageService;
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
import org.springframework.http.HttpStatus;
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

  private static final Logger logger = LoggerFactory.getLogger(MypageController.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private static final String MESSAGE = "message";
  private final MypageService mypageService;
  private final AwsS3Service awsS3service;

  /**
   * 회원 정보 - 회원아이디 Auth
   **/
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

    HashMap<String, String> resultMap = new HashMap();

    if (targets != null) {
      logger.debug("[getHistory] 스터디 기록 조회 성공!!");
      return ResponseEntity.ok(targets);
    } else {
      logger.debug("[getHistory] 스터디 기록이 존재하지않습니다.");
      resultMap.put(MESSAGE, "스터디 기록이 존재하지않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
    }
  }

  @GetMapping("/history/detail/{studyId}")
  @ApiOperation(value = "스터디 기록 상세 조회", notes = "해당 <strong>스터디의 아이디</strong>를 받아서 스터디에 대한 상세정보를 조회한다.")
  @ApiImplicitParam(name = "studyId", value = "스터디 아이디", required = true)
  public ResponseEntity<?> getHistoryDetail(@PathVariable int studyId) {
    HashMap<String, Object> targets = mypageService.getHistoryDetail(studyId);
    HashMap<String, String> resultMap = new HashMap();

    if (targets != null) {
      ArrayList<HashMap<String, Object>> problems = (ArrayList<HashMap<String, Object>>) targets.get(
          "studyroomWithProblems");
      System.out.println("problem size " + problems.size());
      for (int i = 0; i < problems.size(); i++) {
        ArrayList<HashMap<String, Object>> participants = (ArrayList<HashMap<String, Object>>) problems.get(
            i).get("participantWithCode");
        System.out.println("participant size " + participants.size());
        if (participants.size() == 0) {
          participants.clear();
          continue;
        }
        for (int j = 0; j < participants.size(); j++) {
          if (participants.get(j).get("submissionMemberId").equals("")) {
            participants.remove(j);
            continue;
          }
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

      logger.debug("[getHistoryDetail] 스터디 기록 상세 조회 성공!!");
      return ResponseEntity.ok(targets);
    } else {
      logger.debug("[getHistoryDetail] 스터디 상세 기록이 존재하지않습니다.");
      resultMap.put(MESSAGE, "스터디 상세 기록이 존재하지않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
    }
  }

  /**
   * 회원 정보 - 회원아이디 Auth
   **/
  @GetMapping("/problem/{memberId}")
  @ApiOperation(value = "내가 푼 문제 조회", notes = "<strong>로그인하고있는 아이디</strong>를 받아서 해당 아이디가 푼 문제를 모두 조회한다.")
  @ApiImplicitParam(name = "memberId", value = "로그인하고있는 아이디", required = true)
  public ResponseEntity<?> getSubmissions(@PathVariable String memberId) {
    List<HashMap<String, Object>> targets = mypageService.getProblems(memberId);
    HashMap<String, String> resultMap = new HashMap();

    if (targets != null) {
      logger.debug("[getSubmissions] 내가 푼 문제 조회 성공!!");
      return ResponseEntity.ok(targets);
    } else {
      logger.debug("[getSubmissions] 내가 푼 문제가 존재하지않습니다.");
      resultMap.put(MESSAGE, "내가 푼 문제가 존재하지않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
    }

  }

  /**
   * 회원 정보 - 회원아이디 Auth
   **/
  @GetMapping("/problem/{memberId}/solve/{problemId}")
  @ApiOperation(value = "내가 제출한 문제 조회", notes = "<strong>로그인하고있는 아이디, 문제 아이디</strong>를 받아서 해당 아이디가 제출한 문제를 모두 조회한다.")
  @ApiImplicitParams({
      @ApiImplicitParam(name = "memberId", value = "로그인하고있는 아이디", required = true),
      @ApiImplicitParam(name = "problemId", value = "푼 문제 아이디", required = true)
  })
  public ResponseEntity<HashMap<String, Object>> getProblemUrl(@PathVariable String memberId,
      @PathVariable int problemId) {
    HashMap<String, Object> targets = mypageService.getProblemUrl(memberId, problemId);
    HashMap<String, Object> resultMap = new HashMap();

    if (targets != null) {
      ArrayList<HashMap<String, Object>> problems = (ArrayList<HashMap<String, Object>>) targets.get(
          "submissionInfo");
      for (int i = 0; i < problems.size(); i++) {
        String submissionFilename = (String) problems.get(i).get("submissionFile");
        if (submissionFilename.equals("")) {
          continue;
        }
        String path = "submission/" + submissionFilename;
        problems.get(i).put("submissionFile", awsS3service.getTemporaryUrl(path));
      }
      String filename = (String) targets.get("problemUrl");
      String realPath = "problem/" + filename + ".jpg";
      targets.put("problemUrl", awsS3service.getTemporaryUrl(realPath));

    } else {
      logger.debug("[getProblemUrl] 내가 제출한 문제가 존재하지않습니다.");
      resultMap.put(MESSAGE, "내가 제출한 문제가 존재하지않습니다.");
      return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
    }

    logger.debug("[getProblemUrl] 내가 제출한 문제들 조회 성공!!");
    return ResponseEntity.ok(targets);
  }

  @GetMapping("/problem/solve/{problemId}")
  @ApiOperation(value = "문제 URL 요청", notes = "<strong>문제 아이디</strong>를 받아서 해당 문제 URL을 제공한다")
  @ApiImplicitParam(name = "problemId", value = "문제 아이디", required = true)
  public ResponseEntity<String> getProblemUrlOnly(@PathVariable int problemId) {
    String pUrl = mypageService.getProblemUrlOnly(problemId);
    String ErrMsg;
    if (pUrl != null) {
      String pRealPath = "problem/" + pUrl + ".jpg";
      pUrl = awsS3service.getTemporaryUrl(pRealPath);

      logger.debug("[getProblemUrlOnly] 문제 URL 생성 성공!!");
      return ResponseEntity.ok(pUrl);
    } else {
      logger.debug("[getProblemUrlOnly] 존재하지않는 문제입니다.");
      ErrMsg = "존재하지않는 문제입니다.";
      return new ResponseEntity<>(ErrMsg, HttpStatus.BAD_REQUEST);
    }
  }


}
