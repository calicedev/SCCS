import checkReg from 'libs/regExp'
import { useEffect, useState } from 'react'
import axios from 'libs/axios'
import api from 'apis/api'

const typeToKorean = {
  id: '아이디',
  name: '이름',
  nickname: '닉네임',
  email: '이메일',
  password: '비밀번호',
}

/* 

 사용자 인증관련 input 커스텀 훅
 input: (type지정, 초깃값, 정규식체크여부, 서버중복체크여부)
 output: [value, setValue, message{text: String , isValid: Bool}]
 
*/
export function useAuthInput(
  type,
  initialValue,
  checkValid = false,
  checkServer = false,
) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [message, setMessage] = useState({ text: '', isValid: false })

  useEffect(() => {
    // 입력값이 있을 때만 실행
    if (!inputValue) {
      return
    }

    // 정규식 검사 안 할 경우, 함수 종료
    if (!checkValid) return

    // 정규식 검사
    const [isValid, msg] = checkReg(type, inputValue)

    if (!isValid) {
      const newMsg = { ...message }
      newMsg.text = msg
      newMsg.isValid = isValid
      setMessage(newMsg)
      return
    }

    // 서버 검사 안 할 경우, 유효 표시 후 함수 종료d
    if (!checkServer) {
      const newMsg = { ...message }
      newMsg.text = `유효한 ${typeToKorean[type]} 입니다`
      newMsg.isValid = true
      setMessage(newMsg)
      return
    }

    const options = {}
    options[type] = inputValue
    const [url, method] = api(`check_${type}`, options)
    const config = { method }
    // 서버 검사
    axios
      .request(url, config)
      .then((res) => {
        if (!res.data.unique) {
          const newMsg = { ...message }
          newMsg.text = `이미 사용된 ${type} 입니다.`
          newMsg.isValid = false
          setMessage(newMsg)
          return
        }
        const newMsg = { ...message }
        newMsg.text = `유효한 ${typeToKorean[type]} 입니다`
        newMsg.isValid = true
        setMessage(newMsg)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [inputValue])

  return [inputValue, setInputValue, message]
}
