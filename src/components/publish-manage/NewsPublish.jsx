import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
export default function NewsPublish(props) {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    setDataSource(props.dataSource)
  }, [props.dataSource])
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      width: 450,
      ellipsis: true,
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return category.label
      },
    },
    {
      title: '操作',
      render: (item) => {
        return props.button(item)
      },
    },
  ]
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(item) => item.id}
    />
  )
}
