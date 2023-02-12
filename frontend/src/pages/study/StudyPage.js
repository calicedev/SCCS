import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import axios from 'libs/axios'
import api from 'constants/api'

import styled from 'styled-components'
import Chat from 'components/study/Chat'

import Drawing from 'components/study/Drawing'
import { algorithmPk, languagePk } from 'constants/pk'

export default function StudyPage({}) {
  const {
    user,
    studyroomId,
    roomInfo,
    stomp,
    connected,
    members,
    setMembers,
    problems,
    setProblems,
    message,
    setMessage,
    chatList,
    sendChat,
    disconnect,
  } = useOutletContext()

  const [subscription, setSubscription] = useState(null)
  const [presenter, setPresenter] = useState(roomInfo.hostId)

  // 코딩테스트 결과 요청
  useEffect(() => {
    const problemIds = problems.map((problem) => problem.id)
    const data = {
      id: studyroomId,
      problemIds: problemIds,
    }
    const [url, method] = api('study')
    const config = { url, method, data }
    axios(config)
      .then((res) => {})
      .catch((err) => {})
  }, [])

  // 웹 소켓 send: 발표자 변경 (study 페이지)
  const changePresenter = (nickname) => {
    if (roomInfo.id !== user.id) return
    stomp.send(
      '/pub/studyroom',
      {},
      JSON.stringify({
        studyroomId: studyroomId,
        status: 'present',
        presenter: nickname,
      }),
    )
  }

  // 웹 소켓 subscribe
  useEffect(() => {
    setSubscription(
      stomp.subscribe('/sub/studyroom/' + studyroomId, (chatDto) => {
        const content = JSON.parse(chatDto.body)
        if (content.status === 'present') {
          setPresenter(content.presenter)
        }
      }),
    )
    return () => {
      subscription && subscription.unsubscribe()
    }
  }, [])

  return (
    <FlexBox2>
      <Drawing />
      <Chat
        chatList={chatList}
        message={message}
        onChangeMsg={(e) => setMessage(e.target.value)}
        sendChat={sendChat}
        user={user}
      />
    </FlexBox2>
  )
}

const FlexBox2 = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`
