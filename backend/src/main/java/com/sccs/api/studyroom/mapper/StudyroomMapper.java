package com.sccs.api.studyroom.mapper;

import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.studyroom.dto.ProblemDto;
import com.sccs.api.studyroom.dto.StudyroomAlgoDto;
import com.sccs.api.studyroom.dto.StudyroomDto;
import com.sccs.api.studyroom.dto.StudyroomLanguageDto;
import com.sccs.api.studyroom.dto.StudyroomMemberDto;
import com.sccs.api.studyroom.dto.StudyroomProblemDto;
import com.sccs.api.studyroom.dto.SubmissionDto;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudyroomMapper {

  /** 방 생성 로직  **/
  public void createStudyroom(StudyroomDto studyroomDto);
  public void insertLanguageId(StudyroomLanguageDto studyroomLanguageDto);
  public void insertAlgoId(StudyroomAlgoDto studyroomAlgoDto);
  public int selectProblemCount(int algoId);
  public void insertProblemId(StudyroomProblemDto studyroomProblemDto);
  public int selectProblemId(String path);
  public void insertMemberId(StudyroomMemberDto studyroomMemberDto);

  /** 메인 페이지에서 전체 방 조회 **/
  public List<StudyroomDto> selectAllStudyroom();

  /** 메인 페이지에서 전체 조건별 조회 **/
  public List<StudyroomDto> selectStudyroom(StudyroomDto studyroomDto);

  /** 방 입장시 비밀번호 체크 **/
  public int checkStudyroomPassword(StudyroomDto studyroomDto);

  /** 특정 스터디 방으로 입장 : 대기방으로 입장 **/
  public StudyroomDto enterStudyroom(int id);
  public String getNicknameById(String id);

  /** 코딩 테스트 시작하기 **/
  public void changeStudyroomSolvingStatus(StudyroomDto studyroomDto);
  public MemberDto getHostnicknameByStudyroomInfo(int studyroomId);
  public void insertMemberIds(StudyroomDto studyroomDto);
  public StudyroomDto selectStudyroomById(int id);
  public List<ProblemDto> selectProblemByStudyroomId(int id);


  /** 코딩 테스트 문제 제출 **/
  public ProblemDto getProblemInfo(int problemId);
  public int isSolvingByUser(SubmissionDto submissionDto);
  public int getScoreByMember(String id);
  public void injectScore(Map<String, Object> resultMap);
  public void submitProblem(SubmissionDto submissionDto);
  public void updateProblemInfo(Map<String, Object> p);

  /** 스터디 시작하기 **/
  public int getStudyroomPersonnel(int id);
  public List<SubmissionDto> getStudyInfo(StudyroomDto studyroomDto);

  /** 코딩 테스트 방장에 의해 끝내기 **/
  public int endStudyroomByOwner(int id);

  /** 소켓 통신 인원 조회 **/
  public int increaseStudyroomPersonnel(int id);
  public int decreaseStudyroomPersonnel(int id);

  /** 메인 화면에서 입장할 때 존재하는 방인지 체크하는 로직 **/
  public boolean isExistStudyroom(int id);













}
