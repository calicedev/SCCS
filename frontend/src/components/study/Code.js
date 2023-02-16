import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import { languageIconPk } from 'constants/pk'
import IconButton from 'components/common/IconButton'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-clike' // 포함되어야 하단 2개 이상의 css import 시 오류발생 안함
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'

/*
prism.js 스타일이 적용된 코드 입력창 컴포넌트
왼쪽 상단에 코드에 따른 언어 아이콘이 나타난다.

value: 코드 문자열
setValue: 코드를 변화시키는 setState 함수
languageId: 언어 pk
minwidth: 컴포넌트의 최소 너비
*/

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split('\n')
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n')

export default function Code({ value, setValue, languageId, minWidth }) {
  return (
    <Container minWidth={minWidth}>
      <ButtonWrapper>
        <IconButton
          size="small"
          icon={languageIconPk[languageId]}
          disabled={true}
        />
      </ButtonWrapper>
      <StyledEditor
        value={value}
        onValueChange={(code) => setValue(code)}
        highlight={
          languageId === 1
            ? (code) => hightlightWithLineNumbers(code, languages.py)
            : (code) => hightlightWithLineNumbers(code, languages.java)
        }
        padding={10}
        textareaId="codeArea"
        className="editor"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          outline: 0,
        }}
      />
    </Container>
  )
}

Code.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  languageId: PropTypes.number.isRequired,
  minWidth: PropTypes.string,
}

Code.defaultProps = {
  value: '',
  setValue: undefined,
  minWidth: '1rem',
}

const Container = styled.div`
  overflow-y: auto;

  position: relative;

  min-width: ${({ minWidth }) => minWidth};
  width: 100%;
  height: 100%;

  padding: 1rem;

  white-space: wrap;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`

const StyledEditor = styled(Editor)`
  margin-top: 1rem;
  color: ${({ theme }) => theme.codeFontColor};

  margn &.editor {
    counter-reset: line;
    border: 1px solid #ced4da;
    height: 100%;
  }

  &.editor #codeArea {
    outline: none;
    padding-left: 60px !important;
  }

  &.editor pre {
    padding-left: 60px !important;
  }

  &.editor .editorLineNumber {
    position: absolute;
    left: 0px;
    width: 2rem;
    text-align: right;
    font-weight: 100;
  }
`
