import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Form, Input, Select } from 'antd'
import axios from 'axios'

const UserForm = forwardRef((props, ref) => {
  console.log('ref====', ref)
  const { onOk } = props
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
  const getRegions = async () => {
    const { data } = await axios.get('http://localhost:8000/regions')
    setRegionOptions(data)
  }
  const getRoles = async () => {
    const { data } = await axios.get('http://localhost:8000/roles')
    setRoleOptions(
      data.map((e) => {
        return {
          value: e.id,
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
        <Input />
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
        <Input />
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
        <Select options={regionOptions} disabled={disabled} />
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
          options={roleOptions}
          onChange={(val) => {
            if (val === 1) {
              form.setFieldsValue({
                region: '',
              })
            }
            setDisabled(val === 1)
          }}
        />
      </Form.Item>
    </Form>
  )
})
export default UserForm
