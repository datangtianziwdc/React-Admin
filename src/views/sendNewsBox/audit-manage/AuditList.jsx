import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, message, Modal } from 'antd'
import { auditMap, getUserInfo } from '../../../utils/common'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './AuditList.scss'
export default function AuditList() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const { username } = getUserInfo()
  const [dataSource, setDataSource] = useState([])
  const getData = () => {
    axios
      .get(
        `/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`
      )
      .then((res) => {
        console.log('res', res.data)
        setDataSource(res.data)
      })
  }
  const updateHandle = (item) => {
    navigate(`/news-manage/update/${item.id}`)
  }
  const publishHandle = (item)=>{
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定发布？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios
            .patch(`/news/${item.id}`, {
              publishState: 2,
              publishTime:Date.now()
            })
            .then((res) => {
              messageApi.open({
                type: 'success',
                content: '发布成功',
              })
              getData()
            })
        } catch (error) {
          console.log('error', error)
        }
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }
  const revokeHandle = (item) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定撤销审核？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios
            .patch(`/news/${item.id}`, {
              auditState: 0,
            })
            .then((res) => {
              messageApi.open({
                type: 'success',
                content: '撤销成功',
              })
              getData()
            })
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
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        return auditMap[auditState]
      },
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <>
            {item.auditState === 1 && (
              <Button
                type="primary"
                size="small"
                danger
                onClick={() => revokeHandle(item)}
              >
                撤销
              </Button>
            )}
            {item.auditState === 2 && (
              <Button type="primary" size="small"
              onClick={() => publishHandle(item)}
              >
                发布
              </Button>
            )}
            {item.auditState === 3 && (
              <Button
                type="primary"
                size="small"
                className="updateBtn"
                onClick={() => updateHandle(item)}
              >
                更新
              </Button>
            )}
          </>
        )
      },
    },
  ]
  useEffect(() => {
    getData()
  }, [])
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
