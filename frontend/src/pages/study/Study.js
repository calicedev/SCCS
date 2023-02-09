import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'

import Drawing from 'components/study/Drawing'
import { algorithmPk, languagePk } from 'constants/pk'

export default function Study({
  roomInfo,
  studyroomId,
  personnel,
  dataForStudy,
}) {
  useEffect(() => {
    const data = {
      id: studyroomId,
      problemIds: dataForStudy,
    }
    const [url, method] = api('study')
    const config = { url, method, data }
    console.log('스터디 페이지 입장할 때 back으로 보내는 정보!', data)
    axios(config)
      .then((res) => {
        console.log('스터디페이지 데이터', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <TopNavBar>
        <Btn>{roomInfo.title}</Btn>
        <Btn>{languagePk[roomInfo.languageIds[0]]}</Btn>
        {roomInfo.algoIds.map((algoId, idx) => {
          return <Btn key={idx}>#{algorithmPk[algoId]}</Btn>
        })}
        {['1번', '2번'].map((problem, idx) => {
          return <Btn key={idx}>{problem}</Btn>
        })}
        <span> 현재 {personnel}명</span>
      </TopNavBar>
      <Drawing></Drawing>
    </>
  )
}

const TopNavBar = styled.div`
  background: grey;
`
const Btn = styled.button`
  font-size: 2.5rem;
  color: white;
  background-color: skyblue;
  round: 1;
  border: solid 2px grey;
  border-radius: 12px;
  padding: 5px;
`
