import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Switch, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { getUserInfo } from '../../../utils/common'
export default function NewsDraft() {
  const [dataSource, setDataSource] = useState([])
  const { username } = getUserInfo()
  const getData = async () => {
    const { data } = await axios.get(
      `/news?author=${username}&auditState=${0}&_expand=category`
    )
    setDataSource(data)
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
  const changeHandle = async (item) => {
    // 如果是一级权限
    if (item.grade === 1) {
      await axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson === 1 ? 0 : 1,
      })
    } else {
      await axios.patch(`/children/${item.id}`, {
        pagepermisson: item.pagepermisson === 1 ? 0 : 1,
      })
    }
    getData()
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
            <Switch
              checked={
                item.pagepermisson === 1 || item.pagepermisson === undefined
              }
              disabled={item.pagepermisson === undefined}
              checkedChildren="启用"
              unCheckedChildren="禁用"
              onChange={() => {
                changeHandle(item)
              }}
            />
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
  return <Table dataSource={dataSource} columns={columns} rowKey={item=>item.id}/>
}
