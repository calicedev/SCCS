import { useState, useEffect } from 'react'

/*
useDebounce Hook
상대적으로 빠르게 변하는 input 데이터에 대해서, 상대적으로 느리게 업데이트 되는 output 데이터를 반환

value: 업데이트 지연을 주고 싶은 값
delay: 업데이트를 지연시키고자 하는 시간
*/
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}
