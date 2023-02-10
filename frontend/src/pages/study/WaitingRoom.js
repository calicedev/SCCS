import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

import { algorithmPk, languagePk } from 'constants/pk'

export default function WaitingRoom({
  // 기본정보
  studyroomId,
  roomInfo,
  personnel,
  nickname,
  id,
  // exit 기능
  disconnect,
  // 채팅 기능
  submitMsg,
  changeMsg,
  chat,
  chatList,
  chatNickname,
  // 레디 기능
  ready,
  readyOrNot,
  readyArray,
  // 시작 기능
  startCodingTest,
}) {
  const navigate = useNavigate()
  return (
    <>
      <TopNavBar>
        <Btn>
          {studyroomId}번방 {roomInfo.title}
        </Btn>
        {roomInfo.languageIds.map((languageId) => {
          return <Btn>{languagePk[languageId]}</Btn>
        })}

        {roomInfo.algoIds.map((algoId) => {
          return <Btn>#{algorithmPk[algoId]}</Btn>
        })}

        <span>현재 {personnel}명</span>
      </TopNavBar>

      <h3>방장 아이디: {roomInfo.hostId}</h3>
      <h4>현재 로그인된 내 아이디: {id}</h4>
      <h4>현재 로그인된 내 닉네임: {nickname}</h4>

      <Btn
        onClick={function () {
          disconnect()
          navigate('/')
        }}
      >
        EXIT
      </Btn>

      <form onSubmit={submitMsg}>
        <MyInput
          type="text"
          placeholder="채팅 메시지를 입력하세요."
          value={chat}
          onChange={changeMsg}
        />
        <br />
        <MySubmit type="submit" value="Send" />
      </form>
      <ul>
        {chatList.map((chat, idx) => {
          return (
            <div key={idx}>
              {chatNickname[idx]} : {chat}
            </div>
          )
        })}
      </ul>

      {id === roomInfo.hostId ? (
        <div>
          {personnel === readyArray.length + 1 ? (
            <Btn onClick={startCodingTest}>Start</Btn>
          ) : (
            <h1>
              아직 모든 참여자가 레디 버튼을 누르지 않아 코딩 테스트를 시작할 수
              없습니다.
            </h1>
          )}
        </div>
      ) : (
        <h3>
          {readyOrNot ? (
            <Btn onClick={ready}>READY 취소</Btn>
          ) : (
            <Btn onClick={ready}>READY</Btn>
          )}
        </h3>
      )}
    </>
  )
}

const Btn = styled.button`
  font-size: 2.5rem;
  color: white;
  background-color: skyblue;
  round: 1;
  border: solid 2px grey;
  border-radius: 12px;
  padding: 5px;
`

const MyInput = styled.textarea`
  width: 35rem;
  height: 7rem;
  border: black 1px solid;
`

const MySubmit = styled.input`
  width: 5rem;
  height: 3rem;
  background-color: pink;
`

const H = styled.hr`
  background: indigo;
  height: 1px;
`

const TopNavBar = styled.div`
  background: grey;
`
