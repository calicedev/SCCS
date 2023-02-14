import { useEffect, useState } from 'react'

/* 
브라우저의 리사이징을 감지하여 window.innerHeight를 반환하는 Hook
*/

export function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const updateMaxHeight = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', updateMaxHeight)
    updateMaxHeight()

    return () => {
      window.removeEventListener('resize', updateMaxHeight)
    }
  }, [])

  return windowHeight
}
