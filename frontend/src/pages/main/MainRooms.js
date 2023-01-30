import React, { useEffect, useState } from 'react'
import Button from 'components/common/Button'
import axios from 'libs/axios'
import api from 'constants/api'
import Room from 'components/main/Room'
import Dropdown from 'components/common/Dropdown'
import { algorithmPk, languagePk } from 'constants/pk'
import styled from 'styled-components'

const ex_rooms = [
  {
    id: 1,
    title: '커피내기',
    isSolving: true,
    isPrivate: true,
    algoIds: [1],
    languageIds: [1, 2],
  },
  {
    id: 2,
    title: '커피내기2',
    isSolving: false,
    isPrivate: false,
    algoIds: [1, 3],
    languageIds: [2],
  },
]

const queryOptions = {
  '제목으로 검색': true,
  '번호로 검색': false,
}

export default function MainRooms() {
  const [rooms, setRooms] = useState(ex_rooms)
  const [algoIds, setAlgoIds] = useState([])
  const [languageIds, setLanguageIds] = useState([])
  const [isTitle, setIsTitle] = useState(true)
  const [query, setQuery] = useState('')

  // 전체 방 조회
  useEffect(() => {
    const [url, method] = api('searchRoom')
    const config = { url, method }
    axios(config)
      .then((res) => {
        setRooms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // 옵션변화로 인한 방 세부 조회
  useEffect(() => {
    const data = {
      algoIds,
      languageIds,
      title: '',
      id: 0,
    }
    const [url, method] = api('searchRoomDetail')
    const config = { url, method, data }
    console.log(data)
    axios(config)
      .then((res) => {
        console.log(res)
        setRooms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [algoIds, languageIds])

  // 검색버튼
  const searchRoom = () => {
    let data = {}
    if (isTitle) {
      data = {
        algoIds,
        languageIds,
        title: query,
        id: 0,
      }
    } else {
      data = {
        algoIds,
        languageIds,
        title: '',
        id: query,
      }
    }
    const [url, method] = api('searchRoomDetail')
    const config = { url, method, data }
    console.log(data)
    axios(config)
      .then((res) => {
        console.log(res)
        setRooms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // changeHandler
  const changeAlgoIds = (e) => {
    console.log(e.target.checked)
    const id = e.target.id
    if (e.target.checked) {
      setAlgoIds(...algoIds, id)
      return
    }
    setAlgoIds(algoIds.filter((id) => id !== id))
  }

  const changeLanguageIds = (e) => {
    console.log(e.target.checked)
    const id = e.target.id
    if (e.target.checked) {
      setLanguageIds(...languageIds, id)
      return
    }
    setLanguageIds(languageIds.filter((id) => id !== id))
  }

  return (
    <div>
      <FlexBox>
        <Dropdown
          title="언어선택"
          options={languagePk}
          onChange={changeLanguageIds}
        />
        <Dropdown
          title="알고리즘선택"
          options={algorithmPk}
          onChange={changeAlgoIds}
        />
        <Dropdown
          title="검색옵션"
          options={queryOptions}
          onChange={(e) => setIsTitle(e.target.id)}
        />
      </FlexBox>
      <FlexBox>
        <input
          type={isTitle ? 'text' : 'number'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <Button onClick={searchRoom} value="상세조회"></Button>
      </FlexBox>
      <div>
        {rooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            title={room.title}
            isSolving={room.isSolving}
            isPrivate={room.isPrivate}
            algoIds={room.algoIds}
            languageIds={room.languageIds}
          />
        ))}
      </div>
    </div>
  )
}

const FlexBox = styled.div`
  display: flex;
`

// const data = {
//   algoIds: [1, 2, 3, 4, 5, 6, 7],
//   languageIds: [1, 2],
//   title: '코테',
//   id: 0,
// }
// const data = {
//   algoIds: [1, 2, 3, 4, 5, 6, 7],
//   languageIds: [1, 2],
//   title: '',
//   id: 2,
// }
// const data = {
//   algoIds: [1, 2, 3],
//   languageIds: [1],
//   title: '',
//   id: 0,
// }
