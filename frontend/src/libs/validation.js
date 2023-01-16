const checkValidation = function (type, string) {
  const regExp = {
    // 영문으로 시작하는 영,숫자 조합 6~20
    id: /^[a-z]+[a-z0-9]{5,19}$/,
    // 영문, 숫자, 특수문자를 최소 하나씩 조합 8~16
    password:
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    // 한글 2~7자
    name: /[ㄱ-힣]{2,7}$/,
    // 한글, 영문으로 시작하는 한글, 영문, 숫자 조합 0~20
    nickname: /^[a-zA-Zㄱ-힣]+[a-zA-Zㄱ-힣0-9]{0,19}$/,
    // 이메일 체크
    email:
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  }

  return regExp[type].test(string)
}

export default checkValidation
