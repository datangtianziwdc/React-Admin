import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Form, Input, Select } from 'antd'
import axios from 'axios'
import { getUserInfo } from '../../utils/common'

const UserForm = forwardRef((props, ref) => {
  const { roleId, region, id, role } = getUserInfo()
  const { onOk, handleType, currentInfo } = props
  console.log('currentInfo', currentInfo.id === id)
  //   暴露当前ref的函数
  useImperativeHandle(ref, () => ({
    validateForm,
    resetForm,
    setForm,
  }))
  const [form] = Form.useForm()
  const [disabled, setDisabled] = useState(false)
  const [regionOptions, setRegionOptions] = useState([])
  const [roleOptions, setRoleOptions] = useState([])
  useEffect(() => {
    setDisabled(props.regionDisabled)
  }, [props.regionDisabled])
  const validateForm = () => {
    form
      .validateFields()
      .then((res) => {
        console.log('res', res)
        onOk(res)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const resetForm = () => {
    form.resetFields()
  }
  const setForm = (item) => {
    form.setFieldsValue(item)
  }
  // 获取区域列表
  const getRegions = async () => {
    const { data } = await axios.get('http://localhost:8000/regions')
    let newArr = []
    // 新增操作
    if (handleType === 'new') {
      switch (roleId) {
        // 区域管理员
        case 2:
          newArr = data.filter((e) => e.value === region)
          break
        // 超级管理员
        default:
          newArr = data
          break
      }
      // 编辑操作
    } else {
      switch (roleId) {
        // 区域管理员
        case 2:
          newArr = data.filter((e) => e.value === region)
          break
        // 超级管理员
        default:
          newArr = data
          break
      }
    }
    setRegionOptions(newArr)
  }
  // 获取角色列表
  const getRoles = async () => {
    const { data } = await axios.get('http://localhost:8000/roles')
    let newArr = []
    // 新增操作
    if (handleType === 'new') {
      switch (roleId) {
        // 区域管理员
        case 2:
          newArr = data.filter((e) => e.roleType > 2)
          break
        // 超级管理员
        default:
          newArr = data
          break
      }
      // 编辑操作
    } else {
      switch (roleId) {
        // 区域管理员
        case 2:
          newArr = data.filter((e) => e.roleType > 2)
          break
        // 超级管理员
        default:
          newArr = data
          break
      }
    }
    setRoleOptions(
      newArr.map((e) => {
        return {
          value: e.roleType,
          label: e.roleName,
        }
      })
    )
  }
  useEffect(() => {
    getRegions()
  }, [])
  useEffect(() => {
    getRoles()
  }, [])
  return (
    <Form
      ref={ref}
      form={form}
      layout="vertical"
      name="添加用户"
      onFinish={() => {}}
      onFinishFailed={() => {}}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名！',
          },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      >
        <Input placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        label="区域"
        name="region"
        rules={[
          {
            required: !disabled,
            message: '请选择区域！',
          },
        ]}
      >
        <Select
          placeholder="请选择区域"
          options={regionOptions}
          disabled={disabled || (handleType === 'update' && roleId === 2)}
        />
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleId"
        rules={[
          {
            required: true,
            message: '请选择角色！',
          },
        ]}
      >
        <Select
          placeholder="请选择角色"
          options={roleOptions}
          onChange={(val) => {
            if (val === 1) {
              form.setFieldsValue({
                region: '',
              })
            }
            setDisabled(val === 1)
          }}
          disabled={handleType === 'update' && roleId === 2}
        />
      </Form.Item>
    </Form>
  )
})
export default UserForm
