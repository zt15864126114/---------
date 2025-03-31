import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, message, Row, Col, Statistic, Progress } from 'antd';
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface PersonSync {
  id: string;
  name: string;
  type: 'employee' | 'visitor';
  department?: string;
  syncTime: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  progress: number;
  errorMessage?: string;
}

const PersonSync: React.FC = () => {
  // 模拟人员同步数据
  const syncData: PersonSync[] = [
    {
      id: '1',
      name: '李明华',
      type: 'employee',
      department: '技术部',
      syncTime: '2024-03-20 10:00:00',
      status: 'success',
      progress: 100
    },
    {
      id: '2',
      name: '王柳',
      type: 'employee',
      department: '人事部',
      syncTime: '2024-03-20 10:15:00',
      status: 'running',
      progress: 60
    },
    {
      id: '3',
      name: '王五',
      type: 'visitor',
      syncTime: '2024-03-20 10:30:00',
      status: 'failed',
      progress: 30,
      errorMessage: '人脸图片质量不足'
    },
    {
      id: '4',
      name: '赵六',
      type: 'employee',
      department: '财务部',
      syncTime: '2024-03-20 11:00:00',
      status: 'pending',
      progress: 0
    }
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'employee' ? 'blue' : 'green'}>
          {type === 'employee' ? '员工' : '访客'}
        </Tag>
      )
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '同步时间',
      dataIndex: 'syncTime',
      key: 'syncTime',
    },
    {
      title: '同步进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number, record: PersonSync) => (
        <Progress percent={progress} size="small" status={record.status === 'failed' ? 'exception' : undefined} />
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          running: { color: 'processing', icon: <SyncOutlined />, text: '同步中' },
          success: { color: 'success', icon: <CheckCircleOutlined />, text: '已完成' },
          failed: { color: 'error', icon: <CloseCircleOutlined />, text: '失败' },
          pending: { color: 'default', icon: <ClockCircleOutlined />, text: '等待中' }
        };
        const { color, icon, text } = statusMap[status as keyof typeof statusMap];
        return (
          <Tag icon={icon} color={color}>
            {text}
          </Tag>
        );
      }
    },
    {
      title: '错误信息',
      dataIndex: 'errorMessage',
      key: 'errorMessage',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PersonSync) => (
        <Space size="middle">
          {record.status === 'failed' && (
            <Button type="link" icon={<SyncOutlined />} onClick={() => handleRetry(record.id)}>
              重试
            </Button>
          )}
          {record.status === 'pending' && (
            <Button type="link" icon={<SyncOutlined />} onClick={() => handleStart(record.id)}>
              开始同步
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleRetry = (id: string) => {
    message.success('正在重试同步');
  };

  const handleStart = (id: string) => {
    message.success('开始同步');
  };

  const handleSyncAll = () => {
    message.success('开始同步所有人员');
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总人数"
              value={syncData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步中"
              value={syncData.filter(item => item.status === 'running').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步成功"
              value={syncData.filter(item => item.status === 'success').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步失败"
              value={syncData.filter(item => item.status === 'failed').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="人员同步"
        extra={
          <Button type="primary" icon={<SyncOutlined />} onClick={handleSyncAll}>
            同步所有人员
          </Button>
        }
      >
        <Table columns={columns} dataSource={syncData} rowKey="id" />
      </Card>
    </div>
  );
};

export default PersonSync; 