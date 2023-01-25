const api = function (type, options = {}) {
  const apiObject = {
    signup: ['/api/memeber', 'post'],
    getUserInfo: [`/api/member/${options.id}`, 'get'],
    updateUserInfo: ['/api/member', 'patch'],
    withdrawl: ['/api/member', 'delete'],
    login: ['api/memeber/login', 'post'],
    resetPassword: ['api/member/password', 'post'],
    updatePassword: ['api/memeber/password', 'patch'],
    logout: ['api/memeber/logout', 'get'],
    findId: ['/api/member/id', 'post'],
    checkId: [`/api/unique/id/${options.id}`, 'get'],
    checkNickname: [`/api/unique/nickname/${options.nickname}`, 'get'],
    checkEmail: [`/api/unique/email/${options.email}`, 'get'],
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
