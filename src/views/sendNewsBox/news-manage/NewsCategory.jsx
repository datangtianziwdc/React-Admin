import axios from 'axios'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { Table, Button, message, Modal, Form, Input } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
export default function NewsCategory() {
  const EditableContext = React.createContext(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [dataSource, setDataSource] = useState([])
  const getData = () => {
    axios.get(`/categories`).then((res) => {
      setDataSource(res.data)
    })
  }
  const deleteHandle = (item) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `确定删除${item.label}栏目？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        try {
          axios.delete(`/categories/${item.id}`).then((res) => {
            messageApi.open({
              type: 'success',
              content: `已删除`,
            })
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
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm()
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
      if (editing) {
        inputRef.current.focus()
      }
    }, [editing])
    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      })
    }
    const save = async () => {
      try {
        const values = await form.validateFields()
        toggleEdit()
        handleSave({
          ...record,
          ...values,
        })
      } catch (errInfo) {
        console.log('Save failed:', errInfo)
      }
    }
    let childNode = children
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `请输入${title}`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }
    return <td {...restProps}>{childNode}</td>
  }
  const handleSave = (record) => {
    console.log('record', record)
    setDataSource(dataSource.map(item=>{
      if(item.id === record.id){
        return {
          ...record
        }
      }else{
        return item
      }
    }))
    axios.patch(`/categories/${record.id}`,{
      ...record
    }).then(res=>{
      // getData()
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '栏目名称',
      dataIndex: 'label',
      width: '40%',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'label',
        title: '栏目名称',
        handleSave,
      }),
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <Button
            danger
            type="primary"
            size="small"
            onClick={() => deleteHandle(item)}
          >
            删除
          </Button>
        )
      },
    },
  ]
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      {contextHolder}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
    </>
  )
}
