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
import CreateModalContent from 'components/main/CreateModalContent'

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

  // 전체 방 조회
  useEffect(() => {
    const [url, method] = api('searchRoom')
    const config = { url, method }
    axios(config)
      .then((res) => {
        console.log(res)
        setRooms(res.data)
      })
      .catch((err) => {
        alert(
          '원하는 조건의 방이 없습니다. 님 뭔가 잘못된거임 ㅋㅋㅋㅋㅋㅋㅋㅋ 고생해라',
        )
        console.log(err)
      })
  }, [])

  // 옵션변화로 인한 방 세부 조회
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
        alert(
          '원하는 조건의 방이 없습니다. 님 뭔가 잘못된거임 ㅋㅋㅋㅋㅋㅋㅋㅋ 고생해라',
        )
        console.log(err)
      })
  }, [algoIds, languageIds])

  // 검색버튼
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
        alert(
          '원하는 조건의 방이 없습니다. 님 뭔가 잘못된거임 ㅋㅋㅋㅋㅋㅋㅋㅋ 고생해라',
        )
        console.log(err)
      })
  }

  // changeHandler
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
    console.log(id)
    if (e.target.checked) {
      setAlgoIds([...algoIds, id])
      return
    }
    setAlgoIds(algoIds.filter((ele) => ele !== id))
  }

  return (
    <>
      {showModal && (
        <Modal
          close={() => setShowModal(false)}
          content={<CreateModalContent />}
        ></Modal>
      )}
      <FlexBox>
        <SearchContainer>
          <CheckDropdown
            title="언어선택"
            options={languagePk}
            onChange={changeLanguageIds}
          />
          <CheckDropdown
            title="알고리즘선택"
            options={algorithmPk}
            onChange={changeAlgoIds}
          />
          <InputBox>
            <RadioDropdown
              selectedId={selectedOption}
              name="검색옵션"
              options={searchOptions}
              onChange={(e) => setSelectedOption(e.target.id)}
            />
            <Input
              type={selectedOption === 'title' ? 'text' : 'number'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></Input>
          </InputBox>
          <Button onClick={searchRoom} value="검색"></Button>
        </SearchContainer>
        <Button
          type="secondary"
          onClick={() => setShowModal(!showModal)}
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
            // 방 클릭시 해당 대기방으로 이동 (2.4 민혁 추가)
          />
        ))}
      </GridBox>
    </>
  )
}

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`
const SearchContainer = styled.div`
  display: flex;
  align-items: stretch;
`
const InputBox = styled.div`
  display: flex;
  align-items: center;

  border: none;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 7px #000000a0;

  background-color: white;
`

const Input = styled.input`
  border: none;
  border-radius: 0.5rem;
  color: black;
`

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 1rem;

  margin: 2rem 2rem;
`
