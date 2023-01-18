const api = function (type, options = {}) {
  const apiObject = {
    login: '/login',
    signup: '/signup',
    check_id: `/check/id/${options.id}`,
    check_nickname: `/check/nickname/${options.nickname}`,
  }

  return apiObject[type]
}

export default api
