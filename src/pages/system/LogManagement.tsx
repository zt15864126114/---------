import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message, Row, Col, Statistic, DatePicker, Select, Input } from 'antd';
import { SearchOutlined, ReloadOutlined, DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface LogData {
  id: string;
  timestamp: string;
  level: string;
  module: string;
  action: string;
  user: string;
  ip: string;
  description: string;
  status: string;
}

const LogManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [module, setModule] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // 模拟日志数据
  const data: LogData[] = [
    {
      id: '1',
      timestamp: '2025-03-20 09:00:00',
      level: 'info',
      module: '用户管理',
      action: '登录',
      user: 'admin',
      ip: '192.168.1.100',
      description: '用户登录成功',
      status: 'success',
    },
    {
      id: '2',
      timestamp: '2025-03-20 09:01:00',
      level: 'warning',
      module: '设备管理',
      action: '设备状态变更',
      user: 'system',
      ip: '192.168.1.101',
      description: '设备离线警告',
      status: 'warning',
    },
    {
      id: '3',
      timestamp: '2025-03-20 09:02:00',
      level: 'error',
      module: '系统管理',
      action: '系统异常',
      user: 'system',
      ip: '192.168.1.102',
      description: '数据库连接失败',
      status: 'error',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'blue';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: string) => (
        <Tag color={getLevelColor(level)}>
          {level.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '模块',
      dataIndex: 'module',
      key: 'module',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 120,
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      width: 120,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 140,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const handleSearch = () => {
    setLoading(true);
    // 模拟搜索
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setDateRange(null);
    setLevel(null);
    setModule(null);
    setSearchText('');
    handleSearch();
  };

  const handleExport = () => {
    message.success('导出成功');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="日志总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="错误日志"
              value={data.filter(item => item.level === 'error').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告日志"
              value={data.filter(item => item.level === 'warning').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="信息日志"
              value={data.filter(item => item.level === 'info').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="日志管理"
        extra={
          <Space>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>
              导出
            </Button>
          </Space>
        }
      >
        <Space style={{ marginBottom: 16 }}>
          <RangePicker
            showTime
            onChange={(dates) => {
              if (dates) {
                setDateRange([
                  dates[0]?.format('YYYY-MM-DD HH:mm:ss') || '',
                  dates[1]?.format('YYYY-MM-DD HH:mm:ss') || '',
                ]);
              } else {
                setDateRange(null);
              }
            }}
          />
          <Select
            placeholder="日志级别"
            style={{ width: 120 }}
            allowClear
            onChange={setLevel}
          >
            <Select.Option value="info">信息</Select.Option>
            <Select.Option value="warning">警告</Select.Option>
            <Select.Option value="error">错误</Select.Option>
          </Select>
          <Select
            placeholder="模块"
            style={{ width: 120 }}
            allowClear
            onChange={setModule}
          >
            <Select.Option value="用户管理">用户管理</Select.Option>
            <Select.Option value="设备管理">设备管理</Select.Option>
            <Select.Option value="系统管理">系统管理</Select.Option>
          </Select>
          <Input
            placeholder="搜索描述"
            style={{ width: 200 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </Space>

        <Table 
          columns={columns} 
          dataSource={data}
          rowKey="id"
          scroll={{ x: 1500 }}
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>
    </div>
  );
};

export default LogManagement; 