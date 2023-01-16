const api = function (type, ...options) {
  const apiObject = {
    login: '/login',
    checkId: `/check/id/${options.id}`,
    checkNickname: `/check/nickname/${options.nickname}`,
  }

  return apiObject[type]
}

export default api
