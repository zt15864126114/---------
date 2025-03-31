import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // 模拟数据
  const deviceData = [
    {
      key: '1',
      name: '门禁设备',
      total: 28,
      online: 26,
      offline: 1,
      maintenance: 1,
    },
    {
      key: '2',
      name: '摄像头',
      total: 86,
      online: 82,
      offline: 3,
      maintenance: 1,
    },
    {
      key: '3',
      name: '人脸识别设备',
      total: 24,
      online: 22,
      offline: 1,
      maintenance: 1,
    },
    {
      key: '4',
      name: '车辆识别设备',
      total: 16,
      online: 15,
      offline: 0,
      maintenance: 1,
    },
  ];

  const recentAccessData = [
    {
      key: '1',
      time: '2025-03-25 10:30:00',
      location: '1号门',
      person: '刘明',
      type: '员工',
      status: 'success',
    },
    {
      key: '2',
      time: '2025-03-25 10:25:00',
      location: '2号门',
      person: '陈志强',
      type: '访客',
      status: 'success',
    },
    {
      key: '3',
      time: '2025-03-25 10:20:00',
      location: '3号门',
      person: '王建华',
      type: '员工',
      status: 'failed',
    },
  ];

  const deviceColumns = [
    {
      title: '设备类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '总数',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '在线',
      dataIndex: 'online',
      key: 'online',
      render: (text: number) => (
        <Tag color="success">{text}</Tag>
      ),
    },
    {
      title: '离线',
      dataIndex: 'offline',
      key: 'offline',
      render: (text: number) => (
        <Tag color="error">{text}</Tag>
      ),
    },
    {
      title: '维护中',
      dataIndex: 'maintenance',
      key: 'maintenance',
      render: (text: number) => (
        <Tag color="warning">{text}</Tag>
      ),
    },
  ];

  const accessColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '人员',
      dataIndex: 'person',
      key: 'person',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === '员工' ? 'blue' : 'green'}>{type}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'success' : 'error'}>
          {status === 'success' ? '成功' : '失败'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>山东新高地智慧园区</h1>
      
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="园区总人数"
              value={386}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日访客"
              value={23}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="车辆总数"
              value={89}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={154}
              prefix={<SafetyCertificateOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="设备状态">
            <Table
              columns={deviceColumns}
              dataSource={deviceData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统运行状态">
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>系统负载</div>
              <Progress percent={45} status="active" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>存储空间</div>
              <Progress percent={35} status="active" />
            </div>
            <div>
              <div style={{ marginBottom: 8 }}>网络状态</div>
              <Progress percent={95} status="active" />
            </div>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="最近通行记录">
            <Table
              columns={accessColumns}
              dataSource={recentAccessData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 