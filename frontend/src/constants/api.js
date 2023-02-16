const api = function (type, options = {}) {
  const apiObject = {
    // 사용자 인증
    signup: ['/api/member', 'post'],
    check_id: [`/api/unique/id/${options.id}`, 'get'],
    check_nickname: [`/api/unique/nickname/${options.nickname}`, 'get'],
    check_email: [`/api/unique/email/${options.email}`, 'get'],
    login: ['/api/member/login', 'post'],
    logout: ['/api/member/refreshToken', 'delete'],
    findId: ['/api/member/id', 'post'],
    resetPassword: ['/api/member/password', 'post'],
    refreshToken: ['/api/member/refreshToken', 'get'],
    getUserInfo: [`/api/member`, 'get'],

    // 마이페이지
    updateUserInfo: ['/api/member', 'patch'],
    updatePassword: ['/api/member/password', 'patch'],
    withdrawl: ['/api/member', 'delete'],
    studyHistory: [
      `/api/mypage/history/${options.id}/${options.year}/${options.month}`,
      'get',
    ],
    studyDetail: [`/api/mypage/history/detail/${options.id}`, 'get'],
    solvedProblem: [`/api/mypage/problem/${options.id}`, 'get'],
    solveProblem: [
      `/api/mypage/problem/${options.memberId}/solve/${options.problemId}`,
      'get',
    ], // 코드 제출내역

    // 메인 페이지
    createRoom: ['/api/studyroom', 'post'],
    searchRoom: ['/api/studyroom', 'get'],
    searchRoomDetail: ['/api/studyroom/detail', 'post'],
    checkRoomPassword: ['/api/studyroom/password', 'post'],

    // 스터디
    enterRoom: [`/api/studyroom/waitingroom/${options.studyroomId}`, 'get'], // 방 입장
    codingTest: ['/api/studyroom/codingtest', 'post'], // 테스트 시작
    testCode: ['/api/studyroom/codingtest/test', 'post'], // 코드 테스트
    submitCode: ['/api/studyroom/codingtest/submission', 'post'], // 코드 제출
    study: ['api/studyroom/study', 'post'], // 스터디 시작

    // codeReview: [`/api/mypage/problem/solve/${options.id}`, 'get'],
    // submitReview: [`/api/mypage/problem/solve/${options.problemId}`, 'get'], // post로 하면 405error
    // submitProblem: ['/api/mypage/problem', 'post'],
  }

  return apiObject[type]
}

export default api
