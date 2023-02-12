import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ProfileImg from 'components/common/ProfileImg'

/*
스터디룸 채팅창에서 쓸 채팅 컴포넌트.
상대방이 보낸 메시지는 하얀색 배경으로 왼쪽에 생성.
내가 보낸 메시지는 하늘색 배경으로 오른쪽에 생성.
단, 부모 컴포넌트가 display: flex, flex-direction: column속성을 가져야한다.

nickname: 채팅을 보낸 사람의 닉네임
profileImg: 채팅을 보낸 사람의 프로필 이미지
message: 채팅 메시지
isMine: 내가 보낸 메시지인지 판별
*/

export default function ChatItem({ nickname, profileImage, message, isMine }) {
  return (
    <Container isMine={isMine}>
      <ProfileImg imgUrl={profileImage} type="chat" />
      <FlexBox>
        <p className="bold">{nickname}</p>
        <StyledDiv isMine={isMine}>{message}</StyledDiv>
      </FlexBox>
    </Container>
  )
}

ChatItem.propTypes = {
  nickname: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
}

ChatItem.defaultProps = {
  isMine: false,
}

const Container = styled.div`
  align-self: ${({ isMine }) => (isMine ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: ${({ isMine }) => (isMine ? 'row-reverse' : 'row')};
  gap: 10px;
  width: 100%;
  margin: 0.4rem 0rem;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? 'flex-start' : 'flex-end')};
  gap: 5px;
`

const StyledDiv = styled.div`
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.blackFontColor};
  background-color: ${({ isMine, theme }) =>
    isMine ? theme.lightSecondaryColor : '#FFFFFF80'};
  max-width: 20rem;
`
