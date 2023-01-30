package com.scss.api.mypage.service;

import com.scss.api.mypage.dto.MypageDto;
import java.util.HashMap;
import java.util.List;

public interface MypageService {

  public MypageDto getHistory(String memberId, String year, String month);

  public MypageDto getHistroyDeatil(int studyId);

  public List<HashMap<String, Object>> getProblems(String memberId);


}
