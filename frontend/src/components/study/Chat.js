import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/common/Button'
import ChatItem from 'components/study/ChatItem'

export default function Chat({
  chatList,
  message,
  onChangeMsg,
  sendChat,
  nickname,
}) {
  return (
    <Container>
      <Header>채팅방</Header>
      <ChatContainer>
        {chatList.map((chatItem, index) => (
          <ChatItem
            key={`${index}-${chatItem.nickname}`}
            nickname={chatItem.nickname}
            profileImage={chatItem.profileImage}
            message={chatItem.message}
            isMine={chatItem.nickname === nickname ? true : false}
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

Chat.propTypes = {
  chatList: PropTypes.array.isRequired,
  message: PropTypes.string,
  onChangeMsg: PropTypes.func,
  sendChat: PropTypes.func,
  nickname: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
}

Chat.defaultProps = {
  message: '',
  onChangeMsg: undefined,
  sendChat: undefined,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 100%;
  max-width: 30%;
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

  height: 5rem;
  padding: 1rem;

  color: ${({ theme }) => theme.blackFontColor};
  background-color: ${({ theme }) => theme.whiteColor};
`
