import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import StudyDetailCodeItem from './StudyDetailCodeItem'

export default function StudyDetailCodeList({ codeList }) {
  return (
    <div>
      <h3> 참가자 코드 보기</h3>
      {codeList.map((code) => (
        <StudyDetailCodeItem
          key={code.submissionId}
          id={code.submissionId}
          memberId={code.submissionMemberId}
          memory={code.submissionMemory}
          runtime={code.submissionRuntime}
          result={code.submissionResult}
        />
      ))}
    </div>
  )
}

StudyDetailCodeList.propTypes = {
  codeList: PropTypes.array.isRequired,
}
