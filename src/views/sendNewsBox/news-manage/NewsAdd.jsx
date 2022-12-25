import React, { useState, useEffect } from 'react'
import { Steps, Button, Row, Space, Form, Input, Select } from 'antd'
import style from './News.module.scss'
import axios from 'axios'
import NewsEditer from '../../../components/news-manage/NewsEditer'
const { Option } = Select
export default function NewsAdd() {
  const [current, setCurrent] = useState(0)
  const [categories, setCategories] = useState([])
  const [newsForm] = Form.useForm()
  const handleNext = () => {
    if (current === 0) {
      newsForm
        .validateFields()
        .then((res) => {
          setCurrent(current + 1)
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else {
      setCurrent(current + 1)
    }
  }
  const handlePre = () => {
    setCurrent(current - 1)
  }
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get('/categories')
      setCategories(data)
    }
    getData()
  }, [])
  return (
    <>
      <div>撰写新闻</div>
      <Steps
        current={0}
        items={[
          {
            title: '基本信息',
            description: '新闻标题，新闻分类',
          },
          {
            title: '新闻内容',
            description: '新闻主体内容',
          },
          {
            title: '新闻提交',
            description: '保存草稿或者提交审核',
          },
        ]}
      />
      {/* 步骤 */}
      <div className={current === 0 ? '' : style.hidden}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          form={newsForm}
        >
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入新闻标题!',
              },
            ]}
          >
            <Input placeholder="请输入新闻标题" />
          </Form.Item>
          <Form.Item
            label="新闻分类"
            name="category"
            rules={[
              {
                required: true,
                message: '请选择新闻分类!',
              },
            ]}
          >
            <Select placeholder="请选择新闻分类" allowClear>
              {categories.map((e) => {
                return (
                  <Option value={e.id} key={e.id}>
                    {e.label}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className={current === 1 ? '' : style.hidden}><NewsEditer></NewsEditer></div>
      <div className={current === 2 ? '' : style.hidden}>33333333333</div>
      <Space>
        {current === 2 && (
          <Row>
            <Space>
              <Button type="primary">保存草稿箱</Button>
              <Button danger>提交审核</Button>
            </Space>
          </Row>
        )}
        {current < 2 && (
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        )}
        {current > 0 && (
          <Button onClick={() => handlePre()}>
            上一步
          </Button>
        )}
      </Space>
    </>
  )
}
