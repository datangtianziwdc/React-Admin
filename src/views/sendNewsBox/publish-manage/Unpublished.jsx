import { Button, message } from 'antd'
// import { ExclamationCircleOutlined } from '@ant-design/icons'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublishHooks from '../../../components/publish-manage/usePublishHooks'
export default function Unpublished() {
  const [messageApi, contextHolder] = message.useMessage()
  const { dataSource, publishHandle } = usePublishHooks(1, () => {
    messageApi.open({
      type: 'success',
      content: '发布成功',
    })
  })
  return (
    <>
      {contextHolder}
      <NewsPublish
        dataSource={dataSource}
        button={(item) => (
          <Button type="primary" size="small" onClick={() => publishHandle(item)}>
            发布
          </Button>
        )}
      ></NewsPublish>
    </>
  )
}
