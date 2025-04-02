import React, { useState } from 'react';
import { Table, Card, Button, Space, Form, Input, DatePicker, Select, message, Row, Col, Statistic, Tag } from 'antd';
import { SearchOutlined, ExportOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface FaceTrack {
  id: string;
  userName: string;
  userType: 'employee' | 'visitor';
  location: string;
  deviceName: string;
  time: string;
  confidence: number;
  imageUrl?: string;
}

const FaceTrack: React.FC = () => {
  const [form] = Form.useForm();

  // 模拟人脸轨迹数据
  const trackData: FaceTrack[] = [
    {
      id: '1',
      userName: '李明华',
      userType: 'employee',
      location: '1号楼大厅',
      deviceName: '人脸识别设备-01',
      time: '2025-03-20 09:00:00',
      confidence: 98.5
    },
    {
      id: '2',
      userName: '王柳',
      userType: 'visitor',
      location: '2号楼侧门',
      deviceName: '人脸识别设备-02',
      time: '2025-03-20 09:15:00',
      confidence: 95.2
    },
    {
      id: '3',
      userName: '王五',
      userType: 'employee',
      location: '3号楼后门',
      deviceName: '人脸识别设备-03',
      time: '2025-03-20 09:30:00',
      confidence: 99.1
    }
  ];

  const columns = [
    {
      title: '用户姓名',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      )
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      key: 'userType',
      render: (type: string) => (
        <Tag color={type === 'employee' ? 'blue' : 'green'}>
          {type === 'employee' ? '员工' : '访客'}
        </Tag>
      )
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '识别时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '识别置信度',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence: number) => (
        <Tag color={confidence >= 95 ? 'success' : 'warning'}>
          {confidence}%
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: FaceTrack) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewImage(record.id)}>
            查看图片
          </Button>
          <Button type="link" onClick={() => handleViewTrack(record.id)}>
            查看轨迹
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (values: any) => {
    console.log('Search:', values);
    message.success('搜索成功');
  };

  const handleExport = () => {
    message.success('正在导出轨迹记录');
  };

  const handleViewImage = (id: string) => {
    message.success('查看图片');
  };

  const handleViewTrack = (id: string) => {
    message.success('查看轨迹');
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日识别次数"
              value={trackData.filter(item => dayjs(item.time).isSame(dayjs(), 'day')).length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="员工识别"
              value={trackData.filter(item => item.userType === 'employee').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="访客识别"
              value={trackData.filter(item => item.userType === 'visitor').length}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="高置信度"
              value={trackData.filter(item => item.confidence >= 95).length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="人脸轨迹查询"
        extra={
          <Space>
            <Button icon={<ExportOutlined />} onClick={handleExport}>
              导出
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: 16 }}
        >
          <Form.Item name="userName" label="用户姓名">
            <Input placeholder="请输入用户姓名" />
          </Form.Item>
          <Form.Item name="userType" label="用户类型">
            <Select placeholder="请选择用户类型" style={{ width: 120 }}>
              <Select.Option value="employee">员工</Select.Option>
              <Select.Option value="visitor">访客</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="location" label="位置">
            <Input placeholder="请输入位置" />
          </Form.Item>
          <Form.Item name="dateRange" label="时间范围">
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        <Table columns={columns} dataSource={trackData} rowKey="id" />
      </Card>
    </div>
  );
};

export default FaceTrack; 