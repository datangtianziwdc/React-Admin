import React from 'react'
import { Result, Button } from 'antd'
import './index.scss'
import { useNavigate } from 'react-router-dom'

export default function NoPremission() {
  const navigate = useNavigate()
  return (
    <div className="center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
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
