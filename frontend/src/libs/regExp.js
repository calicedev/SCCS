const regExp = function (type, string) {
  const regObj = {
    id: {
      reg: /^[a-z]+[a-z0-9]{5,19}$/,
      msg: '영문으로 시작하는 영,숫자 조합 6~20으로 입력해주세요',
    },
    password: {
      reg: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
      msg: '영문, 숫자, 특수문자를 최소 하나씩 조합 8~16으로 입력해주세요',
    },
    name: {
      reg: /[ㄱ-힣]{2,7}$/,
      msg: '한글 2~7자로 입력해주세요',
    },
    nickname: {
      reg: /^[a-zA-Zㄱ-힣]+[a-zA-Zㄱ-힣0-9]{0,19}$/,
      msg: '한글, 영문으로 시작하는 한글, 영문, 숫자 조합 0~20자로 입력해주세요',
    },
    email: {
      reg: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
      msg: '이메일 형식으로 입력해주세요',
    },
  }

  const reg = regObj[type].reg
  const msg = regObj[type].msg

  return [reg.test(string), msg]
}

export default regExp
