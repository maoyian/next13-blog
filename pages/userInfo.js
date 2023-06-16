import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
const fetcher = (config) => (url) =>
  fetch(url, config).then((res) => res.json())
export default function UserInfo() {
  const params = { a: 1, b: 3 }
  const { data, error, isValidating } = useSWR(
    `/api/user`,
    fetcher({ method: 'PUT', body: JSON.stringify({ nickName: 8 }) })
  )
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <ul>
      {Object.keys(data).map((k) => (
        <li key={k}>{data[k]}</li>
      ))}
    </ul>
  )
}
