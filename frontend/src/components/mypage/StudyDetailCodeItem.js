import React from 'react'
import { useState } from 'react'
import StudyDetailCodeModal from './StudyDetailCodeModal'

export default function StudyDetailCodeItem({ code, idx }) {
  const [modal, setModal] = useState(false)
  return (
    <>
      <div
        onClick={() => {
          setModal(!modal)
        }}
      >
        <span>
          {idx + 1}. {code.submissionMemberId} :
        </span>
        <span> 실행시간 : {code.submissionRuntime}ms </span>
        <span> 메모리 : {code.submissionMemory}KB </span>
        {modal ? <StudyDetailCodeModal code={code} /> : null}
      </div>
    </>
  )
}
