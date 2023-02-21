import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import axios from 'libs/axios'
import checkLogin from 'libs/checkLogin'
import api from 'constants/api'
import { algorithmPkNoRandom, languagePk } from 'constants/pk'
import useInterval from 'hooks/useInterval'
import Room from 'components/main/Room'
import Modal from 'components/common/Modal'
import Button from 'components/common/Button'
import Loading from 'components/common/Loading'
import CheckDropdown from 'components/common/CheckDropdown'
import RadioDropdown from 'components/common/RadioDropdown'
import CreateRoomMdContent from 'components/main/CreateRoomMdContent'

import IconButton from 'components/common/IconButton'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const searchOptions = {
  title: '방 이름',
  id: '방 번호',
}

const ROOM_PER_PAGE = 12 // 페이지 당 방의 갯수

export default function MainRooms() {
  const isLogin = checkLogin()

  const [rooms, setRooms] = useState(null)
  const [algoIds, setAlgoIds] = useState([])
  const [languageIds, setLanguageIds] = useState([])
  const [selectedOption, setSelectedOption] = useState('title')
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  // 방 갯수에 따른 Pagination
  const [currentPage, setCurrentPage] = useState(0)

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

  // 방 갯수에 따른 Page 갯수 설정 함수
  const pages = useMemo(() => {
    if (!rooms) return
    if (rooms.length % ROOM_PER_PAGE) {
      return parseInt(rooms.length / ROOM_PER_PAGE)
    } else {
      return parseInt(rooms.length / ROOM_PER_PAGE) - 1
    }
  }, [rooms])

  // 왼쪽, 오른쪽 버튼 클릭 시 방 Pagination 이동
  const previousPagination = () => {
    if (currentPage === 0) return
    setCurrentPage(currentPage - 1)
  }
  const nextPagination = () => {
    if (currentPage >= pages) return
    setCurrentPage(currentPage + 1)
  }

  // 언어 선택에 따른 languageIds 배열 변환 함수 2
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

  // 검색 옵션 변경 함수
  const changeOption = (e) => {
    setSelectedOption(e.target.id.split('-')[0])
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
              options={algorithmPkNoRandom}
              onChange={changeAlgoIds}
            />
            <InputBox>
              <RadioDropdown
                name="Search-Option"
                options={searchOptions}
                selectedKey={selectedOption}
                onChange={changeOption}
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
          <FlexBox2>
            <IconButton
              size="large"
              type="gray"
              icon={<FaAngleLeft />}
              onClick={previousPagination}
            ></IconButton>
            <GridBox>
              {rooms
                .slice(
                  currentPage * ROOM_PER_PAGE,
                  currentPage * ROOM_PER_PAGE + ROOM_PER_PAGE,
                )
                .map((room) => (
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
            <IconButton
              size="large"
              type="gray"
              icon={<FaAngleRight />}
              onClick={nextPagination}
            ></IconButton>
          </FlexBox2>
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
const FlexBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin: 2rem 0rem;
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
  gap: 2rem 3rem;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: auto;

  margin: 2rem 0rem 0rem;

  padding: 1rem 1rem;
  @media screen and (min-width: 1024px) {
    gap: 1.5rem 1rem;
  }
  @media screen and (min-width: 1300px) {
    gap: 1.5rem 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }
`
