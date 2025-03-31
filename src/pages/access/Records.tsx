import React, { useState } from 'react';
import { Table, Card, Button, Space, DatePicker, Select, Input, Tag, message } from 'antd';
import { SearchOutlined, ExportOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface AccessRecord {
  id: string;
  deviceName: string;
  personName: string;
  personType: 'employee' | 'visitor';
  accessType: 'face' | 'card' | 'password';
  accessTime: string;
  accessResult: 'success' | 'fail';
  failReason?: string;
}

const AccessRecords: React.FC = () => {
  // 模拟开门记录数据
  const recordData: AccessRecord[] = [
    {
      id: '1',
      deviceName: '1号楼大厅门禁',
      personName: '张三',
      personType: 'employee',
      accessType: 'face',
      accessTime: '2024-03-20 10:30:00',
      accessResult: 'success'
    },
    {
      id: '2',
      deviceName: '2号楼侧门门禁',
      personName: '李四',
      personType: 'visitor',
      accessType: 'card',
      accessTime: '2024-03-19 15:45:00',
      accessResult: 'success'
    },
    {
      id: '3',
      deviceName: '3号楼入口门禁',
      personName: '王五',
      personType: 'employee',
      accessType: 'password',
      accessTime: '2024-03-18 09:20:00',
      accessResult: 'fail',
      failReason: '密码错误'
    }
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '人员姓名',
      dataIndex: 'personName',
      key: 'personName',
    },
    {
      title: '人员类型',
      dataIndex: 'personType',
      key: 'personType',
      render: (type: string) => {
        const typeMap = {
          employee: { color: 'blue', text: '员工' },
          visitor: { color: 'green', text: '访客' }
        };
        const { color, text } = typeMap[type as keyof typeof typeMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '开门方式',
      dataIndex: 'accessType',
      key: 'accessType',
      render: (type: string) => {
        const typeMap = {
          face: { color: 'purple', text: '人脸识别' },
          card: { color: 'orange', text: '刷卡' },
          password: { color: 'cyan', text: '密码' }
        };
        const { color, text } = typeMap[type as keyof typeof typeMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '开门时间',
      dataIndex: 'accessTime',
      key: 'accessTime',
    },
    {
      title: '开门结果',
      dataIndex: 'accessResult',
      key: 'accessResult',
      render: (result: string) => {
        const resultMap = {
          success: { color: 'green', text: '成功' },
          fail: { color: 'red', text: '失败' }
        };
        const { color, text } = resultMap[result as keyof typeof resultMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '失败原因',
      dataIndex: 'failReason',
      key: 'failReason',
    },
  ];

  const handleSearch = () => {
    message.success('搜索成功');
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  return (
    <div>
      <Card
        title="开门记录"
        extra={
          <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
            导出
          </Button>
        }
      >
        <Space style={{ marginBottom: 16 }}>
          <RangePicker showTime />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">所有设备</Option>
            <Option value="1">1号楼大厅门禁</Option>
            <Option value="2">2号楼侧门门禁</Option>
            <Option value="3">3号楼入口门禁</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">所有人员</Option>
            <Option value="employee">员工</Option>
            <Option value="visitor">访客</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">所有方式</Option>
            <Option value="face">人脸识别</Option>
            <Option value="card">刷卡</Option>
            <Option value="password">密码</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">所有结果</Option>
            <Option value="success">成功</Option>
            <Option value="fail">失败</Option>
          </Select>
          <Input placeholder="人员姓名" style={{ width: 120 }} />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        <Table columns={columns} dataSource={recordData} rowKey="id" />
      </Card>
    </div>
  );
};

export default AccessRecords; 