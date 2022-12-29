import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal, Switch, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  const getData = async () => {
    const { data } = await axios.get(
      '/rights?_embed=children'
    )
    setDataSource(
      data.map((item) => {
        if (item.children.length === 0) {
          return {
            ...item,
            children: null,
          }
        } else {
          return item
        }
      })
    )
  }
  useEffect(() => {
    getData()
  }, [])
  const confirm = (item) => {
    console.log('item', item)
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该权限？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 如果是一级权限
          if (item.grade === 1) {
            await axios.delete(`/rights/${item.id}`)
          } else {
            await axios.delete(`/children/${item.id}`)
          }
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
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '权限名称',
      dataIndex: 'label',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
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
              disabled={item.pagepermisson === undefined}
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
