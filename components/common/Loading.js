import React from 'react'
import { Button } from 'antd-mobile'
export default function Loading() {
  return (
    <div className="flex justify-center h-full align-middle">
      <Button className="w-full" loading>
        Loading
      </Button>
    </div>
  )
}
