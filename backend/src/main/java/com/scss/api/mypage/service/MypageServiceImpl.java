package com.scss.api.mypage.service;

import com.scss.api.mypage.dto.MypageDto;
import com.scss.api.mypage.mapper.MypageMapper;
import com.scss.api.studyroom.service.StudyroomServiceImpl;
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
  public MypageDto getHistory(String memberId, String year, String month) {
    return mypageMapper.getHistory(memberId, year, month);
  }

  @Override
  public MypageDto getHistroyDeatil(int studyId) {
    return mypageMapper.getHistroyDeatil(studyId);
  }

  @Override
  public MypageDto getProblems(String memberId) {
    return mypageMapper.getProblems(memberId);
  }
}
