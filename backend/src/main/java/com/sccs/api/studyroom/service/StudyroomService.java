package com.sccs.api.studyroom.service;

import com.sccs.api.studyroom.dto.ProblemDto;
import com.sccs.api.studyroom.dto.StudyroomDto;
import com.sccs.api.studyroom.dto.SubmissionDto;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface StudyroomService {


  /** 방 생성 로직  **/
  public int createStudyroom(StudyroomDto studyroomDto);

  /** 메인 페이지를 위한 모든 방 정보 가져오기 **/
  public List<Map<String, Object>> selectAllStudyroom();

  /** 검색 조건에 맞는 방 정보 가져오기  **/
  public List<Map<String, Object>> selectStudyroom(StudyroomDto studyroomDto);

  public Map<String, Object> enterStudyroom(int id);

  public String checkStudyroomPassword(StudyroomDto studyroomDto);

  public Map<String, Object> startCodingTest(StudyroomDto studyroomDto)
      throws IOException;

  public List<Map<String, Object>> submitProblem(SubmissionDto submissionDto) throws IOException;

  public List<Map<String, Object>> submitTest(SubmissionDto submissionDto) throws IOException;
  public String endStudyroomByOwner(StudyroomDto studyroomDto);

  public ProblemDto getProblemInfo(int problemId);

  public int getStudyroomPersonnel(int id);

  public int increaseStudyroomPersonnel(StudyroomDto studyroomDto);

  public int decreaseStudyroomPersonnel(StudyroomDto studyroomDto);

  public boolean isExistStudyroom(int id);

  public List<SubmissionDto> getStudyInfo(StudyroomDto studyroomDto);


}
