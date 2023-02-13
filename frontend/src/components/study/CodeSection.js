import React, { useState, useMemo } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike' // 이거 없으면 자바 오류남
import 'prismjs/components/prism-python' // import 언어 모듈가서 확인 뒤 바꿔주기
import 'prismjs/components/prism-java' // 2개 import하면 오류뜸
import 'prismjs/themes/prism.css' //Example style, you can use another
import styled from 'styled-components'
import OutlineButtonDropdown from 'components/common/OutlineButtonDropdown'
import { languagePk } from 'constants/pk'
import { FaPython, FaJava } from 'react-icons/fa'

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split('\n')
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n')

export default function CodeSection({
  value,
  setValue,
  languageIds,
  languageId,
  setLanguageId,
}) {
  const languageObject = useMemo(() => {
    const tempObject = {}
    languageIds.forEach((languageId) => {
      tempObject[languageId] = languagePk[languageId]
    })
    return tempObject
  }, [languageIds])

  return (
    <Container>
      <FlexBox>
        {languageId === 1 ? <FaPython /> : <FaJava />}
        <OutlineButtonDropdown
          title="언어선택"
          size="small"
          type="secondary"
          options={languageObject}
          onClick={(e) => setLanguageId(parseInt(e.target.id.slice(0, 1)))}
        />
      </FlexBox>
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

const Container = styled.div`
  height: 100%;
  position: relative;

  overflow-y: auto;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};

  white-space: wrap;
`
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem 0rem 1.2rem;

  justify-content: space-between;
`
const StyledEditor = styled(Editor)`
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
