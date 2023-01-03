import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Row, Card, Avatar } from 'antd'
import './Home.scss'
import { getUserInfo } from '../../../utils/common'
export default function Home() {
  const [viewList, setViewList] = useState([])
  const [starList, setStarList] = useState([])
  const {username,region,role:{roleName}} = getUserInfo()
  useEffect(() => {
    axios
      .get(
        `/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=8`
      )
      .then((res) => {
        setViewList(res.data)
      })
  }, [])
  useEffect(() => {
    axios
      .get(
        `/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=4`
      )
      .then((res) => {
        setStarList(res.data)
      })
  }, [])
  return (
    <>
      <Row className="mb16" align="middle">
        <Avatar
          size={60}
          src="https://joeschmoe.io/api/v1/random"
          className="mr20"
        />
        <Col className="flex-col justify-c">
          <div className="fs16 fw6 mb10">早安，{username}，祝你开心每一天！</div>
          <Row className="c-af">
            {`管理区域：${!region?"全球":region}   |   权限：${roleName}`}
          </Row>
        </Col>
      </Row>
      <div className="space"></div>
      <Row className="pt16">
        <Col span={16}>
          <div className="fw6 fs16">浏览最多</div>
          <Row gutter={16} className="pt16">
            {viewList.map((e) => {
              return (
                <Col span={6} key={e.id}>
                  <Card
                    className="card"
                    bordered={true}
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >
                    <Row>
                      <Avatar
                        size={40}
                        src="https://joeschmoe.io/api/v1/random"
                        className="mr20"
                      />
                      <Col>
                        <div className="fs16 fw6">{e.title}</div>
                        <Row className="c-af">
                          点赞：{e.star} | 浏览：{e.view}
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              )
            })}
          </Row>
          <div className="fw6 fs16">点赞最多</div>
          <Row gutter={16} className="pt16">
            {viewList.map((e) => {
              return (
                <Col span={6} key={e.id}>
                  <Card
                    className="card"
                    bordered={true}
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >
                    <Row>
                      <Avatar
                        size={40}
                        src="https://joeschmoe.io/api/v1/random"
                        className="mr20"
                      />
                      <Col>
                        <div className="fs16 fw6">{e.title}</div>
                        <Row className="c-af">
                          点赞：{e.star} | 浏览：{e.view}
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Col>
        <Col span={8}>
          <div>
            <ul>
              {viewList.map((e, index) => {
                return <li key={index}>{e.title}</li>
              })}
            </ul>
            <ul>
              {starList.map((e, index) => {
                return <li key={index}>{e.title}</li>
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </>
  )
}
