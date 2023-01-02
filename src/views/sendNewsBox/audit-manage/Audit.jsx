import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button, message, Modal, Space } from 'antd'
import { auditMap, getUserInfo } from '../../../utils/common'
import { useNavigate } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './Audit.scss'
export default function Audit() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const { roleId, region, username } = getUserInfo()
  const [dataSource, setDataSource] = useState([])
  const getData = () => {
    axios.get(`/news?auditState=1&_expand=category`).then((res) => {
      console.log('res', region,roleId,res.data.filter(
        (e) => e.region === region && e.roleId > roleId
      ))
      const list = res.data
      setDataSource(
        roleId === 1
          ? list
          : [
              ...list.filter((e) => e.author === username),
              ...list.filter(
                (e) => e.region === region && e.roleId > roleId
              ),
            ]
      )
    })
  }
  const adoptHandle = (item,auditState,publishState) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `确定${auditState===2?'通过':'驳回'}审核？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios
            .patch(`/news/${item.id}`, {
              auditState,
              publishState
            })
            .then((res) => {
              messageApi.open({
                type: 'success',
                content: `已${auditState===2?'通过':'驳回'}`,
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
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => adoptHandle(item,2,1)}
            >
              通过
            </Button>
            <Button
              danger
              type="primary"
              size="small"
              onClick={() => adoptHandle(item,3,0)}
            >
              驳回
            </Button>
          </Space>
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
