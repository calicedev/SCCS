package com.scss.api.mypage.service;

import java.util.HashMap;
import java.util.List;

public interface MypageService {

  public List<HashMap<String, Object>> getHistory(String memberId, String year, String month);

  public List<HashMap<String, Object>> getHistoryDetail(int studyId);

  public List<HashMap<String, Object>> getProblems(String memberId);


}
