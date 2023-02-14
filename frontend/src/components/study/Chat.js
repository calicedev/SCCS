import Button from 'components/common/Button'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ChatItem from 'components/study/ChatItem'

export default function WaitingPage({
  chatList,
  message,
  onChangeMsg,
  sendChat,
  user,
}) {
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

  return (
    <Container>
      <Header>채팅방</Header>
      <ChatContainer windowHeight={windowHeight}>
        {chatList.map((chatItem, index) => (
          <ChatItem
            key={`${index}-${chatItem.nickname}`}
            nickname={chatItem.nickname}
            profileImage={chatItem.profileImage}
            message={chatItem.message}
            isMine={chatItem.nickname === user.nickname ? true : false}
          />
        ))}
      </ChatContainer>
      <StyledDiv>
        <StyledInput
          value={message}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              sendChat()
            }
          }}
          onChange={onChangeMsg}
          placeholder="메시지를 입력하세요"
        />
        <Button type="primary" size="small" value="전송" onClick={sendChat} />
      </StyledDiv>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 100%;
  min-width: 20rem;
  height: 100%;

  border-radius: 0.5rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.chatBgColor};
`
const Header = styled.div`
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.chatTabColor};
`

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  width: 100%;
  max-height: ${({ windowHeight }) => `calc(${windowHeight}px - 500px)`};
  padding: 1rem;
`
const StyledDiv = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;

  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.chatTabColor};
`
const StyledInput = styled.textarea`
  flex: 1;

  height: 7rem;
  padding: 1rem;

  color: ${({ theme }) => theme.blackFontColor};
  background-color: ${({ theme }) => theme.whiteColor};
`
