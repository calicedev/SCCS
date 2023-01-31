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

export default function CreateModalContent() {
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

  const toggleIsPrivate = () => {
    if (isPrivate) {
      setPassword('')
    }
    setIsPrivate(!isPrivate)
  }
  const createRoom = () => {
    const [isValid, msg] = checkReg('roomPassword', password)
    if (isPrivate && !isValid) {
      const newMsg = { ...message }
      newMsg.text = msg
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    if (languageIds.length < 1) {
      const newMsg = { ...message }
      newMsg.text = '언어를 하나 이상 선택해주세요.'
      newMsg.isValid = false
      setMessage(newMsg)
      return
    }
    if (algoIds.length > 2 || algoIds.length < 1) {
      const newMsg = { ...message }
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
      memberId: id,
    }
    const [url, method] = api('createRoom')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        console.log(res)
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const changeLanguageIds = (e) => {
    const id = parseInt(e.target.id.slice(0, 1))
    if (e.target.checked) {
      setLanguageIds([...languageIds, id])
      return
    }
    setLanguageIds(languageIds.filter((ele) => ele !== id))
  }

  const changeAlgoIds = (e) => {
    const id = parseInt(e.target.id.slice(0, 1))
    if (e.target.checked) {
      setAlgoIds([...algoIds, id])
      return
    }
    setAlgoIds(algoIds.filter((ele) => ele !== id))
  }

  return (
    <Container>
      <H3 className="bold">방 만들기</H3>
      <InputBox>
        <Label>방 이름</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      </InputBox>
      <InputBox>
        <Label>비밀번호</Label>
        <Checkbox
          onChange={toggleIsPrivate}
          id="isPrivate"
          label="비밀방 설정"
        />
        <Input
          type="number"
          disabled={!isPrivate}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </InputBox>
      <InputBox>
        <Label>언어</Label>
        <Grid>
          {Object.keys(languagePk).map((key) => (
            <Checkbox
              key={key}
              id={key + languagePk[key].toString()}
              label={languagePk[key]}
              onChange={changeLanguageIds}
            />
          ))}
        </Grid>
      </InputBox>
      <InputBox>
        <Label>알고리즘</Label>
        <Grid>
          {Object.keys(algorithmPk).map((key) => (
            <Checkbox
              key={key}
              id={key + algorithmPk[key].toString()}
              label={algorithmPk[key]}
              onChange={changeAlgoIds}
            />
          ))}
        </Grid>
      </InputBox>
      <p className={`c ${message.isValid ? 'pass' : 'error'}`}>
        {message.text}
      </p>
      <Button type="secondary" value="방 만들기" onClick={createRoom}></Button>
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

const InputBox = styled.div`
  margin: 0.7rem 0rem;
`
const Input = styled.input`
  width: 100%;
  height: 1.7rem;

  box-shadow: 5px 5px 10px #00000050;
  border-radius: 0.5rem;
  color black;
`

const Label = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.2rem 1rem;
`
