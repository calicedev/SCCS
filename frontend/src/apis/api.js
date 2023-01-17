const api = function (type, options) {
  const apiObject = {
    login: '/login',
    signup: '/signup',
    check_id: `/check/id/${options.inputValue}`,
    check_nickname: `/check/nickname/${options.inputValue}`,
  }

  return apiObject[type]
}

export default api
