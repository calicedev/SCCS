import Checkbox from 'components/common/Checkbox'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'libs/axios'
import api from 'constants/api'
import { useSelector } from 'react-redux'
import { algorithmPk, languagePk } from 'constants/pk'
import styled from 'styled-components'
import Button from 'components/common/Button'
import checkReg from 'libs/regExp'
import useUser from 'hooks/useUser'

/*
방 생성하는 모달의 실제 컨텐츠 컴포넌트
*/

export default function CreateRoomMdContent() {
  // 리액트 훅 관련 함수 정의
  const navigate = useNavigate()

  // 리덕스 -> 유저 id 읽기
  const id = useSelector((state) => state.user.id)

  // useState
  const [title, setTitle] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [password, setPassword] = useState('')
  const [languageIds, setLanguageIds] = useState([])
  const [algoIds, setAlgoIds] = useState([])
  const [message, setMessage] = useState({
    text: '',
    isValid: '',
  })

  // 비밀방 여부 토글 함수
  const toggleIsPrivate = () => {
    if (isPrivate) {
      setPassword('')
    }
    setIsPrivate(!isPrivate)
  }

  // 언어 체크박스 토글 함수
  const changeLanguageIds = (e) => {
    // 체크박스 옵션의 id가 10이하의 정수문자열로 시작하는 전제조건
    const id = parseInt(e.target.id.slice(0, 1))
    if (e.target.checked) {
      setLanguageIds([...languageIds, id])
      return
    }
    setLanguageIds(languageIds.filter((ele) => ele !== id))
  }

  // 알고리즘 체크박스 토글 함수. 랜덤과 그 외의 값들이 배타적이어야 한다.
  const changeAlgoIds = (e) => {
    // 체크박스 옵션의 id가 10이하의 정수문자열로 시작하는 전제조건
    const id = parseInt(e.target.id.slice(0, 1))
    // 랜덤 항목
    if (!id) {
      // 랜덤 항목을 체크한 경우
      if (e.target.checked) {
        // 랜덤 외의 다른 모든 배열을 체크해제
        const allChecks = document.querySelectorAll('#algo-options input')
        allChecks.forEach((ele, index) => {
          if (index) {
            ele.checked = false
          }
        })
        // AlgoIds에 모든 항목을 셋팅

        setAlgoIds([0])

        return
      }
      // 랜덤 항목을 해제한 경우
      setAlgoIds([])
      return
    }

    // 랜덤외의 항목
    if (e.target.checked) {
      // 랜덤 항목이 체크되어 있던 경우
      const randomCheck = document.querySelector('#algo-options input')
      if (randomCheck.checked) {
        randomCheck.checked = false
        setAlgoIds([id])
        return
      }
      // 랜덤 항목이 체크 되어 있지 않덛 경우
      setAlgoIds([...algoIds, id])
      return
    }
    // 체크 해제한 경우
    setAlgoIds(algoIds.filter((ele) => ele !== id))
  }

  // 제출 함수
  const createRoom = () => {
    // 패스워드 4자리 숫자 여부 체크
    const [isValid, msg] = checkReg('roomPassword', password)
    if (isPrivate && !isValid) {
      const newMsg = { ...message }
      newMsg.text = msg
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    // 언어 선택 조건 체크
    if (languageIds.length < 1) {
      const newMsg = { ...message }
      newMsg.text = '언어를 하나 이상 선택해주세요.'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }

    // console.log('확인로직', algoIds.length)
    // 알고리즘 선택 조건 체크
    if ((algoIds.length !== 1) & (algoIds.length !== 2)) {
      const newMsg = { ...message }
      console.log(algoIds.length)
      newMsg.text = '알고리즘은 하나 이상 두개 이하 선택가능합니다.'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    const data = {
      title,
      isPrivate,
      password,
      languageIds,
      algoIds,
      hostId: id,
    }
    const [url, method] = api('createRoom')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        // 서버로부터 받은 Room의 pk값을 path variable로 사용해서 navigate
        const studyroomId = res.data.studyroomId
        navigate(`/room/${studyroomId}/waiting`)
      })
      .catch((err) => {})
  }
  return (
    <Container>
      <H3 className="bold">방 만들기</H3>

      <Wrapper>
        <p>방 이름</p>
        <StyledInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></StyledInput>
      </Wrapper>

      <Wrapper>
        <p>비밀번호</p>
        <Checkbox
          onChange={toggleIsPrivate}
          id="isPrivate"
          label="비밀방 설정"
        />
        <StyledInput
          type="number"
          disabled={!isPrivate}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></StyledInput>
      </Wrapper>

      <Wrapper>
        <p>언어</p>
        <GridBox id="language-options">
          {Object.keys(languagePk).map((key) => (
            <Checkbox
              key={key}
              id={key + languagePk[key].toString()}
              label={languagePk[key]}
              onChange={changeLanguageIds}
            />
          ))}
        </GridBox>
      </Wrapper>

      <Wrapper>
        <p>알고리즘</p>
        <GridBox id="algo-options">
          {Object.keys(algorithmPk).map((key) => (
            <Checkbox
              key={key}
              id={key + algorithmPk[key].toString()}
              label={algorithmPk[key]}
              onChange={changeAlgoIds}
            />
          ))}
        </GridBox>
      </Wrapper>

      <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
        {message.text}
      </p>

      <ButtonWrapper>
        <Button
          type="secondary"
          value="방 만들기"
          onClick={createRoom}
        ></Button>
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const H3 = styled.h3`
  align-self: center;
`

const Wrapper = styled.div`
  margin: 0.7rem 0rem;

  & > p {
    font-weight: bold;
  }
`
const StyledInput = styled.input`
  width: 100%;

  margin: 0.5rem 0rem;
  padding: 0.5rem;

  box-shadow: 3px 3px 5px #00000050;
  border-radius: 0.5rem;
  color black;
`

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.2rem 1rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
