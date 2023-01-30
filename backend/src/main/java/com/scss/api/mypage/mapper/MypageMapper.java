package com.scss.api.mypage.mapper;

import com.scss.api.mypage.dto.MypageDto;
import java.util.HashMap;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MypageMapper {

  public MypageDto getHistory(String memberId, String year, String month);

  public MypageDto getHistroyDeatil(int studyId);

  public List<HashMap<String, Object>> getProblems(String memberId);


}
