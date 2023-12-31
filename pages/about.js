import React from 'react'
import SeoHead from '@/components/common/SeoHead'
import { GlobalContext } from './_app'
import { useContext } from 'react'
import { useRouter } from 'next/router'
export default function About() {
  const router = useRouter()
  return (
    <>
      <SeoHead title="about" name="about" content="about desc" />
      <div className=" dark:bg-slate-800 dark:text-white">
        bt
        <button className="px-4 py-2 m-2 bg-yellow-300 rounded text-slate-50">
          bb
        </button>
        <button
          className="px-4 py-2 rounded bg-sky-300 text-slate-50"
          onClick={() => router.back()}
        >
          about
        </button>
        <button
          className="px-4 py-2 rounded bg-sky-300 text-slate-50"
          onClick={() => router.push('/userInfo')}
        >
          user
        </button>
      </div>
    </>
  )
}
