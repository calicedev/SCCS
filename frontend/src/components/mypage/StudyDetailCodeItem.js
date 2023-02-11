import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
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

  // 이 부분을 완성해야함!
  // 1. url로 요청을 보내서 file 을 가져옴 (txt 파일을 저장해야함.)
  // 2. .java파일을 .txt파일로 변환
  // 3. .txt 파일에서 string을 추출
  const code = useMemo(async () => {
    const reader = new FileReader() // 파일을 읽을 수 있는 객체 형성 (blob형태만 읽을 수 있음 - 아마 binary 데이터를 말할 것임)
    console.log(fileUrl)
    const response = await fetch({
      url: fileUrl,
      mode: 'no-cors',
    })
    console.log(response)
    const blob = await response.blob()
    console.log(blob)

    reader.onload = function () {
      // 이벤트 리스너처럼 리더가 읽으면 콘솔로그가 실행
      // text 파일에서 string으로 추출하는 것
      console.log(reader.result)
    }
    reader.readAsText(blob, /* optional */ 'euc-kr') // blob형태의 파일을 넣어주겠따.
  }, [fileUrl])

  return (
    <>
      {showModal ? (
        <Modal close={() => setShowModal(false)} content={code} />
      ) : null}
      {/* {showModal ? <div></div> : null} */}
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
