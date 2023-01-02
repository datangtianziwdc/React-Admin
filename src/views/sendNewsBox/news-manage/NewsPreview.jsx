import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import style from './News.module.scss'
import {auditMap,publishMap} from '../../../utils/common'
export default function NewsPreview(props) {
  const { id } = useParams()
  const [newsInfo, setNewsInfo] = useState(null)
  console.log('props', id)
  useEffect(() => {
    axios.get(`news/${id}?_expand=category&_expand=role`).then((res) => {
      setNewsInfo(res.data)
    })
  }, [id])
  return (
    <>
      {newsInfo && (
        <>
          <Descriptions title="基本信息">
            <Descriptions.Item label="创建者">
              {newsInfo.author}
            </Descriptions.Item>
            <Descriptions.Item label="分类">
              {newsInfo.category.label}
            </Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {newsInfo.publishTime
                ? moment(newsInfo.publishTime).format('YYYY/MM/DD HH:mm:ss')
                : '--'}
            </Descriptions.Item>
            <Descriptions.Item label="区域">
              {newsInfo.region}
            </Descriptions.Item>
            <Descriptions.Item label="审核状态">
              {auditMap[newsInfo.auditState]}
            </Descriptions.Item>
            <Descriptions.Item label="发布状态">
              {publishMap[newsInfo.publishState]}
            </Descriptions.Item>
            <Descriptions.Item label="访问数量">
              {newsInfo.view}
            </Descriptions.Item>
            <Descriptions.Item label="点赞数量">
              {newsInfo.star}
            </Descriptions.Item>
            <Descriptions.Item label="评论数量">0</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {moment(newsInfo.createTime).format('YYYY/MM/DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
          <div className={style.divider}></div>
          <Descriptions title="新闻内容" layout="vertical" bordered>
            <Descriptions.Item label={newsInfo.title}>
              <div
                className={style.html}
                dangerouslySetInnerHTML={{
                  __html: newsInfo.content,
                }}
              ></div>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </>
  )
}
