import React from 'react'
import { forwardRef, useContext, useState } from 'react'
import BlogItem from './BlogItem'
import Loading from '../common/Loading'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { useBlogList } from '@/hooks/useBlogList'
import { Button, Toast } from 'antd-mobile'
import { GlobalContext } from '@/pages/_app'

function BlogList(props, ref) {
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
    if (r.success) {
      Toast.show({
        icon: 'success',
        content: '添加成功',
      })
      mutate() // 重新请求列表
    }
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

  const {
    scroll: { scrollPercent },
  } = useContext(GlobalContext)
  const [nextLading, setNextLoading] = useState(false)
  const [filter, setFilter] = useState({
    sortBy: 'createTime',
    order: 'asc',
    per_page: 8,
    page: 1, // 37 82
    author: 'mm3',
  })

  const { data, error, isLoading, mutate, setSize, size } = useBlogList(filter)
  // const issues = data ? [].concat(...data) : [];
  // const isLoadingMore =
  //   isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  // const isEmpty = data?.[0]?.list?.length === 0
  // const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 4)
  console.log('data :>> ', data)
  if (scrollPercent === 100) {
    console.log('size :>> ', size)
    // if (!isLoadingMore && !isReachingEnd) setSize(size + 1)
    // console.log('jia :>> ', isLoading)
    // setNextLoading(true)
    // setFilter((old) => {
    //   return {
    //     ...old,
    //     page: old.page + 1,
    //   }
    // })
  }

  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading />
  if (!data)
    return (
      <div
        onClick={() => {
          console.log(22)
          setSize(1)
        }}
      >
        load
      </div>
    )
  const { list: blogs } = data[0]

  return (
    <div
      ref={ref}
      className={`blog-list px-2 dark:bg-slate-950 dark:text-white`}
    >
      <Button onClick={handleAdd} size="small" color="success">
        add
      </Button>
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
