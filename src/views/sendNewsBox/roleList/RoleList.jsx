import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Tree, message, Space } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function RoleList() {
  const [messageApi, contextHolder] = message.useMessage()
  const [dataSource, setDataSource] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rightList, setRightList] = useState(false)
  const [currentRight, setCurrentRight] = useState({})
  const [rightId, setRightId] = useState(0)
  const getData = async () => {
    const { data } = await axios.get('http://localhost:8000/roles')
    setDataSource(data)
  }
  const getRightList = async () => {
    const { data } = await axios.get(
      'http://localhost:8000/rights?_embed=children'
    )
    setRightList(data)
  }
  const patchRights = async () => {
    axios.patch(`http://localhost:8000/roles/${rightId}`, {
      rights: currentRight,
    })
    messageApi.open({
      type: 'success',
      content: '保存成功',
    })
  }
  useEffect(() => {
    getData()
    getRightList()
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
            <Space>
              <Button
                danger
                type="primary"
                size="small"
                onClick={() => confirm(item)}
              >
                删除
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setIsModalOpen(true)
                  setCurrentRight(item.rights)
                  setRightId(item.id)
                  console.log('currentRight', currentRight)
                }}
              >
                编辑
              </Button>
            </Space>
          </div>
        )
      },
    },
  ]
  return (
    <>
      {contextHolder}
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false)
          patchRights()
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <Tree
          checkable
          checkStrictly
          fieldNames={{ title: 'label' }}
          checkedKeys={currentRight}
          onCheck={(checkKeys) => {
            console.log('checkKeys', checkKeys)
            setCurrentRight(checkKeys)
          }}
          treeData={rightList}
          locale={{
            Empty: {
              description: '暂无数据'
            },
          }}
        />
      </Modal>
    </>
  )
}
