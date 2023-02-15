import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TestButtons from 'components/study/TestButtons'

/*
Dropbox 우측의 아래 버튼 아이콘 클릭 시, 체크박스 옵션들이 보여지는 컴포넌트

results: 결과 배열
        {
          isAnswer: Boolean,
          avgRuntime: Number,
          avgMemory: Number,
          resultList: [
            {
              result: Boolean,
              message: String,
              memory: Number,
              runtime: Number,
            }
          ]
        }
isFinished: 종료 여부를 나타내는 Bool. FInish 버튼의 텍스트를 결정
finish: 종료 버튼 클릭 시 동작하는 함수
test: 테스트 버튼 클릭 시 동작하는 함수
submit: 제출 버튼 클릭 시 동작하는 함수
*/

export default function ResultSection({
  results,
  isFinished,
  finish,
  test,
  submit,
  onSubmitButton,
  onTestButton,
}) {
  return (
    <Container>
      <ResultsWrapper>
        <H4>결과창</H4>
        {results && (
          <>
            {onSubmitButton && null}
            {onTestButton &&
              results.resultList.slice(0, 3).map((problem, index) => (
                <p
                  className={problem.result ? 'c pass' : 'c error'}
                  key={`${index}-problem-result`}
                >
                  {index + 1}번{') '} {problem.message} : {problem.memory}MB
                  {' / '}
                  {problem.runtime}s
                </p>
              ))}

            {/*  */}
            {results.isAnswer ? (
              <p className="pass ">
                <br />
                통과했습니다.
                <br /> 런타임 평균: {results.avgRuntime}s 메모리 평균:
                {results.avgMemory}MB
              </p>
            ) : (
              <>
                <p className="error c">
                  <br />
                  틀렸습니다.
                  <br /> 런타임 평균: {results.avgRuntime}s 메모리 평균:
                  {results.avgMemory}MB
                </p>
              </>
            )}
          </>
        )}
      </ResultsWrapper>
      <TestButtons
        isFinished={isFinished}
        finish={finish}
        test={test}
        submit={submit}
      />
    </Container>
  )
}

ResultSection.propTypes = {
  results: PropTypes.array,
  isFinished: PropTypes.bool,
  finish: PropTypes.func,
  test: PropTypes.func,
  submit: PropTypes.func,
}

ResultSection.defaultProps = {
  results: [],
  isFinished: false,
  finish: undefined,
  test: undefined,
  submit: undefined,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`
const ResultsWrapper = styled.div`
  border-radius: 0.5rem;

  overflow: hidden;

  padding: 0.5rem;
  margin: 1rem;
  background-color: ${({ theme }) => theme.deepStudyBgColor};
`
const H4 = styled.h4`
  text-align: center;
  font-weight: bold;
`
