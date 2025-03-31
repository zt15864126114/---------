import React, { useState } from 'react';
import { Table, Card, Button, Space, DatePicker, Select, Tag, message, Progress } from 'antd';
import { SyncOutlined, DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface SyncRecord {
  id: string;
  deviceName: string;
  syncType: 'person' | 'record';
  startTime: string;
  endTime: string;
  status: 'success' | 'running' | 'fail';
  progress: number;
  total: number;
  success: number;
  fail: number;
  failReason?: string;
}

const AccessSync: React.FC = () => {
  // 模拟同步记录数据
  const syncData: SyncRecord[] = [
    {
      id: '1',
      deviceName: '1号楼大厅门禁',
      syncType: 'person',
      startTime: '2024-03-20 10:30:00',
      endTime: '2024-03-20 10:31:00',
      status: 'success',
      progress: 100,
      total: 100,
      success: 100,
      fail: 0
    },
    {
      id: '2',
      deviceName: '2号楼侧门门禁',
      syncType: 'record',
      startTime: '2024-03-19 15:45:00',
      endTime: '2024-03-19 15:46:00',
      status: 'running',
      progress: 60,
      total: 100,
      success: 60,
      fail: 0
    },
    {
      id: '3',
      deviceName: '3号楼入口门禁',
      syncType: 'person',
      startTime: '2024-03-18 09:20:00',
      endTime: '2024-03-18 09:21:00',
      status: 'fail',
      progress: 0,
      total: 100,
      success: 0,
      fail: 100,
      failReason: '设备离线'
    }
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '同步类型',
      dataIndex: 'syncType',
      key: 'syncType',
      render: (type: string) => {
        const typeMap = {
          person: { color: 'blue', text: '人员同步' },
          record: { color: 'green', text: '记录同步' }
        };
        const { color, text } = typeMap[type as keyof typeof typeMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          success: { color: 'green', text: '成功' },
          running: { color: 'blue', text: '同步中' },
          fail: { color: 'red', text: '失败' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '进度',
      key: 'progress',
      render: (record: SyncRecord) => (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Progress percent={record.progress} status={record.status === 'fail' ? 'exception' : undefined} />
          <span>{record.success}/{record.total}</span>
        </Space>
      ),
    },
    {
      title: '失败原因',
      dataIndex: 'failReason',
      key: 'failReason',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SyncRecord) => (
        <Space size="middle">
          <Button type="link" icon={<SyncOutlined />} onClick={() => handleSync(record.id)}>
            重新同步
          </Button>
          <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload(record.id)}>
            下载日志
          </Button>
        </Space>
      ),
    },
  ];

  const handleSync = (id: string) => {
    message.success('开始同步');
  };

  const handleDownload = (id: string) => {
    message.success('开始下载');
  };

  return (
    <div>
      <Card
        title="数据同步"
        extra={
          <Space>
            <Button type="primary" icon={<SyncOutlined />}>
              批量同步
            </Button>
            <Button icon={<DownloadOutlined />}>
              下载日志
            </Button>
          </Space>
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
            <Option value="all">所有类型</Option>
            <Option value="person">人员同步</Option>
            <Option value="record">记录同步</Option>
          </Select>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">所有状态</Option>
            <Option value="success">成功</Option>
            <Option value="running">同步中</Option>
            <Option value="fail">失败</Option>
          </Select>
        </Space>
        <Table columns={columns} dataSource={syncData} rowKey="id" />
      </Card>
    </div>
  );
};

export default AccessSync; 