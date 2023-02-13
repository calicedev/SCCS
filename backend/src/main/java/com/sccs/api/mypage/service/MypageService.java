package com.sccs.api.mypage.service;

import java.util.HashMap;
import java.util.List;

public interface MypageService {

  public List<HashMap<String, Object>> getHistory(String memberId, String year, String month);

  public HashMap<String, Object> getHistoryDetail(int studyId);

  public List<HashMap<String, Object>> getProblems(String memberId);

  public HashMap<String, Object> getProblemUrl(String memberId, int problemId);

  public String getProblemUrlOnly(int problemId);
}
