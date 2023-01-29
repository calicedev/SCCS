package com.scss.api.mypage.controller;

import com.scss.api.mypage.service.MypageService;
import com.scss.api.studyroom.controller.StudyroomController;
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
public class MypageController {

  private static final Logger logger = LoggerFactory.getLogger(StudyroomController.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private final MypageService mypageService;

  @GetMapping("/history/{memberId}/{year}/{month}")
  public ResponseEntity<?> getHistory(@PathVariable String memberId, @PathVariable String year,
      @PathVariable String month) {

    if (mypageService.getHistory(memberId, year, month).equals(SUCCESS)) {
      return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    } else {
      return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
  }

  @GetMapping("/history/detail/{studyId}")
  public ResponseEntity<?> getHistoryDetail(@PathVariable int studyId) {
    if (mypageService.getHistroyDeatil(studyId).equals(SUCCESS)) {
      return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    } else {
      return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
  }

  @GetMapping("/problem/{memberId}")
  public ResponseEntity<?> getProblems(@PathVariable String memberId) {
    if (mypageService.getProblems(memberId).equals(SUCCESS)) {
      return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    } else {
      return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
    }
  }

}
