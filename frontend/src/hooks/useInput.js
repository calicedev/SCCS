import checkValidation from 'libs/validation'
import { useEffect, useState } from 'react'

export function useInput(type, initialValue, additionalFunc) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [message, setMessage] = useState({ text: '', isValid: false })

  useEffect(() => {
    if (!checkValidation(type, inputValue)) {
      const newMessage = { ...message }
      newMessage.text = '영,숫자 조합 6~20자'
      newMessage.isValid = false
      setMessage(newMessage)
      return
    }
    if (additionalFunc) {
      additionalFunc(inputValue)
      return
    }
    const newMessage = { ...message }
    newMessage.text = `유효한 ${type} 입니다`
    newMessage.isValid = true
    setMessage(newMessage)
    return
  }, [inputValue])

  return [inputValue, setInputValue, message]
}
