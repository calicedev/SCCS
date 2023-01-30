package com.scss.api.mypage.mapper;

import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageMapper {

  public List<HashMap<String, Object>> getHistory(String memberId, String year, String month);

  public List<HashMap<String, Object>> getHistoryDetail(int studyId);

  public List<HashMap<String, Object>> getProblems(String memberId);


}
