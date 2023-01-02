import { Button, message } from 'antd'
// import { ExclamationCircleOutlined } from '@ant-design/icons'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublishHooks from '../../../components/publish-manage/usePublishHooks'
export default function Sunset() {
  const [messageApi, contextHolder] = message.useMessage()
  const { dataSource, deleteHandle } = usePublishHooks(3,()=>{
    messageApi.open({
      type: 'success',
      content: '删除成功',
    })
  })
  return (
    <>
      {contextHolder}
      <NewsPublish
        dataSource={dataSource}
        button={(item) => (
          <Button
            type="primary"
            size="small"
            danger
            onClick={() => deleteHandle(item)}
          >
            删除
          </Button>
        )}
      ></NewsPublish>
    </>
  )
}
