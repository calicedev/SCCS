package com.scss.api.mypage.service;

import com.scss.api.mypage.dto.MypageDto;

public interface MypageService {

  public MypageDto getHistory(String memberId, String year, String month);

  public MypageDto getHistroyDeatil(int studyId);

  public MypageDto getProblems(String memberId);
}
