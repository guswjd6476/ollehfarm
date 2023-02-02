import {Input, Form, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
import { useEffect, useState } from 'react';
import Weather from './weather/Weather';
import axios from 'axios';


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const EditableCells = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Autocontrol = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [datas, setDatas] = useState();
  const [editingKey, setEditingKey] = useState('');
  const [editingKeys, setEditingKeys] = useState('');

  useEffect(()=>{
    axios
        .get('/api/morningTempProfile')
        .then(function (response) {
          setData(response.data)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      axios
        .get('/api/eveningTempProfile')
        .then(function (response) {
          setDatas(response.data)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
  },[])

  const isEditing = (record) => record.id === editingKey;
  const isEditings = (record) => record.id + 11 == editingKeys;
  const edit = (record) => {
    form.setFieldsValue({
      temp: '',
      humidity: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const edits = (record) => {
    form.setFieldsValue({
      temp: '',
      humidity: '',
      ...record,
    });
    setEditingKeys(record.id +11);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const cancels = () => {
    setEditingKeys('');
  };
  const save = async (value) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => value.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updatetemp(newData, index)
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        updatetemp(newData, index)
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const saves = async (value) => {
    try {
      const row = await form.validateFields();
      const newData = [...datas];
      const index = newData.findIndex((item) => value.id === item.id);
      console.log(index,'index')
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updatetemps(newData, index)
        setDatas(newData);
        setEditingKeys('');
      } else {
        newData.push(row);
        setDatas(newData);
        updatetemps(newData, index)
        setEditingKeys('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  function updatetemp(values, idx) {
    axios.get('/api/updatetemp', {
      params: {
        id : idx + 1,
        temp: values[idx].temp,
        hum : values[idx].humidity,
      }
    })
      .then(function (response) {
        alert(response.data)
      })
      .catch(function (error) {
        alert("error");
      })
  }
  function updatetemps(values, idx) {
    axios.get('/api/updatetemp', {
      params: {
        id : idx + 13,
        temp: values[idx].temp,
        hum : values[idx].humidity,
      }
    })
      .then(function (response) {
        alert(response.data)
      })
      .catch(function (error) {
        alert("error");
      })
  }
  //오전
  const columns = [
    {
      title: '시간',
      dataIndex: 'time',
      key : "time",
      width : 200,
      render: (text, row, index) => {
        return (
          <>
           {row.time} AM
          </>
        )
          },
      
    },
    // {
    //   title: "시간",
    //   dataIndex: "time",
    //   dataIndex: "times",
    //   render: (text, row, index) => {
    //     if(row.time <= "11:00:00"){
    //     return (
    //       <>
    //        {row.time}
    //       </>
    //     );
    //   }
    //   },
    // },
    {
      title: '온도',
      dataIndex: 'temp',
      width: '18%',
      key : "temp",
      editable: true,
    },
    {
      title: '습도',
      dataIndex: 'humidity',
      width: '18%',
      key : "humidity",
      editable: true,
    },
    {
      title: '수정',
      width: '18%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  //오후
  const ecolumns = [
    {
      title: '시간',
      dataIndex: 'time',
      key : "time",
      width : 200,
      render: (text, row, index) => {
        return (
          <>
           {row.time} PM
          </>
        )
          },
      
    },
    {
      title: '온도',
      dataIndex: 'temp',
      width: '18%',
      key : 'temp',
      editable: true,
    },
    {
      title: '습도',
      dataIndex: 'humidity',
      width: '18%',
      key : "humidity",
      editable: true,
    },
    {
      title: '수정',
      width: '18%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditings(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => saves(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancels}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => {edits(record); console.log(record.id)}}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  // 오전
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  // 오후
  const emergedColumns = ecolumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditings(record),
      }),
    };
  });
  return (
    <div className='mainbox autocontrol'>
        <div className='header'>
                <div className='head_name'>재배실 온습도 프로파일 및 설정</div>
                <div className='option_contain' style={{width : '300px'}}>
                    <Weather/>
                </div>
            </div>
    <Form form={form} >
        <div style={{display:'flex', justifyContent:'space-between' , width:'100%'}}> 
            <Table
            rowKey="id"
            pagination={false}
            style={{width : 'calc(50% - 20px)'}}
                components={{
                body: {
                    cell: EditableCell,
                },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
            />
            <Table
            rowKey="id"
            pagination={false}
            style={{width : 'calc(50% - 20px)'}}
                components={{
                body: {
                    cell: EditableCells,
                },
                }}
                bordered
                dataSource={datas}
                columns={emergedColumns}
                rowClassName="editable-row"
            />
      </div>
      <div className='auto_btn'>
        <Button type='primary'>profile read</Button>
        <Button type='primary' danger>profile write</Button>
      </div>
    </Form>
    </div>
  );
};
export default Autocontrol;