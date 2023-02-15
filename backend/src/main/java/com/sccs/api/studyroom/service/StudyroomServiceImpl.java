package com.sccs.api.studyroom.service;

import com.sccs.api.aws.service.AwsS3Service;
import com.sccs.api.member.dto.MemberDto;
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
import java.util.*;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
//            if (algo_ids.size() == 1 && algo_ids.get(0).equals(0)) {
            if (algo_ids.size() == 1 && algo_ids.get(0)==0) {
                int min = 1;
                int max = 7;

                for (int i = 0; i < 2; i++) {
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
            } else if (algo_ids.size() == 1 && algo_ids.get(0)!=0) {
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
        if (s.getIsSolving()) {
            resultMap = new HashMap<>();
            resultMap.put("result", "isSolving");
        } else if (s.getPersonnel() < 6) {
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

        // 2. 요청을 보내는 사람이 호스트이면 스터디 시작하는 애들 아이디를 DB에 넣어준다.
        //  -> 요청 보내는 스터디룸 조회를 해서 호스트 정보를 가지고 있어. 그 호스트가 요청한 사람이랑 같으면 DB 접근
        MemberDto hostMemberDto = studyroomMapper.getHostInfoByStudyroomId(studyroomDto.getId());
        if (studyroomDto.getMemberId().equals(hostMemberDto.getId())) {
            studyroomMapper.insertMemberIds(studyroomDto);
        }

        // 3. 스터디룸 정보를 담은 걸 resultmap에 담는다.
        StudyroomDto s = studyroomMapper.selectStudyroomById(studyroomDto.getId());
        resultMap.put("algo_ids", s.getAlgoIds());
        resultMap.put("title", s.getTitle());
        resultMap.put("id", s.getId());

        // 4. 문제 정보를 얻고 그 문제 정보에 S3에서 가져온 이미지 URK 담는다.
        List<ProblemDto> p = studyroomMapper.selectProblemByStudyroomId(studyroomDto.getId());
        for (int i = 0; i < 2; i++) {
            String realPath = "problem/" + p.get(i).getProblemFolder() + ".jpg";
            p.get(i).setProblemImageUrl(awsS3service.getTemporaryUrl(realPath));
        }
        resultMap.put("problems", p);
        return resultMap;
    }

    /**
     * 코딩 테스트 문제 제출
     **/
    @Override
    public Map<String, Object> submitProblem(SubmissionDto submissionDto) throws IOException {
        ProblemDto problemDto = studyroomMapper.getProblemInfo(submissionDto.getProblemId());
        //파일을 원하는 경로에 실제로 저장한다.
        MultipartFile f = fileStore.storeFile(submissionDto.getFormFile());
        //aws에 실제로 제출한 파일 저장.
        awsS3service.upload(f, "submission");

        // 폴더에서 채점 서버로 보낼 파일 가져와서 resource에 담기
        UrlResource resource = new UrlResource("file:" + fileStore.getFullPath(f.getName()));
        // 채점 서버로 보내줄 정보 뽑아내기
        String tempNo = problemDto.getProblemFolder().substring(problemDto.getProblemFolder().lastIndexOf("-") + 1);
        // 채점 서버로 보낼 맵 생성하고, 거기에 필요한 정보를 담아서 보내준다.
        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        HttpStatus httpStatus = HttpStatus.CREATED;
        map.add("mfile", resource);
        map.add("runtime", problemDto.getTimeLimit());
        map.add("type", problemDto.getAlgoId());
        map.add("no", tempNo);
        map.add("memory", problemDto.getMemoryLimit());

        //여기서 찬희님한테 파일 전달
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        //채점 서버 url
        //String url = "http://70.12.246.161:8201";
        String url = "https://sccs.kr";
        if (submissionDto.getLanguageId() == 1) {
            url += "/solve/python/submission";
        } else if (submissionDto.getLanguageId() == 2) {
            url += "/solve/java/submission";
        }

        //프록시 서버에서 채점 서버로 API 호출
        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
        Map<String, Object> s = REST_TEMPLATE.postForObject(url, requestEntity, Map.class);


        System.out.println((Boolean) s.get("isAnswer"));

        // 문제를 풀었다는 정보를 문제 db에 저장하기 위해 problem에 담는다
        Map<String, Object> p = new HashMap<>();
        p.put("id", problemDto.getId());
        // 찬희님 한테서 가져온 정보를 확인해보고 마지막 5 배열이 맞았고 회원에서 한번도 풀린적이 없다면 점수를 더해준다.
        // 만약 맞았어. 한번도 안풀었어.
        if ((Boolean) s.get("isAnswer")) {
            if (studyroomMapper.isSolvingByUser(submissionDto) == 0) {
                // 내 등급을 알기 위해 member에서 내 점수를 가져와
                int score = studyroomMapper.getScoreByMember(submissionDto.getMemberId());
                Map<String, Object> resultMap = new HashMap<>();
                resultMap.put("difficulty", problemDto.getDifficulty());
                resultMap.put("id", submissionDto.getMemberId());
                resultMap.put("memberScore", score);
                studyroomMapper.injectScore(resultMap);
            }
            p.put("correct", 1);
        }

        // 문제 풀었다는 걸 db에 저장한다.
        studyroomMapper.updateProblemInfo(p);

        //문제 제출 정보를 실제 디비에 저장한다.
        submissionDto.setFileName(f.getName());
        submissionDto.setResult((Boolean) s.get("isAnswer"));
        submissionDto.setMemory((Integer) s.get("avgMemory"));
        submissionDto.setRuntime(Double.parseDouble(String.valueOf(s.get("avgRuntime"))));
        studyroomMapper.submitProblem(submissionDto);
        return s;
    }

    /**
     * 코딩 테스트 테스트 코드 제출
     **/

    public Map<String, Object> submitTest(SubmissionDto submissionDto) throws IOException {
        ProblemDto problemDto = studyroomMapper.getProblemInfo(submissionDto.getProblemId());
        //파일을 원하는 경로에 실제로 저장한다.
        MultipartFile f = fileStore.storeFile(submissionDto.getFormFile());
        // 폴더에서 채점 서버로 보낼 파일 가져와서 resource에 담기
        UrlResource resource = new UrlResource("file:" + fileStore.getFullPath(f.getName()));
        // 채점 서버로 보내줄 정보 뽑아내기
        String tempNo = problemDto.getProblemFolder().substring(problemDto.getProblemFolder().lastIndexOf("-") + 1);
        // 채점 서버로 보낼 맵 생성하고, 거기에 필요한 정보를 담아서 보내준다.
        LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
        HttpStatus httpStatus = HttpStatus.CREATED;
        map.add("mfile", resource);
        map.add("runtime", problemDto.getTimeLimit());
        map.add("type", problemDto.getAlgoId());
        map.add("no", tempNo);
        map.add("memory", problemDto.getMemoryLimit());

        //여기서 찬희님한테 파일 전달
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        //채점 서버 url
        String url = "https://sccs.kr";
        if (submissionDto.getLanguageId() == 1) {
            url += "/solve/python/test";
        } else if (submissionDto.getLanguageId() == 2) {
            url += "/solve/java/test";
        }

        //프록시 서버에서 채점 서버로 API 호출
        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(map, headers);
        Map<String, Object> s = REST_TEMPLATE.postForObject(url, requestEntity, Map.class);
        return s;
    }

    /**
     * 스터디 시작하기
     **/
    public List startStudy(StudyroomDto studyroomDto) {
        List resultMap = new ArrayList();

        for (int i = 0; i < 2; i++) {
            Map<String, Object> problem = new HashMap<>();

            // 스터디 정보 가져오기
            int problemId = studyroomDto.getProblemIds().get(i);
            studyroomDto.setProblemId(problemId);
            List<SubmissionDto> s = studyroomMapper.getStudyInfo(studyroomDto);

            // 문제 아이디 넣어주기
            problem.put("problemId", problemId);

            // AWS에서 문제 사진 가져오기
            ProblemDto p = studyroomMapper.getProblemInfo(problemId);
            String url = awsS3service.getTemporaryUrl("problem/" + p.getProblemFolder() + ".jpg");
            problem.put("problemImgUrl", url);

            // 제출 코드 리스트에 담기
            if (s.size() != 0) {
                problem.put("codeList", s);
                //문제 이미지 담기
                for (int j = 0; j < s.size(); j++) {
                    s.get(j).setFileUrl(awsS3service.getTemporaryUrl("submission/" + s.get(j).getFileName()));
                }
            } else {
                List<String> emptyList = Collections.emptyList();
                problem.put("codeList", emptyList);
            }
            resultMap.add(problem);
        }
        return resultMap;
    }

    /**
     * 닉네임과 id 꼬여서 넣은 로직. 되도록이면 쓰지말자.
     **/
    @Override
    public String getNicknameById(String id) {
        return studyroomMapper.getNicknameById(id);
    }

    @Override
    public String getIdByNickname(String nickname) {
        return studyroomMapper.getIdByNickname(nickname);
    }


    /**
     * 코딩 테스트 방장에 의해 끝내기
     **/
    @Override
    public String endStudyroomByOwner(int id) {
        try {
            if (studyroomMapper.endStudyroomByOwner(id) == 1) {
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
     * 소켓 통신 인원 조회
     **/
    public int getStudyroomPersonnel(int id) {
        int personnel = studyroomMapper.getStudyroomPersonnel(id);
        return personnel;
    }

    /**
     * 소켓 통신 처음에 들어오는 사람 increase
     **/
    @Override
    public int increaseStudyroomPersonnel(int id) {
        return studyroomMapper.increaseStudyroomPersonnel(id);
    }


    /**
     * 소켓 통신 처음에 들어오는 사람 decrease
     **/
    public int decreaseStudyroomPersonnel(int id) {
        return studyroomMapper.decreaseStudyroomPersonnel(id);
    }


    /**
     * 메인 화면에서 입장할 때 존재하는 방인지 체크하는 로직
     */
    @Override
    public boolean isExistStudyroom(int id) {
        boolean isExist = studyroomMapper.isExistStudyroom(id);
        return isExist;
    }

    /**
     * 스터디룸 조회하면 호스트 아이디와 닉네임 반환.
     */
    @Override
    public MemberDto getHostInfoByStudyroomId(int studyroomId) {
        return studyroomMapper.getHostInfoByStudyroomId(studyroomId);
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
