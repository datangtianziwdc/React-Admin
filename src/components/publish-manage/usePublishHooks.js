import { useEffect, useState } from 'react'
import { getUserInfo } from '../../utils/common'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import axios from 'axios'
function usePublishHooks(state, callback) {
  const [dataSource, setDataSource] = useState([])
  const { username } = getUserInfo()
  const getData = () => {
    axios
      .get(`/news?author=${username}&publishState=${state}&_expand=category`)
      .then((res) => {
        console.log('res', res.data)
        setDataSource(res.data)
      })
  }
  const publishHandle = (item) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定发布？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios
            .patch(`/news/${item.id}`, {
              publishState: 2,
              publishTime: Date.now(),
            })
            .then((res) => {
              callback()
              getData()
            })
        } catch (error) {
          console.log('error', error)
        }
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }
  const sunsetHandle = (item) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定下线该新闻？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios
            .patch(`/news/${item.id}`, {
              publishState: 3,
            })
            .then((res) => {
              callback()
              getData()
            })
        } catch (error) {
          console.log('error', error)
        }
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }
  const deleteHandle = (item) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios
            .delete(`/news/${item.id}`)
            .then((res) => {
              callback()
              getData()
            })
        } catch (error) {
          console.log('error', error)
        }
      },
      onCancel: () => {
        console.log('onCancel')
      },
    })
  }

  useEffect(() => {
    getData()
  }, [username])
  return {
    dataSource,
    publishHandle,
    sunsetHandle,
    deleteHandle,
  }
}
export default usePublishHooks
