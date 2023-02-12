package com.sccs.api.mypage.mapper;

import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageMapper {

  public List<HashMap<String, Object>> getHistory(String memberId, String year, String month);

  public HashMap<String, Object> getHistoryDetail(int studyId);

  public List<HashMap<String, Object>> getProblems(String memberId);

  public HashMap<String, Object> getProblemUrl(String memberId, int problemId);

  public String getProblemUrlOnly(int problemId);

}
