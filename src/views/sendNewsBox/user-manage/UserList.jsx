import React, { useEffect, useRef, useState } from 'react'
import { Table, Button, Modal, message, Space, Switch } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../../components/user-manage/UserForm'
import { getUserInfo } from '../../../utils/common'
export default function UserList() {
  const [messageApi, contextHolder] = message.useMessage()
  const [dataSource, setDataSource] = useState([]) // 列表
  const [addVisible, setAddVisible] = useState(false) // 添加Modal
  const [updateVisible, setUpdateVisible] = useState(false) // 更新Modal
  const [regionDisabled, setRegionDisabled] = useState(false) // 表单地区是否禁用
  const [currentInfo, setCurrentInfo] = useState({}) // 当前用户信息
  const [regionOptions, setRegionOptions] = useState([])
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const { roleId, region } = getUserInfo()
  // 获取用户列表
  const getData = async () => {
    const { data } = await axios.get('http://localhost:8000/users?_expand=role')
    setDataSource(
      data.filter((e) =>
        e.roleId >= roleId && region === '' ? true : e.region === region
      )
    )
  }
  const getRegions = async () => {
    const { data } = await axios.get('http://localhost:8000/regions')
    setRegionOptions(data)
  }
  // 修改用户启用状态
  const patchUsers = async (item) => {
    await axios.patch(`http://localhost:8000/users/${item.id}`, {
      roleState: !item.roleState,
    })
    messageApi.open({
      type: 'success',
      content: `${item.roleState ? '已禁用' : '已启用'}`,
    })
    getData()
  }
  // 更新用户信息
  const patchUserInfo = async (item) => {
    console.log('更新的用户信息', item, currentInfo)
    await axios.patch(`http://localhost:8000/users/${currentInfo.id}`, item)
    getData()
  }
  // 插入用户数据
  const addRole = async (role) => {
    await axios.post(`http://localhost:8000/users`, {
      ...role,
      roleState: true,
      default: false,
    })
    messageApi.open({
      type: 'success',
      content: `添加成功`,
    })
    resetForm()
    getData()
  }
  // 重置表单
  const resetForm = () => {
    setAddVisible(false)
    setRegionDisabled(false)
    addForm.current.resetForm()
  }
  // 重置修改表单
  const resetUpdateForm = () => {
    setUpdateVisible(false)
    setRegionDisabled(false)
    updateForm.current.resetForm()
  }
  useEffect(() => {
    getData()
  }, [roleId,region])
  useEffect(() => {
    getRegions()
  }, [])
  const confirm = (item) => {
    console.log('item', item)
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除该用户？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8000/users/${item.id}`)
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
      title: '区域',
      filters: [
        ...regionOptions.map((e) => {
          return {
            text: e.label,
            value: e.value,
          }
        }),
        {
          text: '全球',
          value: '',
        },
      ],
      onFilter: (value, item) => item.region === value,
      render: (item) => {
        return <b>{item.region === '' ? '全球' : item.region}</b>
      },
    },
    {
      title: '角色名称',
      render: (item) => {
        return <b>{item.role.roleName}</b>
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            disabled={item.default}
            onChange={() => {
              patchUsers(item)
            }}
          />
        )
      },
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
                disabled={item.default}
                onClick={() => confirm(item)}
              >
                删除
              </Button>
              <Button
                type="primary"
                size="small"
                disabled={item.default}
                onClick={async () => {
                  setCurrentInfo(item)
                  await setUpdateVisible(true)
                  if (item.region === '') {
                    setRegionDisabled(true)
                  } else {
                    setRegionDisabled(false)
                  }
                  updateForm.current.setForm(item)
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
      <Space direction="vertical" className="w100">
        <Button
          type="primary"
          onClick={() => {
            setAddVisible(true)
          }}
        >
          添加用户
        </Button>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
      </Space>
      <Modal
        title="添加用户"
        okText={'确定'}
        cancelText={'取消'}
        open={addVisible}
        onOk={() => {
          addForm.current.validateForm()
        }}
        onCancel={() => resetForm()}
      >
        <UserForm
          ref={addForm}
          onOk={(formData) => {
            addRole(formData)
          }}
          regionDisabled={regionDisabled}
        />
      </Modal>
      <Modal
        title="修改用户"
        okText={'确定'}
        cancelText={'取消'}
        open={updateVisible}
        onOk={() => {
          setUpdateVisible(false)
          updateForm.current.validateForm()
        }}
        onCancel={() => resetUpdateForm()}
      >
        <UserForm
          ref={updateForm}
          onOk={(formData) => {
            // addRole(formData)
            patchUserInfo(formData)
          }}
          regionDisabled={regionDisabled}
        />
      </Modal>
    </>
  )
}
