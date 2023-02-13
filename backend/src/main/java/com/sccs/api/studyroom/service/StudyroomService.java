package com.sccs.api.studyroom.service;

import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.studyroom.dto.ProblemDto;
import com.sccs.api.studyroom.dto.StudyroomDto;
import com.sccs.api.studyroom.dto.SubmissionDto;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface StudyroomService {

  /** 방 생성 로직  **/
  public int createStudyroom(StudyroomDto studyroomDto);

  /** 메인 페이지에서 전체 방 조회 **/
  public List<Map<String, Object>> selectAllStudyroom();

  /** 메인 페이지에서 전체 조건별 조회 **/
  public List<Map<String, Object>> selectStudyroom(StudyroomDto studyroomDto);

  /** 방 입장시 비밀번호 체크 **/
  public String checkStudyroomPassword(StudyroomDto studyroomDto);

  /** 특정 스터디 방으로 입장 : 대기방으로 입장 **/
  public Map<String, Object> enterStudyroom(int id);

  /** 코딩 테스트 시작하기 **/
  public Map<String, Object> startCodingTest(StudyroomDto studyroomDto) throws IOException;

  /** 코딩 테스트 코드 제출 **/
  public Map<String, Object> submitProblem(SubmissionDto submissionDto) throws IOException;

  /** 코딩 테스트 테스트 코드 제출 **/
  public Map<String, Object> submitTest(SubmissionDto submissionDto) throws IOException;

  /** 코딩 테스트 방장에 의해 끝내기 **/
  public String endStudyroomByOwner(int id);

  /** 소켓 통신 인원 조회 **/
  public int getStudyroomPersonnel(int id);

  /** 소켓 통신 처음에 들어오는 사람 increase **/
  public int increaseStudyroomPersonnel(int id);

  /** 소켓 통신 처음에 들어오는 사람 decrease **/
  public int decreaseStudyroomPersonnel(int id);

  /** 메인 화면에서 입장할 때 존재하는 방인지 체크하는 로직 **/
  public boolean isExistStudyroom(int id);

  /** 스터디룸 조회하면 호스트 닉네임 반환. id랑 nickname이랑 꼬여서 만든 로직. **/
  public MemberDto getHostnicknameByStudyroomInfo(int studyroomId);

  /** 스터디 시작하기 **/
  public List startStudy(StudyroomDto studyroomDto);
}
