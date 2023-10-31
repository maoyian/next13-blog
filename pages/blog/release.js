import React, { useState } from 'react'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { Button, Input, Toast } from 'antd-mobile'
import CodeEditor from '@/components/CodeEditor'
export default function Release() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [codeValue, setCodeValue] = useState('')
  const doRelease = async () => {
    console.log('title :>> ', title)
    console.log('content :>> ', content)
    console.log('codeValue :>> ', codeValue)
    setLoading(true)
    const { success } = await fetcher({
      method: 'POST',
      params: {
        title,
        content,
        codeValue,
      },
    })('/api/blogs')
    if (success) {
      Toast.show({
        icon: 'success',
        content: '添加成功',
      })
      setTitle('')
      setContent('')
      setLoading(false)
    }
  }
  return (
    <div>
      <h1 className="text-center">博客发布</h1>
      <Input
        placeholder="请输入标题"
        value={title}
        onChange={(val) => {
          setTitle(val)
        }}
      />
      <Input
        placeholder="请输入内容"
        value={content}
        onChange={(val) => {
          setContent(val)
        }}
      />
      <CodeEditor codeValue={codeValue} onCodeChange={(e) => setCodeValue(e)} />
      <Button loading={loading} onClick={doRelease} color="success">
        发布
      </Button>
    </div>
  )
}
