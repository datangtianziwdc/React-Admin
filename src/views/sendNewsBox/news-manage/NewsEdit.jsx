import React, { useState, useEffect } from 'react'
import {
  Steps,
  Button,
  Space,
  Form,
  Input,
  Select,
  message,
  Result,
} from 'antd'
import style from './News.module.scss'
import axios from 'axios'
import NewsEditer from '../../../components/news-manage/NewsEditer'
import { getUserInfo } from '../../../utils/common'
import { useNavigate,useParams } from 'react-router-dom'
const { Option } = Select
export default function NewsEdit() {
  const navigate = useNavigate()
  const userInfo = getUserInfo()
  const { id } = useParams()
  const [current, setCurrent] = useState(0)
  const [categories, setCategories] = useState([])
  const [newsForm] = Form.useForm()
  const [formInfo, setFormInfo] = useState({})
  const [content, setContent] = useState('')
  const [auditState, setAuditState] = useState(0)
  console.log('props', id)
  useEffect(() => {
    axios.get(`news/${id}?_expand=category&_expand=role`).then((res) => {
        const {title,categoryId,content} = res.data
        newsForm.setFieldsValue({
            title,
            category:categoryId
        })
        setContent(content)
    })
  }, [id])
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
  const go = () => {
    navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
  }
  const reset = () => {
    newsForm.resetFields()
    setCurrent(0)
    setContent('')
  }
  const handleSave = (state) => {
    setAuditState(state)
    axios
      .patch(`/news/${id}`, {
        ...formInfo,
        categoryId: formInfo.category,
        content,
        auditState,
      })
      .then((res) => {
        handleNext()
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
      <div className="fs24 fw5 mb20">撰写新闻</div>
      <Steps
        className={`${style.step}`}
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
            title: '撰写完成',
            description: '',
          },
        ]}
      />
      {/* 步骤 */}
      <div className={current === 0 ? style.form : style.hidden}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          className="mb20"
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
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </div>
      <div className={current === 1 ? style.editer : style.hidden}>
        <NewsEditer
          getContent={(value) => {
            setContent(value)
          }}
          content={content}
        ></NewsEditer>
        <Space>
          <Button type="primary" onClick={() => handleSave(0)}>
            保存草稿箱
          </Button>
          <Button danger onClick={() => handleSave(1)}>
            提交审核
          </Button>
          <Button onClick={() => handlePre()}>上一步</Button>
        </Space>
      </div>
      <div className={current === 2 ? style.result : style.hidden}>
        <Result
          status="success"
          title={`已成功${auditState === 0 ? '保存至草稿箱' : '提交审核'}`}
          subTitle={`您可以到${
            auditState === 0 ? '草稿箱' : '审核列表'
          }中查看您的新闻`}
          extra={[
            <Button type="primary" key="go" onClick={() => go()}>
              去查看
            </Button>,
            <Button key="again" onClick={() => reset()}>
              再写一篇
            </Button>,
          ]}
        />
      </div>
    </>
  )
}
