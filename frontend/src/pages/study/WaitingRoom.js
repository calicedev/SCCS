import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'

export default function WaitingRoom() {
  // 해당 페이지에 들어오자마자 axios 요청 보내서 방 정보를 얻어와서 화면에 뿌려주기
  const { studyroomId } = useParams()
  const [roomInfo, setRoomInfo] = useState({})

  useEffect(() => {
    const [url, method] = api('enterRoom', { studyroomId })
    const config = { url, method }
    axios
      .request(config)
      .then((res) => {
        console.log(res.data)
        setRoomInfo(res.data)
      })
      .catch((err) => {
        alert('대기방 정보를 불러오지 못했습니다.')
      })
  }, [])

  return (
    <>
      <h1>{studyroomId}번 대기방</h1>
      <h3>{roomInfo.title}</h3>
    </>
  )
}
