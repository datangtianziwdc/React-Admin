import React, { useEffect, useState } from 'react'
import { Table, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const getData = async () => {
    const { data } = await axios.get('http://localhost:8000/roles')
    setDataSource(data)
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
          await axios.delete(`http://localhost:8000/roles/${item.id}`)
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
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              danger
              type="primary"
              size="small"
              onClick={() => confirm(item)}
            >
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  return <Table dataSource={dataSource} columns={columns} rowKey="id" />
}
