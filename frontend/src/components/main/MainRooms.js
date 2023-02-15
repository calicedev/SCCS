import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'libs/axios'
import checkLogin from 'libs/checkLogin'
import api from 'constants/api'
import { algorithmPk, languagePk } from 'constants/pk'
import useInterval from 'hooks/useInterval'
import Room from 'components/main/Room'
import Modal from 'components/common/Modal'
import Button from 'components/common/Button'
import Loading from 'components/common/Loading'
import CheckDropdown from 'components/common/CheckDropdown'
import RadioDropdown from 'components/common/RadioDropdown'
import CreateRoomMdContent from 'components/main/CreateRoomMdContent'

const searchOptions = {
  title: '방 이름',
  id: '방 번호',
}

export default function MainRooms() {
  const isLogin = checkLogin()

  const [rooms, setRooms] = useState(null)
  const [algoIds, setAlgoIds] = useState([])
  const [languageIds, setLanguageIds] = useState([])
  const [selectedOption, setSelectedOption] = useState('title')
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  // 컴포넌트 생성 시 방 검색 api 요청
  useEffect(() => {
    const [url, method] = api('searchRoom')
    const config = { url, method }
    axios(config)
      .then((res) => {
        setRooms(res.data)
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data.message)
        }
        setRooms([])
      })
  }, [])

  // 언어 선택에 따른 languageIds 배열 변환 함수
  const changeLanguageIds = (e) => {
    const languageId = parseInt(e.target.id.split('-')[0])
    if (e.target.checked) {
      setLanguageIds([...languageIds, languageId])
      return
    }
    setLanguageIds(languageIds.filter((id) => id !== languageId))
  }

  // 알고리즘 선택에 다른 algoIds 배열 변환 함수
  const changeAlgoIds = (e) => {
    const algoId = parseInt(e.target.id.split('-')[0])
    if (e.target.checked) {
      setAlgoIds([...algoIds, algoId])
      return
    }
    setAlgoIds(algoIds.filter((id) => id !== algoId))
  }

  // 방생성 버튼 클릭 시
  const createRoom = () => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.')
      return
    }
    setShowModal(true)
  }

  // 방 세부 검색 api 요청
  const searchRoomDetail = () => {
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
        setRooms(res.data)
      })
      .catch((err) => {
        setRooms([])
      })
  }

  // 옵션변화가 일어날 때마다 방 세부 검색 api 요청
  useEffect(() => {
    searchRoomDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoIds, languageIds])

  // useInterval로 10초마다 방 세부 검색 자동 api 요청
  useInterval(searchRoomDetail, 10000)

  return (
    <>
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
              onChange={changeLanguageIds}
            />
            <CheckDropdown
              title="알고리즘 선택"
              options={algorithmPk}
              onChange={changeAlgoIds}
            />
            <InputBox>
              <RadioDropdown
                selectedId={selectedOption}
                name="검색 옵션"
                options={searchOptions}
                selectedKey="title"
                onChange={(e) => setSelectedOption(e.target.id)}
              />
              <StyledInput
                type={selectedOption === 'title' ? 'text' : 'number'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></StyledInput>
            </InputBox>
            <Button onClick={searchRoomDetail} value="검색"></Button>
          </SearchContainer>
          <Button
            type="secondary"
            onClick={createRoom}
            value="방 만들기"
          ></Button>
        </FlexBox>
        {rooms ? (
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
        ) : (
          <Loading height="30rem" />
        )}
      </Container>
    </>
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  width: 100%;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
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
  box-shadow: 3px 3px 7px #00000050;

  background-color: white;
`
const StyledInput = styled.input`
  border: none;
  border-radius: 0.5rem;
  color: black;
`
const GridBox = styled.div`
  display: grid;
  gap: 1rem 3rem;
  overflow-y: auto;

  height: 32rem;

  margin: 2rem 0rem 0rem;
  padding: 0.2rem 1rem 0rem;

  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 1024px) {
    gap: 1rem 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
`
