/*
AuthInput 커스텀 훅에서 사용하는 정규식 검사 라이브러리

INPUT
type: 검사할 정규식 타입
string: 검사할 값

OUTPUT
result: 통과 여부 (Boolean)
errMsg: 정규식 상세설명
*/

export default function regExp(type, string) {
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
      reg: /^[a-zA-Zㄱ-힣]+[a-zA-Zㄱ-힣0-9]{1,7}$/,
      msg: '한/영, 숫자 조합 1~7자로 입력해주세요',
      // msg: '한글, 영문으로 시작하는 한글, 영문, 숫자 조합 1~7자로 입력해주세요',
    },
    email: {
      reg: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
      msg: '이메일 형식으로 입력해주세요',
    },
    roomPassword: {
      reg: /^[0-9]{4}$/,
      msg: '4자리 숫자로 입력해주세요',
    },
  }

  const reg = regObj[type].reg
  const result = reg.test(string)
  const errMsg = regObj[type].msg

  return [result, errMsg]
}
