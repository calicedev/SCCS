import checkReg from 'libs/regExp'
import { useEffect, useState } from 'react'
import axios from 'libs/axios'
import api from 'constants/api'
import useDebounce from 'hooks/useDebounce'

/* 
사용자 인증 input태그 관련 커스텀 훅

INPUT
type: id, name, nickname, email, password로 분류
initialValue: state를 만들기 위한 초깃값
checkValid: 정규식 유효성 체크 여부 (libs/regExp 참고), 기본값 False
serverValid: 서버 데이터베이스 중복 체크여부 (libs/aixos 참고), 기본값 False

OUTPUT
value: state
setValue: setState
message: { text: String, isValid: Boolean }
*/

// type에 해당하는 한글 정보
const typeToKorean = {
  id: '아이디',
  name: '이름',
  nickname: '닉네임',
  email: '이메일',
  password: '비밀번호',
}

export function useAuthInput(
  type,
  initialValue = '',
  checkValid = false,
  checkServer = false,
) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [message, setMessage] = useState({ text: '', isValid: false })

  // useDebounce 훅을 사용하여 서버요청 최소화
  const debouncedInputValue = useDebounce(inputValue, 300)

  // debouncedInputValue에 의존적인 useEffect
  useEffect(() => {
    // 입력값이 없을 경우, 함수 종료
    if (!inputValue) {
      return
    }

    // 정규식 검사 안 할 경우, 함수 종료
    if (!checkValid) return

    // 정규식 검사
    const [isValid, msg] = checkReg(type, inputValue)

    // 정규식 검사 통과 못했을 경우
    if (!isValid) {
      const newMsg = { ...message }
      newMsg.text = msg
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }

    // 정규식 검사 통과한 경우
    const newMsg = { ...message }
    newMsg.text = `유효한 ${typeToKorean[type]} 입니다`
    newMsg.isValid = true
    setMessage(newMsg)

    // 서버 중복 검사 안 할 경우, 함수 종료
    if (!checkServer) {
      return
    }

    // 서버 중복 검사
    const options = {}
    options[type] = inputValue // 동적 key 할당
    const [url, method] = api(`check_${type}`, options)
    const config = { method }
    axios
      .request(url, config)
      .then((res) => {
        // 서버 중복 검사 통과 못했을 경우
        if (!res.data.unique) {
          const newMsg = { ...message }
          newMsg.text = `이미 사용된 ${type} 입니다.`
          newMsg.isValid = false
          setMessage(newMsg)
          return
        }
        // 서버 중복 검사 통과했을 경우
        const newMsg = { ...message }
        newMsg.text = `유효한 ${typeToKorean[type]} 입니다`
        newMsg.isValid = true
        setMessage(newMsg)
      })
      .catch((err) => {
        // 서버 중복 검사 통과한 경우
        const newMsg = { ...message }
        newMsg.text = '서버의 정보를 받아오지 못했습니다.'
        newMsg.isValid = false
        setMessage(newMsg)
        return
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue])

  return [inputValue, setInputValue, message]
}
