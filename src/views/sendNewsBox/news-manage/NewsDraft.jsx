import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, message, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { getUserInfo } from '../../../utils/common'
import { useNavigate } from 'react-router-dom'
export default function NewsDraft() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  const { username } = getUserInfo()
  const getData = async () => {
    const { data } = await axios.get(
      `/news?author=${username}&auditState=${0}&_expand=category`
    )
    setDataSource(data)
  }
  const editHandle = (item) => {
    navigate(`/news-manage/update/${item.id}`)
  }
  const submitHandle = (item) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定提交审核？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await axios.patch(`/news/${item.id}`, {
            auditState: 1,
          })
          messageApi.open({
            type: 'success',
            content: `提交成功`,
          })
          getData()
        } catch (error) {
          console.log('error', error)
        }
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }
  useEffect(() => {
    getData()
  }, [username])
  const confirm = (item) => {
    console.log('item', item)
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该新闻？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 如果是一级权限
          await axios.delete(`/news/${item.id}`)
          getData()
        } catch (error) {
          console.log('error', error)
        }
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      render: (id) => {
        return <b>{id}</b>
      },
    },
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
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => submitHandle(item)}
            >
              提交审核
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => editHandle(item)}
            >
              编辑
            </Button>
            <Button
              danger
              type="primary"
              size="small"
              onClick={() => confirm(item)}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <>
      {contextHolder}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      />
    </>
  )
}
