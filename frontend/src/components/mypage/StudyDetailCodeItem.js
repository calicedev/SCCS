import React from 'react'
import { useState } from 'react'
import StudyDetailCodeModal from './StudyDetailCodeModal'

export default function StudyDetailCodeItem({ code, idx }) {
  const [modal, setModal] = useState(true)
  return (
    <div
      onClick={() => {
        setModal(!modal)
      }}
    >
      <span>
        {idx + 1} {code.member_id} :
      </span>
      <span> {code.runtime} </span>
      <span> {code.memory} </span>
      {modal ? <StudyDetailCodeModal code={code} /> : null}
    </div>
  )
}
