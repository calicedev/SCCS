

import React, {useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from './../../../node_modules/prismjs/components/prism-core';
import './../../../node_modules/prismjs/components/prism-python'; // import 언어 모듈가서 확인 뒤 바꿔주기
import './../../../node_modules/prismjs/themes/prism.css'; //Example style, you can use another
import styled from 'styled-components'

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");

export default function Textarea() {
  const [codeValue, setCodeValue] = useState('');

  return (
    <StyledEditor
      value={codeValue}
      onValueChange={code => setCodeValue(code)}
      highlight={code => hightlightWithLineNumbers(code, languages.py)} //languages 확장자 바꾸면 해당 언어로 바뀜
      padding={10}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 14,
        outline: 0
      }}
    />
  );
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
  color: #cccccc;
  text-align: right;
  width: 40px;
  font-weight: 100;
}

`