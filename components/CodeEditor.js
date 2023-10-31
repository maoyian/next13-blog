import React, { useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
/**
 *
 * onCodeChange、 codeValue
 *
 */
export default function CodeEditor(props) {
  const { onCodeChange, codeValue } = props
  const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val)
    onCodeChange(val)
  }, [])
  return (
    <CodeMirror
      value={codeValue}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  )
}
