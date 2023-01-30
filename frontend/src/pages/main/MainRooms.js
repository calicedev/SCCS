import React, { useEffect, useState } from 'react'
import Button from 'components/common/Button'
import axios from 'libs/axios'
import api from 'constants/api'
import Room from 'components/main/Room'

export default function MainRooms() {
  const [rooms, setRooms] = useState([
    {
      id: '1',
      title: '커피내기',
      isSolving: true,
      isPrivate: true,
      algoIds: [1],
      languageIds: [1, 2],
    },
  ])

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

  // 방 세부 조회
  const searchRoom = () => {
    const data = {
      algoIds: [1, 2, 3, 4, 5, 6, 7],
      languageIds: [1, 2],
      title: '코테',
      id: 0,
    }
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
    const [url, method] = api('searchRoomDetail')
    const config = { url, method, data }
    axios(config)
      .then((res) => {
        setRooms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Button onClick={searchRoom} value="상세조회"></Button>
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
