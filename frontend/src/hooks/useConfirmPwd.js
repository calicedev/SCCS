import { useEffect, useState } from 'react'

/* 
비밀번화 재확인 input태그 커스텀 훅

INPUT
initialValue: state를 만들기 위한 초깃값
password: 비교할 패스워드

OUTPUT
value: state
setValue: setState
message: { text: String, isValid: Boolean }
*/

export function useConfirmPwd(initialValue, password) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [message, setMessage] = useState({ text: '', isValid: false })

  useEffect(() => {
    // 입력된 값이 없을 경우, 함수 종료
    if (!inputValue) return

    // 패스워드랑 일치하지 않을 경우
    if (password !== inputValue) {
      const newMsg = { ...message }
      newMsg.text = '비밀번호가 일치하지 않습니다.'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }

    // 패스워드랑 일치할 경우
    const newMsg = { ...message }
    newMsg.text = '확인'
    newMsg.isValid = true
    setMessage(newMsg)
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return [inputValue, setInputValue, message]
}
