import React, { useState } from 'react'
import CodeEditor from '@/components/CodeEditor'
const Editor = () => {
  const onCodeChange = (code) => {
    console.log('code: ', code)
    setCode(code)
  }
  const [code, setCode] = useState('ha')
  return (
    <div>
      代码块:
      <CodeEditor code={code} onCodeChange={onCodeChange} />
    </div>
  )
}

export default Editor
