import React, { useState } from 'react'
import Image from 'next/image'
export default function BlogItem(props) {
  const { info, onUpdate, onDelete } = props
  // const info = {
  //   imgUrl: 'https://oss.lixiaoxu.cn/halo/image-1677136471067.png',
  //   title: 'next入门到放弃',
  //   author: 'mmmmmmmmmmmmmm',
  //   headImg:
  //     'https://oss.lixiaoxu.cn/halo2//0e1c1845b0741107bd33f52429f93f82_1.jpg',
  //   priseCount: 99,
  // }
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const handleVote = (id) => {
    onUpdate(id, { filed: 'priseCount', value: 1 })
  }
  const handleComment = () => {
    console.log('comment')
  }

  return (
    <div
      onClick={(e) => {
        if (loading) return
        onDelete(info._id).then((r) => {
          if (!r) {
            setLoading(false)
          }
        })
        setLoading(true)
      }}
      className={`${
        loading ? 'opacity-50' : ''
      } flex justify-between p-2 mb-2 bg-white rounded dark:bg-slate-700`}
    >
      {/* 图片 */}
      <div className="w-44">
        <Image src={info.imgUrl} width={1000} height={1000} alt="img" />
      </div>
      {/* 内容 */}
      <div className="flex flex-col flex-1 pl-2">
        <div className="flex-1 line-clamp-3 i5:line-clamp-1">{info.title}</div>
        <div className="flex justify-between">
          <div className="flex justify-between flex-1">
            {/* 头像+名字 */}
            <div className="flex items-center flex-1 font-light text-s">
              <div className="w-6 mr-1 overflow-hidden rounded-full">
                <Image
                  src={info.headImgUrl}
                  width={100}
                  height={100}
                  alt="img"
                />
              </div>
              <div className="flex-1 truncate i5:max-w-[5rem] ix:max-w-[6rem] iPlus:max-w-[8rem] sm:max-w-xs">
                {info.author}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {/* 看过 */}
            <div className="cursor-pointer i5:hidden iPad:block">
              <i className="iconfont">&#xe600;</i> {info.viewCount}
            </div>
            {/* 评论 */}
            <div
              onClick={handleComment}
              className="cursor-pointer i5:hidden iPad:block"
            >
              <i className="iconfont">&#xe7f5;</i> {info.commentCount}
            </div>
            {/* 点赞 */}
            <div
              className={`${clicked ? 'pulse' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setClicked(true)
                setTimeout(() => setClicked(false), 1000)
                handleVote(info._id)
              }}
            >
              <i className="cursor-pointer iconfont">&#xe651;</i>{' '}
              {info.priseCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
