import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'

import sockjs from 'sockjs-client'
import stompjs from 'stompjs'

export default function WaitingRoom({
  studyroomId,
  roomInfo,
  personnel,
  nickname,
  id,
  disconnect,
  submitMsg,
  changeMsg,
  chat,
  chatList,
  chatNickname,
  ready,
  readyOrNot,
  readyArray,
  startCodingTest,
}) {
  const navigate = useNavigate()
  return (
    <>
      <h1>여기는 그냥 대기방</h1>
      <h2>{studyroomId}번 대기방입니다.</h2>
      <h2>방제목 {roomInfo.title}</h2>
      <h3>방장 아이디: {roomInfo.hostId}</h3>
      <h3>현재인원: {personnel}</h3>

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
          placeholder="좋은 말로 할 때 메시지 입력해라 ㅡ.ㅡ"
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
            <Btn>Start</Btn>
          ) : (
            <h1>아직 전부 다 레디 안했음. 너넨 그냥 공부하지마라</h1>
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
