import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Col, Row, Card, Avatar } from 'antd'
import './Home.scss'
import { getUserInfo } from '../../../utils/common'
import _ from 'loadsh'
import * as echarts from 'echarts'
export default function Home() {
  const [viewList, setViewList] = useState([])
  const [starList, setStarList] = useState([])
  const barRef = useRef(null)
  const {
    username,
    region,
    role: { roleName },
  } = getUserInfo()
  useEffect(() => {
    axios
      .get(
        `/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=4`
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
  useEffect(() => {
    axios.get(`/news?publishState=2&_expand=category`).then((res) => {
      const obj = _.groupBy(res.data, (item) => item.category.label)
      console.log('obj', obj)
      renderBar(obj)
    })
    return ()=>{
      window.onresize = null
    }
  }, [])
  const renderBar = (obj) => {
    let chartDom = barRef.current
    let myChart = echarts.init(chartDom)
    const max = Object.values(obj).map(e=>e.length).reduce((a,b)=>a>b?a:b)
    let option
    option = {
      title: {
        text: '新闻分析图示',
      },
      legend: {
        data: ['稿件数量'],
      },
      radar: {
        indicator: Object.keys(obj).map((e) => ({
          name: e,
          max: max,
        })),
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: Object.values(obj).map((e) => e.length),
              name: '稿件数量',
            },
          ],
        },
      ],
    }

    option && myChart.setOption(option)
    window.onresize = ()=>{
      myChart.resize()
    }
  }
  return (
    <>
      <Row className="mb16" align="middle">
        <Avatar
          size={60}
          src="https://joeschmoe.io/api/v1/random"
          className="mr20"
        />
        <Col className="flex-col justify-c">
          <div className="fs16 fw6 mb10">
            早安，{username}，祝你开心每一天！
          </div>
          <Row className="c-af">
            {`管理区域：${!region ? '全球' : region}   |   权限：${roleName}`}
          </Row>
        </Col>
      </Row>
      <div className="space"></div>
      <Row className="mt16">
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
        <Col span={8} className="rightContainer">
          <div style={{ width: '100%', height: 500 }} ref={barRef}></div>
        </Col>
      </Row>
    </>
  )
}
