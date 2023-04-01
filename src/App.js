import './App.css';
import { Space, Table, Layout, theme, FloatButton, Drawer, Form, Input, Radio, Button, Popover, Select, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'antd/es/typography/Link';


  const { Column, ColumnGroup } = Table;
  const { Option } = Select;



  const App = () => {

    const [userData, setUserData] = useState()
    const [genderImg, setGenderImg] = useState()
    const [open, setOpen] = useState(false)

    const [error, setError] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const baseURL = "https://sandapps.hubblerapp.com/testrest/srinivas/"



    ////////// GET DATA ///////////

    function userGetData() {
      axios.get(baseURL)
        .then(response => {
          console.log(response.data);
          setUserData(response.data.result)
        })
        .catch(error => {
          console.log(error);
        });
    }

    useEffect(() => {
      userGetData();
    }, [])



    ////////// POST DATA ///////////

    function userPostData(payload) {
      axios.post(baseURL, payload )
        .then(response => {
          console.log(response.data, "post");
          const newData = response.data.result;
          setUserData((prevProps) => [...prevProps, newData] ) 
        })
        .catch(error => {
          console.log(error);
        });
    }


    const onFinish = (values) => {
      console.log('Success:', values);
      userPostData(values)
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };


    ////////// DELETE DATA ///////////

    function deleteData(id) {
      axios.delete(baseURL, {"_id": id })
        .then(response => {
          const newData = response.data.result;
          setUserData((prevProps) => [...prevProps, newData] ) 
        })
        .catch(error => {
          console.log(error);
        });
    }

    const handleDelete = (id) => {
      deleteData(id)
    }


    ////////// PATCH DATA ///////////

    function editData(id, payload) {
      axios.patch(baseURL+id, payload  )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }


    const handleEdit = (record) => {

      const newData = [...userData]
      const index = newData.findIndex(item => item._id === record._id);
      if (index > -1) {
        newData[index] = {...record, editing: true}
        setUserData(newData);
      }
    }

    const handleCancelEdit= (record) => {
     
      const newData = [...userData]
      console.log(record, newData, "EditID")
      const index = newData.findIndex(item => item._id === record._id);
      if (index > -1) {
        newData[index] = {...record, editing: false}
        setUserData(newData);
      }

      setError(false)
    }

    const handleSaveEdit = (record) => {

      if(error) {

        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });

        return
      }
      console.log(record, "record")
      
     editData(record._id, record)

     handleCancelEdit(record);  

    }

    function handleFieldChange(value, field, record) {

      if( value === "") {
        setError(true)
        return
      }

      setError(false)

      const newData = [...userData];
      const index = newData.findIndex(item => item._id === record._id);
      if (index > -1) {
        newData[index] = { ...record, [field]: value };
        setUserData(newData);
      }
    }
  





    ////////// POPOVER CONTENT //////////
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleOpenChange = (popoverOpen) => {
      setPopoverOpen(popoverOpen);
    };

    const hide = () => {
      setOpen(false);
    };

    const handleGenderChange = (e) => {
      setGenderImg(e)
    }



    
    return (
      <>
       
        <Layout className='hu-section' >
        <Form>
          <Table dataSource={userData} style={{ width: "100%" }} className="hu-table" rowClassName="hu-table__row">
              <Column 
                title="first_name" 
                dataIndex="first_name" 
                key="first_name" 
                editable= {true}
                render={(text, record) => {
                  if (record.editing) {
                    return (
                      <Form.Item
                        name={record.dataIndex}
                        
                        rules={[
                          {
                            required: true,
                            message: 'Please input your firstname!',
                          },
                        ]}
                      >
                      <Input
                        defaultValue={text}
                        onChange={e => handleFieldChange(e.target.value, "first_name", record)}
                      />
                      </Form.Item>
                    );
                  }
                  return text;
                }
                }

              />
              <Column title="last_name" dataIndex="last_name" key="last_name" 
                render={(text, record) => {
                  if (record.editing) {
                    return (
                      <Form.Item
                        name={record.dataIndex}
                        
                        rules={[
                          {
                            required: true,
                            message: 'Please input your last_name!',
                          },
                        ]}
                      >
                      <Input
                        defaultValue={text}
                        onChange={e => handleFieldChange(e.target.value, "last_name", record)}
                      />
                      </Form.Item>
                    );
                  }
                  return text;
                }
                }
              />
              <Column title="phone" dataIndex="phone" key="phone" 
                render={(text, record) => {
                  if (record.editing) {
                    return (
                      <Form.Item
                        name={record.dataIndex}
                        
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Phone number!',
                          },
                        ]}
                      >
                        <Input
                          defaultValue={text}
                          type="tel"
                          onChange={e => handleFieldChange(e.target.value, "phone", record)}
                        />
                      </Form.Item>
                    );
                  }
                  return text;
                }
                }
              />
              <Column title="email" dataIndex="email" key="email" 
                render={(text, record) => {
                  if (record.editing) {
                    return (
                      <Form.Item
                        name={record.dataIndex}
                        
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Email!',
                          },
                        ]}
                      >
                      <Input
                        defaultValue={text}
                        type="email"
                        onChange={e => handleFieldChange(e.target.value, "email", record)}
                      />
                      </Form.Item>
                    );
                  }
                  return text;
                }
                }
              />
              <Column title="gender" dataIndex="gender" key="gender" 
                render={(text, record) => {
                  if (record.editing) {
                    return (
                      <Form.Item 
                        name={record.dataIndex}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select defaultValue={text} allowClear onChange={e => handleFieldChange(e, "gender", record)}>
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>

                    );
                  }
                  return text;
                }
                }
              />
              <Column
                title=""
                dataIndex="action"
                key="action"
                className='hu-table__col'
                render={(_, record) => (
                  <Space size="middle">
                    {record.editing ?

                    <Space>
                      <Button onClick={() => handleSaveEdit(record)}>Save</Button>
                      <Button onClick={() => handleCancelEdit(record)}>Cancel</Button>
                    </Space>
                      
                    :
                    <Space className='hu-table__col-actions'>
                      <div>
                        <Popover 
                          content={
                            <Space>
                              <Button onClick={() => handleDelete(record._id)} type="primary" danger>Yes, Delete it</Button>
                              <Button onClick={() => setPopoverOpen(false)}>Cancel</Button>
                            </Space>
                          } 
                          title="Are you sure?" 
                          trigger="click" 
                          onOpenChange={handleOpenChange} 
                        >
                          <Button><DeleteOutlined /></Button>
                        </Popover>
                      </div>
                      <Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
                    </Space>
                    }
                  </Space>
                )}
              />          
          </Table>
          </Form>

          {error && <div className='hu-error'>Please enter all input fields</div>}

        </Layout>

        <FloatButton tooltip={<div>Add person</div>} onClick={() => setOpen(true)} icon={<PlusOutlined />} type="primary" />

        <Drawer
          placement="right"
          size="large"
          onClose={() => setOpen(false)}
          open={open}
          
        >
          <div className='hu-profile'><img src={genderImg == "female" ? '/images/placeholders/female.jpg' : genderImg == "male" ? '/images/placeholders/male.jpg' : '/images/placeholders/default.jpg' } /></div>

          <Form
            name="basic"
            layout='vertical'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="first Name"
              name="first_name"
              
              rules={[
                {
                  required: true,
                  message: 'Please input your firstname!',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your lastname!',
                },
              ]}
            >
              <Input size="large" typ />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phonenumber!',
                },
              ]}
            >
              <Input size="large" type='tel' />
            </Form.Item>

            <Form.Item
              label="Email ID"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input size="large" type='email' />
            </Form.Item>

            <Form.Item 
              label="Gender" 
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select defaultValue="other" allowClear onChange={handleGenderChange} size="large">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" size='large' >
              Submit
            </Button>

          </Form>
        </Drawer>

      </>
    )
  }

export default App;
