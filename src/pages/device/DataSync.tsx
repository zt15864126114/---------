import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, message, Row, Col, Statistic, Progress } from 'antd';
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface SyncTask {
  id: string;
  deviceType: string;
  deviceCount: number;
  syncTime: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  progress: number;
  errorMessage?: string;
}

const DataSync: React.FC = () => {
  // 模拟同步任务数据
  const taskData: SyncTask[] = [
    {
      id: '1',
      deviceType: '门禁设备',
      deviceCount: 10,
      syncTime: '2024-03-20 10:00:00',
      status: 'success',
      progress: 100
    },
    {
      id: '2',
      deviceType: '摄像头',
      deviceCount: 20,
      syncTime: '2024-03-20 10:15:00',
      status: 'running',
      progress: 60
    },
    {
      id: '3',
      deviceType: '人脸识别设备',
      deviceCount: 5,
      syncTime: '2024-03-20 10:30:00',
      status: 'failed',
      progress: 30,
      errorMessage: '网络连接失败'
    },
    {
      id: '4',
      deviceType: '访客设备',
      deviceCount: 8,
      syncTime: '2024-03-20 11:00:00',
      status: 'pending',
      progress: 0
    }
  ];

  const columns = [
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: '设备数量',
      dataIndex: 'deviceCount',
      key: 'deviceCount',
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
      render: (progress: number, record: SyncTask) => (
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
      render: (_: any, record: SyncTask) => (
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
    message.success('正在重试同步任务');
  };

  const handleStart = (id: string) => {
    message.success('开始同步任务');
  };

  const handleSyncAll = () => {
    message.success('开始同步所有设备');
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总设备数"
              value={taskData.reduce((sum, task) => sum + task.deviceCount, 0)}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步中"
              value={taskData.filter(task => task.status === 'running').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步成功"
              value={taskData.filter(task => task.status === 'success').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步失败"
              value={taskData.filter(task => task.status === 'failed').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="数据同步"
        extra={
          <Button type="primary" icon={<SyncOutlined />} onClick={handleSyncAll}>
            同步所有设备
          </Button>
        }
      >
        <Table columns={columns} dataSource={taskData} rowKey="id" />
      </Card>
    </div>
  );
};

export default DataSync; 