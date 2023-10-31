import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useBlogItem } from '@/hooks/useBlogItem'
import { Button } from 'antd-mobile'
const Detail = () => {
  const router = useRouter()
  console.log('router.query :>> ', router.query)
  const { _id } = router.query
  const { data, isLoading, error, mutate } = useBlogItem(_id)
  console.log('data :>> ', data)
  const info = data && data.blog
  console.log('info :>> ', info)
  if (info) {
    return (
      <>
        <div>标题: {info.title}</div>
        <div>内容: {info.content}</div>
        <div>作者: {info.author}</div>
        <div>代码: {info.codeValue}</div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex justify-center h-full align-middle">
          <Button className="w-full" loading>
            Loading
          </Button>
        </div>
      </>
    )
  }
}

export default Detail
