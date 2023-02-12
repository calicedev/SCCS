import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { FaPython, FaJava } from 'react-icons/fa'
import Modal from 'components/common/Modal'
import IconButton from 'components/common/IconButton'
import { useMemo } from 'react'
/*
코드 제출 내역 정보를 받아 "유저아이디, 언어, 메모리 시간, 런타임, 결과"를 테이블 형식으로 출력
클릭 시에는 모달창으로 코드를 보여주는 컴포넌트

id: 해당 제출 내역의 pk
memberId: 유저 아이디
languageId: 언어 pk
memory: 사용 메모리
runtime: 실행 시간
result: 통과여부
fileUrl: 문제코드 url
*/

export default function StudyDetailCodeItem({
  id,
  memberId,
  languageId,
  memory,
  runtime,
  result,
  fileUrl,
}) {
  const [showModal, setShowModal] = useState(false)
  const [code, setCode] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fileUrl)
        .then((res) => {
          console.log('res', res)
          return res.text()
        })
        .then((code) => {
          console.log('code', code)
          setCode(code)
        })
    }
    fetchData()
  }, [])

  return (
    <>
      {showModal ? (
        <Modal close={() => setShowModal(false)} content={code} />
      ) : null}

      <>
        <FlexBox
          onClick={() => {
            setShowModal(true)
          }}
        >
          <FlexEle flex={1}>{memberId}</FlexEle>
          <FlexEle flex={1}>
            <IconButton
              icon={languageId === 1 ? <FaPython /> : <FaJava />}
              disabled={true}
            />
          </FlexEle>
          <FlexEle flex={1}>{runtime}ms</FlexEle>
          <FlexEle flex={1}>{memory}kb</FlexEle>
          <FlexEle flex={1} className={result === 'true' ? 'pass' : 'error'}>
            {result}
          </FlexEle>
        </FlexBox>
      </>
    </>
  )
}

StudyDetailCodeItem.propTypes = {
  id: PropTypes.number.isRequired,
  memberId: PropTypes.string.isRequired,
  languageId: PropTypes.number.isRequired,
  memory: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
}

const FlexBox = styled.div`
  display: flex;

  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0rem;

  font-weight: 500;
  font-size: 1rem;

  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 1.05;
    background-color: #7ab6ec24;
  }
`

const FlexEle = styled.div`
  flex: ${({ flex }) => flex};

  text-align: center;
  white-space: nowrap;
`
