import {  Button, message } from 'antd'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublishHooks from '../../../components/publish-manage/usePublishHooks'
export default function Published() {
  const [messageApi, contextHolder] = message.useMessage()
  const {dataSource,sunsetHandle} = usePublishHooks(2,()=>{
    messageApi.open({
      type: 'success',
      content: '下线成功',
    })
  })
  return (
    <>
      {contextHolder}
      <NewsPublish dataSource={dataSource} button={
          (item)=><Button type="primary" size="small" onClick={()=>sunsetHandle(item)}>
            下线
          </Button>
        }></NewsPublish>
    </>
  )
}

