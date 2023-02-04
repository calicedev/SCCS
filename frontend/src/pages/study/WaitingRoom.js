import React from 'react'
import { useParams } from 'react-router-dom'

export default function WaitingRoom() {
  const { id } = useParams()

  // 해당 페이지에 들어오자마자 axios 요청 보내서 방 정보를 얻어와서 화면에 뿌려주기
  return (
    <>
      <h1>{id}번 대기방</h1>
    </>
  )
}
