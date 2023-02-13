import React, { useState, useMemo } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike' // 이거 없으면 자바 오류남
import 'prismjs/components/prism-python' // import 언어 모듈가서 확인 뒤 바꿔주기
import 'prismjs/components/prism-java' // 2개 import하면 오류뜸
import 'prismjs/themes/prism.css' //Example style, you can use another
import styled from 'styled-components'
import ButtonDropdown from 'components/common/ButtonDropdown'
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

  const highLightByLanguage = (code) => {
    if (languageId === 1) {
      hightlightWithLineNumbers(code, languages.py)
      return
    }
    hightlightWithLineNumbers(code, languages.java)
  }

  return (
    <Container>
      <FlexBox>
        {languageId === 1 ? <FaPython /> : <FaJava />}
        <ButtonDropdown
          title="언어선택"
          size="small"
          type="gray"
          options={languageObject}
          onClick={(e) => setLanguageId(parseInt(e.target.id.slice(0, 1)))}
        />
      </FlexBox>
      <StyledEditor
        // value = {
        //   languageId === 1
        //     ? `python`
        //     : `java`
        // }
        
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
  overflow-x: hidden;
  overflow-y: auto;

  white-space: wrap;
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.studyBgColor};
`
const FlexBox = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;

  display: flex;
  justify-content: space-between;
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
