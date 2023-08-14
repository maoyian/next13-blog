import React from 'react'
import { forwardRef } from 'react'
import BlogItem from './BlogItem'
import Loading from '../common/Loading'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { useBlogList } from '@/hooks/useBlogList'
import { Button, Toast } from 'antd-mobile'
function BlogList(props, ref) {
  const { data, error, isLoading, mutate } = useBlogList()
  const handleAdd = async () => {
    const r = await fetcher({
      method: 'POST',
      params: {
        author: 'mm3', //作者
        headImgUrl:
          'https://oss.lixiaoxu.cn/halo2//0e1c1845b0741107bd33f52429f93f82_1.jpg', // 头像
        imgUrl: 'https://oss.lixiaoxu.cn/halo/image-1677136471067.png', // 封面
        viewCount: 0, // 观看数
        priseCount: Math.ceil(Math.random() * 100), // 点赞数
        commentCount: 1, // 评论数
        title: 'next入门',
      },
    })('/api/blogs')
    console.log('r-new :>> ', r)
    mutate() // 重新请求列表
  }
  const handleUpdate = async (id, action) => {
    await fetcher({
      method: 'PATCH',
      params: {
        id,
        action,
      },
    })(`/api/blogs/${id}`)
    mutate()
  }
  const handleDelete = async (id) => {
    console.log('id :>> ', id)

    const r = await fetcher({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })(`/api/blogs/${id}`)
    if (r.success) {
      Toast.show({
        icon: 'success',
        content: '删除成功',
      })

      mutate()
    } else {
      Toast.show({
        icon: 'fail',
        content: '删除失败',
      })
    }
    return Promise.resolve(r.success)
  }

  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading />
  if (!data) return null
  const { list: blogs } = data

  return (
    <div
      ref={ref}
      className={`blog-list px-2 dark:bg-slate-950 dark:text-white`}
    >
      <Button size="small" color="success">
        Success
      </Button>
      <button onClick={handleAdd}>add</button>
      {blogs &&
        blogs.length &&
        blogs.map((blog) => (
          <BlogItem
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            key={blog._id}
            info={blog}
          />
        ))}
      {blogs && blogs.length === 0 && 'empty'}
      {/* <BlogItem /> */}
    </div>
  )
}
export default forwardRef(BlogList)
