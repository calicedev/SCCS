package com.scss.api.studyroom.mapper;

import com.scss.api.studyroom.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface StudyroomMapper {
    public void createStudyroom(StudyroomDto studyroomDto);

    public void insertLanguageId(StudyroomLanguageDto studyroomLanguageDto);

    public void insertAlgoId(StudyroomAlgoDto studyroomAlgoDto);

    public int selectProblemCount(int algoId);

    public void insertProblemId(StudyroomProblemDto studyroomProblemDto);

    public int selectProblemId(String path);

    public void insertMemberId(StudyroomMemberDto studyroomMemberDto);

    public List<StudyroomDto> selectAllStudyroom();

    public List<StudyroomDto> selectStudyroom(StudyroomDto studyroomDto);

    public int checkStudyroomPassword(StudyroomDto studyroomDto);

    public void insertMemberIds(StudyroomDto studyroomDto);

    public StudyroomDto selectStudyroomById(int id);

    public List<ProblemDto> selectProblemByStudyroomId(int id);

    public void submitProblem(SubmissionDto submissionDto);

    public void changeStudyroomSolvingStatus(StudyroomDto studyroomDto);

    public int endStudyroomByOwner(StudyroomDto studyroomDto);

    public ProblemDto getProblemInfo(int problemId);

    public StudyroomDto enterStudyroom(int id);
}
