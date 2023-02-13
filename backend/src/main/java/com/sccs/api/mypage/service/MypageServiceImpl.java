package com.sccs.api.mypage.service;

import com.sccs.api.mypage.mapper.MypageMapper;
import com.sccs.api.studyroom.service.StudyroomServiceImpl;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

  private static final Logger logger = LoggerFactory.getLogger(StudyroomServiceImpl.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private final MypageMapper mypageMapper;

  @Override
  public List<HashMap<String, Object>> getHistory(String memberId, String year, String month) {
    return mypageMapper.getHistory(memberId, year, month);
  }

  @Override
  public HashMap<String, Object> getHistoryDetail(int studyId) {
    return mypageMapper.getHistoryDetail(studyId);
  }

  @Override
  public List<HashMap<String, Object>> getProblems(String memberId) {
    return mypageMapper.getProblems(memberId);
  }

  @Override
  public HashMap<String, Object> getProblemUrl(String memberId, int problemId) {
    return mypageMapper.getProblemUrl(memberId, problemId);
  }

  @Override
  public String getProblemUrlOnly(int problemId) {
    return mypageMapper.getProblemUrlOnly(problemId);
  }
}
