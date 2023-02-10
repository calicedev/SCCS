package com.sccs.api.studyroom.service;

import com.sccs.api.aws.dto.FileDto;
import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.studyroom.dto.ProblemDto;
import com.sccs.api.studyroom.dto.StudyroomAlgoDto;
import com.sccs.api.studyroom.dto.StudyroomDto;
import com.sccs.api.studyroom.dto.StudyroomLanguageDto;
import com.sccs.api.studyroom.dto.StudyroomMemberDto;
import com.sccs.api.studyroom.dto.StudyroomProblemDto;
import com.sccs.api.studyroom.dto.SubmissionDto;
import com.sccs.api.studyroom.file.FileStore;
import com.sccs.api.studyroom.mapper.StudyroomMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class StudyroomServiceImpl implements StudyroomService {

  private static final Logger logger = LoggerFactory.getLogger(StudyroomServiceImpl.class);
  private static final String SUCCESS = "success";
  private static final String FAIL = "fail";
  private final StudyroomMapper studyroomMapper;
  private final AwsS3Service awsS3service;
  private final FileStore fileStore;
  private static final RestTemplate REST_TEMPLATE;

  static {
    // RestTemplate 기본 설정을 위한 Factory 생성
    SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    factory.setConnectTimeout(30000);
    factory.setReadTimeout(30000);
    factory.setBufferRequestBody(false); // 파일 전송은 이 설정을 꼭 해주자.
    REST_TEMPLATE = new RestTemplate(factory);
  }

  @Value("${file.dir2}")
  private String fileDir;

  /**
   * 방 생성
   **/
  @Override
  public int createStudyroom(StudyroomDto studyroomDto) {
    try {

      // 1. studyroom DB에 스터디 룸 생성
      studyroomMapper.createStudyroom(studyroomDto);

      // 2. studYroom_language DB에 언어 유형 입력
      int id = studyroomDto.getId();
      List<Integer> language_ids = studyroomDto.getLanguageIds();

      StudyroomLanguageDto studyroomLanguageDto = new StudyroomLanguageDto();
      studyroomLanguageDto.setStudyroomId(id);

      for (int i = 0; i < language_ids.size(); i++) {
        studyroomLanguageDto.setLanguageId(language_ids.get(i));
        studyroomMapper.insertLanguageId(studyroomLanguageDto);
      }

      // 3. 받은 알고리즘 유형에 따라 문제 선택해서 보내주기.
      List<Integer> algo_ids = studyroomDto.getAlgoIds();
      StudyroomAlgoDto studyroomAlgoDto = new StudyroomAlgoDto();
      studyroomAlgoDto.setStudyroomId(id);
      //받은 알고리즘 유형이 랜덤이면
      if (algo_ids.size() == 1 && algo_ids.get(0).equals(0)) {
        int min = 1;
        int max = 2;

        for (int i = 0; i < 7; i++) {
          // 알고리즘 유형 2개 랜덤하게 고르기
          int randomAlgo = (int) (Math.random() * (max - min + 1)) + min;
          // 알고리즘 유형 2개 저장.
          studyroomAlgoDto.setAlgoId(randomAlgo);
          studyroomMapper.insertAlgoId(studyroomAlgoDto);
          // 저장한 2개 알고리즘 유형 중에서 문제 랜덤으로 2개 선택하기
          int algoCount = studyroomMapper.selectProblemCount(studyroomAlgoDto.getAlgoId());
          int min2 = 1;
          int max2 = algoCount;
          int randomProblem = (int) (Math.random() * (max2 - min2 + 1)) + min2;
          String path = Integer.toString(randomAlgo) + "-" + Integer.toString(randomProblem);
          int problemId = studyroomMapper.selectProblemId(path);
          StudyroomProblemDto studyroomProblemDto = new StudyroomProblemDto();
          studyroomProblemDto.setStudyroomId(id);
          studyroomProblemDto.setProblemId(problemId);
          studyroomMapper.insertProblemId(studyroomProblemDto);

        }
      } else if (algo_ids.size() == 1 && !algo_ids.get(0).equals(0)) {
        // 알고리즘 유형 1개 저장
        studyroomAlgoDto.setAlgoId(algo_ids.get(0));
        studyroomMapper.insertAlgoId(studyroomAlgoDto);
        // 저장한 1개 알고리즘 유형 중에서 문제 랜덤으로 2개 선택하기
        int algoCount = studyroomMapper.selectProblemCount(studyroomAlgoDto.getAlgoId());
        int n[] = new int[2];
        int randomProblem = 0;
        for (int i = 0; i < n.length; i++) {
          do {
            int min2 = 1;
            int max2 = algoCount;
            randomProblem = (int) (Math.random() * (max2 - min2 + 1)) + min2;
          } while (checkout(n, randomProblem));
          n[i] = randomProblem;
        }
        StudyroomProblemDto studyroomProblemDto = new StudyroomProblemDto();
        studyroomProblemDto.setStudyroomId(id);
        for (int i = 0; i < 2; i++) {
          String path = Integer.toString(algo_ids.get(0)) + "-" + Integer.toString(n[i]);
          int problemId = studyroomMapper.selectProblemId(path);
          studyroomProblemDto.setProblemId(problemId);
          studyroomMapper.insertProblemId(studyroomProblemDto);
        }

      } else if (algo_ids.size() == 2) {
        // 알고리즘 유형 2개 저장
        // 저장한 2개 알고리즘 유형 중에서 각각 하나씩 문제 랜덤으로 2개 선택하기
        for (int i = 0; i < 2; i++) {
          studyroomAlgoDto.setAlgoId(algo_ids.get(i));
          studyroomMapper.insertAlgoId(studyroomAlgoDto);
          int algoCount = studyroomMapper.selectProblemCount(studyroomAlgoDto.getAlgoId());
          int min2 = 1;
          int max2 = algoCount;
          int randomProblem = (int) (Math.random() * (max2 - min2 + 1)) + min2;
          StudyroomProblemDto studyroomProblemDto = new StudyroomProblemDto();
          String path = Integer.toString(algo_ids.get(i)) + "-" + Integer.toString(randomProblem);
          int problemId = studyroomMapper.selectProblemId(path);
          studyroomProblemDto.setStudyroomId(id);
          studyroomProblemDto.setProblemId(problemId);
          studyroomMapper.insertProblemId(studyroomProblemDto);
        }
      }

      // 방장을 알고리즘 스터디_멤버에 삽입
      StudyroomMemberDto studyroomMemberDto = new StudyroomMemberDto();
      studyroomMemberDto.setMemberId(studyroomDto.getHostId());
      studyroomMemberDto.setStudyroomId(id);
      studyroomMapper.insertMemberId(studyroomMemberDto);
      return id;
    } catch (Exception e) {
      e.printStackTrace();
      return 0;
    }
  }

  /**
   * 메인 페이지에서 전체 방 조회
   **/
  @Override
  public List<Map<String, Object>> selectAllStudyroom() {
    List<StudyroomDto> s = studyroomMapper.selectAllStudyroom();
    List<Map<String, Object>> studyrooms = new ArrayList<>();
    int size = s.size();

    for (int i = 0; i < size; i++) {
      Map<String, Object> resultMap = new HashMap<>();
      resultMap.put("languageIds", s.get(i).getLanguageIds());
      resultMap.put("algoIds", s.get(i).getAlgoIds());
      resultMap.put("isPrivate", s.get(i).getIsPrivate());
      resultMap.put("isSolving", s.get(i).getIsSolving());
      resultMap.put("title", s.get(i).getTitle());
      resultMap.put("id", s.get(i).getId());
      resultMap.put("personnel", s.get(i).getPersonnel());
      studyrooms.add(resultMap);
    }
    return studyrooms;
  }

  /**
   * 메인 페이지에서 전체 조건별 조회
   **/
  @Override
  public List<Map<String, Object>> selectStudyroom(StudyroomDto studyroomDto) {
    List<StudyroomDto> s = studyroomMapper.selectStudyroom(studyroomDto);
    List<Map<String, Object>> studyrooms = new ArrayList<>();
    int size = s.size();

    for (int i = 0; i < size; i++) {
      Map<String, Object> resultMap = new HashMap<>();
      resultMap.put("languageIds", s.get(i).getLanguageIds());
      resultMap.put("algoIds", s.get(i).getAlgoIds());
      resultMap.put("isPrivate", s.get(i).getIsPrivate());
      resultMap.put("isSolving", s.get(i).getIsSolving());
      resultMap.put("title", s.get(i).getTitle());
      resultMap.put("id", s.get(i).getId());
      resultMap.put("hostId", s.get(i).getHostId());
      resultMap.put("personnel", s.get(i).getPersonnel());
      studyrooms.add(resultMap);
    }
    return studyrooms;
  }

  /**
   * 방 입장시 비밀번호 체크
   **/
  @Override
  public String checkStudyroomPassword(StudyroomDto studyroomDto) {
    try {
      if (studyroomMapper.checkStudyroomPassword(studyroomDto) == 1) {
        return SUCCESS;
      } else {
        return FAIL;
      }
    } catch (Exception e) {
      e.printStackTrace();
      return FAIL;
    }
  }

  /**
   * 특정 스터디 방으로 입장 : 대기방으로 입장
   **/
  @Override
  public Map<String, Object> enterStudyroom(int id) {
    StudyroomDto s = studyroomMapper.enterStudyroom(id);
    String hostNickname = studyroomMapper.getNicknameById(s.getHostId());
    Map<String, Object> resultMap = null;
    if (s.getPersonnel() < 6) {
      resultMap = new HashMap<>();
      resultMap.put("languageIds", s.getLanguageIds());
      resultMap.put("algoIds", s.getAlgoIds());
      resultMap.put("isPrivate", s.getIsPrivate());
      resultMap.put("isSolving", s.getIsSolving());
      resultMap.put("title", s.getTitle());
      resultMap.put("id", s.getId());
      resultMap.put("hostId", s.getHostId());
      resultMap.put("hostNickname", hostNickname);
      resultMap.put("personnel", s.getPersonnel());
    } else if (s.getPersonnel() == 6) {
      resultMap = new HashMap<>();
      resultMap.put("result", "full");
    }
    return resultMap;
  }

  /**
   * 코딩 테스트 시작하기
   **/
  @Override
  public Map<String, Object> startCodingTest(StudyroomDto studyroomDto)
      throws IOException {
    Map<String, Object> resultMap = new HashMap<>();

    // 1. isSolving 상태를 진행 중(1)으로 바꾼다.
    studyroomMapper.changeStudyroomSolvingStatus(studyroomDto);

    // 2. 스터디 시작하는 애들 아이디 넣어준다.
    studyroomMapper.insertMemberIds(studyroomDto);

    // 3. 스터디룸 정보를 담은 걸 resultmap에 담는다.
    StudyroomDto s = studyroomMapper.selectStudyroomById(studyroomDto.getId());
    resultMap.put("algo_ids", s.getAlgoIds());
    resultMap.put("title", s.getTitle());
    resultMap.put("id", s.getId());

    List<ProblemDto> p = studyroomMapper.selectProblemByStudyroomId(studyroomDto.getId());

    resultMap.put("problems", p);
    for (int i = 0; i < 2; i++) {
      String path = p.get(i).getProblemFolder();
      String realPath = "problem/"+path+".jpg";
      System.out.println(realPath);
      p.get(i).setProblemImageUrl(awsS3service.getTemporaryUrl(realPath));
    }

    return resultMap;
  }

  /**
   * 코딩 테스트 문제 제출
   *
   * @return
   */
  @Override
  public List<Map<String, Object>> submitProblem(SubmissionDto submissionDto) throws IOException {
    ProblemDto problemDto = studyroomMapper.getProblemInfo(submissionDto.getProblemId());
    String slashProblemFolder =problemDto.getProblemFolder().replace("-", "/");
    //파일을 원하는 경로에 실제로 저장한다.
    MultipartFile f = fileStore.storeFile(submissionDto, slashProblemFolder);
    FileDto fileDto = awsS3service.upload(f,"submission");
    // 폴더에서 채점 서버로 보낼 파일 가져와서 resource에 담기
    UrlResource resource = new UrlResource("file:" + fileStore.getFullPath(slashProblemFolder, f.getName()));

    String tempNo = slashProblemFolder.substring(slashProblemFolder.lastIndexOf("/")+1);

    LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
    HttpStatus httpStatus = HttpStatus.CREATED;
    map.add("mfile",resource);
    map.add("runtime",problemDto.getTimeLimit());
    map.add("type",problemDto.getAlgoId());
    map.add("no",tempNo);
    map.add("memory",problemDto.getMemoryLimit());

    //여기서 찬희님한테 파일 전달
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    //채점 서버 url
    String url ="https://sccs.kr";
    if(submissionDto.getLanguageId()==1){
      url+="/solve/python/submission";
    }else if(submissionDto.getLanguageId()==2){
      url+="/solve/java/submission";
    }

    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
//        ResponseEntity<Object> s = REST_TEMPLATE.exchange(url, HttpMethod.POST, requestEntity, Object.class);
    List<Map<String, Object>> s = REST_TEMPLATE.postForObject(url, requestEntity, List.class);

    //문제 제출 정보를 실제 디비에 저장한다.
    submissionDto.setFileName(f.getName());
    submissionDto.setResult((Boolean) s.get(5).get("isAnswer"));
    submissionDto.setMemory((Integer) s.get(5).get("avgMemory"));
    submissionDto.setRuntime(Double.parseDouble(String.valueOf(s.get(5).get("avgRuntime"))));
    studyroomMapper.submitProblem(submissionDto);

    return s;
  }

  /**
   * 코딩 테스트 테스트 코드 제출
   */
  public List<Map<String, Object>> submitTest(SubmissionDto submissionDto) throws IOException {
    ProblemDto problemDto = studyroomMapper.getProblemInfo(submissionDto.getProblemId());
    String slashProblemFolder =problemDto.getProblemFolder().replace("-", "/");
    //파일을 원하는 경로에 실제로 저장한다.
    MultipartFile f = fileStore.storeFile(submissionDto, slashProblemFolder);
    FileDto fileDto = awsS3service.upload(f,"submission");
    // 폴더에서 채점 서버로 보낼 파일 가져와서 resource에 담기
    UrlResource resource = new UrlResource("file:" + fileStore.getFullPath(slashProblemFolder, f.getName()));

    String tempNo = slashProblemFolder.substring(slashProblemFolder.lastIndexOf("/")+1);

    LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
    HttpStatus httpStatus = HttpStatus.CREATED;
    map.add("mfile",resource);
    map.add("runtime",problemDto.getTimeLimit());
    map.add("type",problemDto.getAlgoId());
    map.add("no",tempNo);
    map.add("memory",problemDto.getMemoryLimit());

    //여기서 찬희님한테 파일 전달
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    //채점 서버 url
    String url ="https://sccs.kr";
    if(submissionDto.getLanguageId()==1){
      url+="/solve/python/submission";
    }else if(submissionDto.getLanguageId()==2){
      url+="/solve/java/submission";
    }

    HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
//        ResponseEntity<Object> s = REST_TEMPLATE.exchange(url, HttpMethod.POST, requestEntity, Object.class);
    List<Map<String, Object>> s = REST_TEMPLATE.postForObject(url, requestEntity, List.class);

    //문제 제출 정보를 실제 디비에 저장한다.
    submissionDto.setFileName(f.getName());
    submissionDto.setResult((Boolean) s.get(5).get("isAnswer"));
    submissionDto.setMemory((Integer) s.get(5).get("avgMemory"));
    submissionDto.setRuntime(Double.parseDouble(String.valueOf(s.get(5).get("avgRuntime"))));
    studyroomMapper.submitProblem(submissionDto);

    return s;
  }

  /**
   * 코딩 테스트 방장에 의해 끝내기
   **/
  @Override
  public String endStudyroomByOwner(StudyroomDto studyroomDto) {
    try {
      if (studyroomMapper.endStudyroomByOwner(studyroomDto) == 1) {
        return SUCCESS;
      } else {
        return FAIL;
      }
    } catch (Exception e) {
      e.printStackTrace();
      return FAIL;
    }
  }

  public ProblemDto getProblemInfo(int problemId) {
    ProblemDto p = studyroomMapper.getProblemInfo(problemId);
    return p;
  }

  public int getStudyroomPersonnel(int id) {
    int personnel = studyroomMapper.getStudyroomPersonnel(id);
    return personnel;
  }

  @Override
  public int increaseStudyroomPersonnel(StudyroomDto studyroomDto) {
    return studyroomMapper.increaseStudyroomPersonnel(studyroomDto);
  }


  public int decreaseStudyroomPersonnel(StudyroomDto studyroomDto) {
    return studyroomMapper.decreaseStudyroomPersonnel(studyroomDto);
  }


  @Override
  public boolean isExistStudyroom(int id) {
    boolean isExist = studyroomMapper.isExistStudyroom(id);
    return isExist;
  }

  @Override
  public List<SubmissionDto> getStudyInfo(StudyroomDto studyroomDto) {
    List<SubmissionDto> s= studyroomMapper.getStudyInfo(studyroomDto);
    for(int i=0; i<s.size(); i++){
      s.get(i).setFileUrl(awsS3service.getTemporaryUrl("submission/"+s.get(i).getFileName()));
    }
    return s;
  }



  private static boolean checkout(int n[], int index) {
    for (int i = 0; i < n.length; i++) {
        if (n[i] == index) {
            return true;
        }
    }
    return false;
  }

}
