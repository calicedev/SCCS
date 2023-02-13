import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
// import Prism from 'prismjs';
import { highlight, languages } from 'prismjs/components/prism-core'
// import loadLanguages from 'prismjs/components/'

import 'prismjs/components/prism-clike' // 이거 없으면 자바 오류남
import 'prismjs/components/prism-python' // import 언어 모듈가서 확인 뒤 바꿔주기
import 'prismjs/components/prism-java' // 2개 import하면 오류뜸
import 'prismjs/themes/prism.css' //Example style, you can use another
import styled from 'styled-components'

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split('\n')
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join('\n')


const javaCode = `class Solution {
  public static void main(String[] args) {
    System.out.println("hello world");
  }
}
`

export default function Textarea(props) {
  // loadLanguages(['pythnm', 'java']);

  // // The code snippet you want to highlight, as a string
  // const code = `= ['hi', 'there', 'reader!'].join " "`;

  // // Returns a highlighted HTML string
  // const html = Prism.highlight(code, Prism.languages.py, 'python');

  
  console.log("javaCode", javaCode);

  const [codeValue, setCodeValue] = useState(props.lanuagePk)

  return (
    <StyledEditor
      value={codeValue}
      onValueChange={(code) => setCodeValue(code)}
      // highlight={(code) => hightlightWithLineNumbers(code, languages.py)} //languages 확장자 바꾸면 해당 언어로 바뀜
      highlight={(code) => hightlightWithLineNumbers(code, languages.java)} //languages 확장자 바꾸면 해당 언어로 바뀜
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        outline: 0,
      }}
    />
  )
}

const StyledEditor = styled(Editor)`
  &.editor {
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
    color: #d7ecff;
    text-align: right;
    width: 40px;
    font-weight: 100;
  }
`
