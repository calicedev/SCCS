import React from 'react'
import StudyDetailCodeItem from './StudyDetailCodeItem'

export default function StudyDetailCodeList({
  study,
  problemId,
  setProblemId,
}) {
  return (
    <div>
      <h1> 참가자 코드 보기</h1>
      {study.studyroomId && (
        <div>
          {study.studyroomWithProblems[problemId].ParticipantWithCode.map(
            (code, idx) => {
              return (
                <div>
                  <StudyDetailCodeItem code={code} idx={idx} key={idx} />
                </div>
              )
            },
          )}
        </div>
      )}
    </div>
  )
}
