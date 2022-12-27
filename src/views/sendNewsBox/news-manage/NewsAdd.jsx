import React, { useState, useEffect } from 'react'
import { Steps, Button, Row, Space, Form, Input, Select, message, notification } from 'antd'
import style from './News.module.scss'
import axios from 'axios'
import NewsEditer from '../../../components/news-manage/NewsEditer'
import { getUserInfo } from '../../../utils/common'
import { useNavigate } from 'react-router-dom'
const { Option } = Select
export default function NewsAdd() {
  const navigate = useNavigate()
  const userInfo = getUserInfo()
  const [current, setCurrent] = useState(0)
  const [categories, setCategories] = useState([])
  const [newsForm] = Form.useForm()
  const [formInfo, setFormInfo] = useState({})
  const [content, setContent] = useState('')
  const handleNext = () => {
    if (current === 0) {
      newsForm
        .validateFields()
        .then((res) => {
          setFormInfo(res)
          setCurrent(current + 1)
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else {
      if (content === '' || content.trim() === '<p></p>') {
        message.error('新闻内容不能为空')
      } else {
        setCurrent(current + 1)
      }
    }
  }
  const handlePre = () => {
    setCurrent(current - 1)
  }
  const handleSave = (auditState) => {
    axios
      .post('/news', {
        ...formInfo,
        content,
        region: userInfo.region ? userInfo.region : '全球',
        author: userInfo.username,
        roleId: userInfo.roleId,
        auditState,
        publishState: 0,
        createTime: Date.now(),
        star: 0,
        view: 0,
      })
      .then((res) => {
        navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
        notification.info({
          message:"通知",
          description:`您可以到${auditState===0?'草稿箱':'审核列表'}中查看您的新闻`
        })
      })
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
        current={current}
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
      <div className={current === 1 ? '' : style.hidden}>
        <NewsEditer
          getContent={(value) => {
            setContent(value)
          }}
        ></NewsEditer>
      </div>
      <div className={current === 2 ? '' : style.hidden}>33333333333</div>
      <Space>
        {current === 2 && (
          <Row>
            <Space>
              <Button type="primary" onClick={()=>handleSave(0)}>保存草稿箱</Button>
              <Button danger onClick={()=>handleSave(1)}>提交审核</Button>
            </Space>
          </Row>
        )}
        {current < 2 && (
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        )}
        {current > 0 && <Button onClick={() => handlePre()}>上一步</Button>}
      </Space>
    </>
  )
}
