import React, { useEffect, useState } from 'react'
import Button from 'components/common/Button'
import axios from 'libs/axios'
import api from 'constants/api'
import Room from 'components/main/Room'
import CheckDropdown from 'components/common/CheckDropdown'
import RadioDropdown from 'components/common/RadioDropdown'
import { algorithmPk, languagePk } from 'constants/pk'
import styled from 'styled-components'
import Modal from 'components/common/Modal'
import CreateRoomMdContent from 'components/main/CreateRoomMdContent'

const searchOptions = {
  title: '방 이름',
  id: '방 번호',
}

export default function MainRooms() {
  const [rooms, setRooms] = useState([])
  const [algoIds, setAlgoIds] = useState([])
  const [languageIds, setLanguageIds] = useState([])
  const [selectedOption, setSelectedOption] = useState('title')
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  // 마운트 시 방 전체조회
  useEffect(() => {
    const [url, method] = api('searchRoom')
    const config = { url, method }
    axios(config)
      .then((res) => {
        console.log(res)
        setRooms(res.data)
      })
      .catch((err) => {
        alert('서버와의 통신이 불안정합니다.')
        console.log(err)
      })
  }, [])

  // 언어 선택에 다른 languageIds 배열 변환 함수
  const changeLanguageIds = (e) => {
    const id = parseInt(e.target.id.slice(0, 1))
    if (e.target.checked) {
      setLanguageIds([...languageIds, id])
      return
    }
    setLanguageIds(languageIds.filter((ele) => ele !== id))
  }

  // 알고리즘 선택에 다른 algoIds 배열 변환 함수
  const changeAlgoIds = (e) => {
    const id = parseInt(e.target.id.slice(0, 1))
    console.log(id)
    if (e.target.checked) {
      setAlgoIds([...algoIds, id])
      return
    }
    setAlgoIds(algoIds.filter((ele) => ele !== id))
  }

  // 옵션변화로 인한 방 세부 조회 요청
  useEffect(() => {
    let data = {}
    if (selectedOption === 'title') {
      data = {
        algoIds,
        languageIds,
        title: query,
        id: 0,
      }
    }
    if (selectedOption === 'id') {
      data = {
        algoIds,
        languageIds,
        title: '',
        id: parseInt(query),
      }
    }
    const [url, method] = api('searchRoomDetail')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        console.log(res)
        setRooms(res.data)
      })
      .catch((err) => {
        alert('서버와의 통신이 불안정합니다.')
        console.log(err)
      })
  }, [algoIds, languageIds])

  // 검색버튼을 눌렀을 때 방 세부 조회
  const searchRoom = () => {
    let data = {}
    if (selectedOption === 'title') {
      data = {
        algoIds,
        languageIds,
        title: query,
        id: 0,
      }
    }
    if (selectedOption === 'id') {
      data = {
        algoIds,
        languageIds,
        title: '',
        id: parseInt(query),
      }
    }
    const [url, method] = api('searchRoomDetail')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        console.log(res)
        setRooms(res.data)
      })
      .catch((err) => {
        alert('서버와의 연결이 불안정합니다.')
        console.log(err)
      })
  }

  return (
    <Container>
      {showModal && (
        <Modal
          close={() => setShowModal(false)}
          content={<CreateRoomMdContent />}
        ></Modal>
      )}
      <FlexBox>
        <SearchContainer>
          <CheckDropdown
            title="언어 선택"
            options={languagePk}
            handleChange={changeLanguageIds}
          />
          <CheckDropdown
            title="알고리즘 선택"
            options={algorithmPk}
            handleChange={changeAlgoIds}
          />
          <InputBox>
            <RadioDropdown
              selectedId={selectedOption}
              name="검색 옵션"
              options={searchOptions}
              selectedKey="title"
              handleChange={(e) => setSelectedOption(e.target.id)}
            />
            <StyledInput
              type={selectedOption === 'title' ? 'text' : 'number'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></StyledInput>
          </InputBox>
          <Button handleClick={searchRoom} value="검색"></Button>
        </SearchContainer>
        <Button
          type="secondary"
          handleClick={() => setShowModal(!showModal)}
          value="방 만들기"
        ></Button>
      </FlexBox>
      <GridBox>
        {rooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            title={room.title}
            isSolving={room.isSolving}
            isPrivate={room.isPrivate}
            algoIds={room.algoIds}
            languageIds={room.languageIds}
            personnel={room.personnel}
          />
        ))}
      </GridBox>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3rem 1rem;

  @media screen and (min-width: 1024px) {
    padding: 3rem 3rem;
  }
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  width: 100%;
`

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;

  width: 70%;
  min-width: 40rem;
`
const InputBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  border: none;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 7px #000000a0;

  background-color: white;
`
const StyledInput = styled.input`
  border: none;
  border-radius: 0.5rem;
  color: black;
`
const GridBox = styled.div`
  display: grid;
  gap: 1rem 1rem;
  overflow-y: auto;

  height: 32rem;

  padding: 0.2rem 1rem 0rem;
  margin: 2rem 0rem 0rem;

  grid-template-columns: repeat(2, 1fr);
  @media screen and (min-width: 1024px) {
    gap: 1rem 2rem;
    grid-template-columns: repeat(3, 1fr);
  }
`
