import React from 'react'
import { forwardRef, useContext, useState } from 'react'
import BlogItem from './BlogItem'
import Loading from '../common/Loading'
import { fetcher } from '@/configs/fetcher'
import { setQuery } from '@/utils/params'
import { useBlogList } from '@/hooks/useBlogList'
import { Button, Toast, InfiniteScroll, Footer } from 'antd-mobile'
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

  const [filter, setFilter] = useState({
    sortBy: 'createTime',
    order: 'asc',
    per_page: 10,
    page: 1,
    author: 'mm3',
  })

  const { data, error, isLoading, isValidating, mutate, setSize, size } =
    useBlogList(filter)
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.list?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[size - 1]?.list?.length < filter.per_page)
  const handleLoadMore = () => {
    console.log(isLoadingMore, isReachingEnd, isLoading, isValidating)
    if (!isLoadingMore && !isReachingEnd) {
      setSize(size + 1)
    }
  }
  if (error) return <div>Failed to load</div>
  if (isLoading) return <Loading />

  // 组装分页数据
  const blogs = (data ? [].concat(...data) : []).reduce(
    (pre, cur) => pre.concat(cur.list),
    []
  )

  return (
    <div
      ref={ref}
      className={`blog-list px-2 dark:bg-slate-950 dark:text-white`}
    >
      {/* <Button onClick={handleAdd} size="small" color="success">
        add
      </Button> */}

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
      {/* <Button
        className="w-full"
        disabled={isLoadingMore || isReachingEnd}
        onClick={handleLoadMore}
      >
        {isLoadingMore ? '加载中' : isReachingEnd ? '没有咯' : '查看更多'}
      </Button> */}
      <InfiniteScroll loadMore={handleLoadMore} hasMore={!isReachingEnd} />

      {blogs && blogs.length === 0 && 'empty'}
      <Footer content="@ 2004-2020 Alipay.com All rights reserved"></Footer>
    </div>
  )
}
export default forwardRef(BlogList)
