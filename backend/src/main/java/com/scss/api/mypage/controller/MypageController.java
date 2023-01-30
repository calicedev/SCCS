package com.scss.api.mypage.controller;

import com.scss.api.mypage.service.MypageService;
import com.scss.api.studyroom.controller.StudyroomController;
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
public class MypageController {

  private static final Logger logger = LoggerFactory.getLogger(StudyroomController.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private final MypageService mypageService;

  @GetMapping("/history/{memberId}/{year}/{month}")
  public ResponseEntity<?> getHistory(@PathVariable String memberId, @PathVariable String year,
      @PathVariable String month) {
    List<HashMap<String, Object>> targets = mypageService.getHistory(memberId, year, month);

    if (targets != null) {
      return ResponseEntity.ok(targets);
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @GetMapping("/history/detail/{studyId}")
  public ResponseEntity<?> getHistoryDetail(@PathVariable int studyId) {
    List<HashMap<String, Object>> targets = mypageService.getHistoryDetail(studyId);
    if (targets != null) {
      return ResponseEntity.ok(targets);
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @GetMapping("/problem/{memberId}")
  public ResponseEntity<?> getProblems(@PathVariable String memberId) {
    List<HashMap<String, Object>> targets = mypageService.getProblems(memberId);
    if (targets != null) {
      return ResponseEntity.ok(targets);
    } else {
      return ResponseEntity.noContent().build();
    }
  }

}
