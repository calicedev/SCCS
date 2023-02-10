import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'components/common/Button'
import { useSelector } from 'react-redux'
import axios from 'libs/axios'
import api from 'constants/api'

export default function Footer({ startStudy }) {
  const navigate = useNavigate()
  // const id = useSelector((state) => state.user.id)

  // const [memeberId, setMemberId] = useState('')
  // const [studyroomId, setStudyroomId] = useState('')
  // const [problemId, setProblemId] = useState('')
  // const [languageId, setlanguageId] = useState('')

  // const submit = () => {
  //   const data ={
  //     memeberId,
  //     studyroomId,
  //     problemId,
  //     languageId,
  //   }
  //   const [url, method] = api('submitCode')
  //   const config = { url, method, data }
  //   axios(config)
  //     .then((res) => {
  //       console.log(res)
  //       navigate('/')
  //     })
  // }

  const testCode = useCallback(() => {
    // let fileName = 'formFile.txt';
    const content = document.querySelector('textarea').value
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    const formData = new FormData()
    formData.append('formFile', file)
    formData.append('memberId', 'mint_angel')
    formData.append('studyroomId', 30)
    formData.append('problemId', 1)
    formData.append('languageId', 2)

    const headers = { 'Content-Type': 'multipart/form-data' }
    const [url, method] = api('testCode')
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        // navigate('/')
      })
      .catch((err) => {})
    // element.href = URL.createObjectURL(file);
    // // element.download = fileName;
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click()
  }, [])

  const submitCode = useCallback(() => {
    // let fileName = 'formFile.txt';
    const content = document.querySelector('textarea').value
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    const formData = new FormData()
    formData.append('formFile', file)
    formData.append('memberId', 'mint_angel')
    formData.append('studyroomId', 30)
    formData.append('problemId', 1)
    formData.append('languageId', 2)

    const headers = { 'Content-Type': 'multipart/form-data' }
    const [url, method] = api('submitCode')
    const config = { url, method, data: formData, headers }
    axios(config)
      .then((res) => {
        // navigate('/')
      })
      .catch((err) => {})
    // element.href = URL.createObjectURL(file);
    // // element.download = fileName;
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click()
  }, [])

  return (
    <Foot>
      <EndBtn>
        <Button
          value="시험 종료"
          type="danger"
          size="small"
          onClick={startStudy}
        ></Button>
      </EndBtn>
      <CompileBtn>
        <Button
          value="테스트"
          type="gray"
          size="small"
          margin-right="5px"
          onClick={() => {
            testCode('')
          }}
        ></Button>
        <Space></Space>
        <Button
          value="제출"
          size="small"
          onClick={() => {
            submitCode('')
          }}
        ></Button>
      </CompileBtn>
    </Foot>
  )
}

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0rem 0rem;
  padding: 0rem 1rem;
`

const EndBtn = styled.div`
  display: flex;
`

const CompileBtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1rem;
`
const Space = styled.div`
  width: 1.5rem;
  height: auto;
  display: inline-block;
`
