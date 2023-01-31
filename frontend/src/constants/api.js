const api = function (type, options = {}) {
  const apiObject = {
    signup: ['/api/member', 'post'],
    getUserInfo: [`/api/member/${options.id}`, 'get'],
    updateUserInfo: ['/api/member', 'patch'],
    withdrawl: ['/api/member', 'delete'],
    login: ['api/member/login', 'post'],
    resetPassword: ['api/member/password', 'post'],
    updatePassword: ['api/member/password', 'patch'],
    logout: ['api/member/logout', 'get'],
    findId: ['/api/member/id', 'post'],
    check_id: [`/api/unique/id/${options.id}`, 'get'],
    check_nickname: [`/api/unique/nickname/${options.nickname}`, 'get'],
    check_email: [`/api/unique/email/${options.email}`, 'get'],
    accessToken: [`/api/member/accesstoken`, 'get'],
    createRoom: ['/api/studyroom', 'post'],
    searchRoom: ['/api/studyroom', 'get'],
    searchRoomDetail: ['/api/studyroom/detail', 'post'],
    checkRoomPassword: ['/api/studyroom/password', 'post'],
    studyHistory: [
      `/api/mypage/history/${options.id}/${options.year}/${options.month}`,
      'get',
    ],
    studyHistoryDetail: [`/api/mypage/history/${options.id}`, 'get'],
    submitProblem: ['/api/mypage/problem', 'post'],
    solvedProblem: [`/api/mypage/problem/${options.id}`, 'get'],
  }

  return apiObject[type]
}

export default api
