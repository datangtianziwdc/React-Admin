import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'

export default function NoPremission() {
  const navigate = useNavigate()
  return (
    <div className="center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              return navigate('/home', { replace: true })
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  )
}
