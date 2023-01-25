import { useEffect, useState } from 'react'

export function useConfirmPwd(initialValue, password) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [message, setMessage] = useState({ text: '', isValid: false })

  useEffect(() => {
    // 패스워드랑 비교 감사
    if (!inputValue) return
    if (password !== inputValue) {
      const newMsg = { ...message }
      newMsg.text = '비밀번호가 일치하지 않습니다.'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }

    const newMsg = { ...message }
    newMsg.text = '확인'
    newMsg.isValid = true
    setMessage(newMsg)
    return
  }, [inputValue])

  return [inputValue, setInputValue, message]
}
