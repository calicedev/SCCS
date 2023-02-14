import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import { languagePk, languageIconPk } from 'constants/pk'
import IconButton from 'components/common/IconButton'
import OutlineButtonDropdown from 'components/common/OutlineButtonDropdown'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-clike' // 포함되어야 하단 2개 이상의 css import 시 오류발생 안함
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'

/*
prism.js 스타일이 적용된 코드 입력창 컴포넌트.
오른쪽 상단에 코드에 따른 언어 아이콘이 나타난다.
왼쪽 상단에 적용시킬 언어를 바꿀 수 있는 ButtonDropdown.

value: 코드 문자열
setValue: 코드를 변화시키는 setState 함수
languageId: 언어 pk
languageIds: 고를 수 있는 언어 pk 배열
setLanguageId: 적용시킬 언어 pk를 변경시닐 setState 함수
*/

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
        <IconButton
          size="small"
          icon={languageIconPk[languageId]}
          disabled={true}
        />
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

CodeSection.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  languageId: PropTypes.number.isRequired,
  setLanguageId: PropTypes.func,
  languageIds: PropTypes.array,
}

CodeSection.defaultProps = {
  value: '',
  setValue: undefined,
  setLanguageId: undefined,
  languageIds: [],
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
