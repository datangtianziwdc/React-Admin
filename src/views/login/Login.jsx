import React from 'react'
import { Button, Checkbox, Form, Input, Tabs, Space, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoginBg from '../../assets/login-bg.svg'
import './Login.scss'
import { setToken,setUserInfo } from '../../utils/common'

export default function Login() {
  const navigate = useNavigate()
  const onFinish = async(values) => {
    console.log('Received values of form: ', values)
    const {username,password} = values
    const {data} = await axios.get(`/users?username=${username}&password=${password}&roleState=${true}&_expand=role`)
    console.log("data",data)
    if(data.length === 0){
      message.error("用户名或密码不正确！")
    }else{
      setUserInfo(data[0]);
      setToken(username)
      navigate('/home',{replace:true})
    }
  }
  const onChange = (key) => {
    console.log(key)
  }
  return (
    <div className="container">
      <div className="logoBox">
        <img src={LoginBg} alt="" className="logoBg" />
        <Space direction="vertical" align="center">
          <div className="title">新闻发布后台</div>
          <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            centered
            className="tab"
            items={[
              {
                label: `账号密码登录`,
                key: '1',
                children: (
                  <Form
                    name="normal_login"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: '请输入用户名！',
                        },
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        prefix={<UserOutlined />}
                        placeholder="用户名：admin"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入密码！',
                        },
                      ]}
                    >
                      <Input.Password
                        autoComplete="off"
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="密码：123456"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>记住密码</Checkbox>
                      </Form.Item>
                    </Form.Item>
                    <Form.Item>
                      <Button block type="primary" htmlType="submit">
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
              {
                label: `手机号登录`,
                key: '2',
                children: (
                  <Form
                    name="phone_login"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: '请输手机号！',
                        },
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        prefix={<UserOutlined />}
                        placeholder="手机号：请使用账号登录！"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: '请输入密码！',
                        },
                      ]}
                    >
                      <Input.Password
                        autoComplete="off"
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="密码：请使用账号登录！"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>记住密码</Checkbox>
                      </Form.Item>
                    </Form.Item>
                    <Form.Item>
                      <Button block type="primary" htmlType="submit">
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
            ]}
          />
        </Space>
      </div>
    </div>
  )
}
