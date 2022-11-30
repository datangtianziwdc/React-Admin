import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
export default function RightList() {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        'http://localhost:8000/rights?_embed=children'
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
    getData()
  }, [])
  const confirm = () => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该权限？',
      okText: '确认',
      cancelText: '取消',
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
      render: () => {
        return (
          <div>
            <Button type="primary" size="small">
              编辑
            </Button>
            <Button danger type="primary" size="small" onClick={()=>confirm()}>
              删除
            </Button>
          </div>
        )
      },
    },
  ]
  return <Table dataSource={dataSource} columns={columns} />
}
