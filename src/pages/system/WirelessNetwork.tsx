import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface WirelessDevice {
  id: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  type: string;
  status: string;
  ipAddress: string;
  macAddress: string;
  signalStrength: number;
  connectedUsers: number;
  lastUpdateTime: string;
  securityLevel: string;
}

const WirelessNetwork: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟数据
  const wirelessData: WirelessDevice[] = [
    {
      id: '1',
      deviceName: '主AP',
      deviceCode: 'WIFI-AP-001',
      location: 'A栋一层大厅',
      type: '无线接入点',
      status: 'normal',
      ipAddress: '192.168.1.100',
      macAddress: '00:11:22:33:44:55',
      signalStrength: 95,
      connectedUsers: 25,
      lastUpdateTime: '2025-03-20 10:00:00',
      securityLevel: 'high',
    },
    {
      id: '2',
      deviceName: '安全网关',
      deviceCode: 'WIFI-GW-001',
      location: '机房',
      type: '安全设备',
      status: 'warning',
      ipAddress: '192.168.1.1',
      macAddress: '00:11:22:33:44:66',
      signalStrength: 0,
      connectedUsers: 0,
      lastUpdateTime: '2025-03-20 09:55:00',
      securityLevel: 'high',
    },
    {
      id: '3',
      deviceName: '楼层AP',
      deviceCode: 'WIFI-AP-002',
      location: 'B栋二层',
      type: '无线接入点',
      status: 'normal',
      ipAddress: '192.168.1.101',
      macAddress: '00:11:22:33:44:77',
      signalStrength: 85,
      connectedUsers: 15,
      lastUpdateTime: '2025-03-20 10:05:00',
      securityLevel: 'medium',
    },
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 120,
    },
    {
      title: '设备编号',
      dataIndex: 'deviceCode',
      key: 'deviceCode',
      width: 120,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'success' : status === 'warning' ? 'warning' : 'error'}>
          {status === 'normal' ? '正常' : status === 'warning' ? '警告' : '故障'}
        </Tag>
      ),
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 120,
    },
    {
      title: 'MAC地址',
      dataIndex: 'macAddress',
      key: 'macAddress',
      width: 150,
    },
    {
      title: '信号强度',
      dataIndex: 'signalStrength',
      key: 'signalStrength',
      width: 100,
      render: (strength: number) => `${strength}%`,
    },
    {
      title: '连接用户数',
      dataIndex: 'connectedUsers',
      key: 'connectedUsers',
      width: 100,
    },
    {
      title: '最后更新时间',
      dataIndex: 'lastUpdateTime',
      key: 'lastUpdateTime',
      width: 180,
    },
    {
      title: '安全等级',
      dataIndex: 'securityLevel',
      key: 'securityLevel',
      width: 100,
      render: (level: string) => (
        <Tag color={level === 'high' ? 'red' : level === 'medium' ? 'orange' : 'green'}>
          {level === 'high' ? '高' : level === 'medium' ? '中' : '低'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: WirelessDevice) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: WirelessDevice) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条设备记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Success:', values);
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      message.success(editingId ? '更新成功' : '添加成功');
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={wirelessData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常设备"
              value={wirelessData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告设备"
              value={wirelessData.filter(item => item.status === 'warning').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障设备"
              value={wirelessData.filter(item => item.status === 'error').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="无线网络及网络安全系统"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={wirelessData}
          rowKey="id"
          scroll={{ x: 1500 }}
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑设备' : '添加设备'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="deviceName"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          <Form.Item
            name="deviceCode"
            label="设备编号"
            rules={[{ required: true, message: '请输入设备编号' }]}
          >
            <Input placeholder="请输入设备编号" />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input placeholder="请输入位置" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder="请选择类型">
              <Select.Option value="无线接入点">无线接入点</Select.Option>
              <Select.Option value="安全设备">安全设备</Select.Option>
              <Select.Option value="控制器">控制器</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">警告</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="ipAddress"
            label="IP地址"
            rules={[{ required: true, message: '请输入IP地址' }]}
          >
            <Input placeholder="请输入IP地址" />
          </Form.Item>
          <Form.Item
            name="macAddress"
            label="MAC地址"
            rules={[{ required: true, message: '请输入MAC地址' }]}
          >
            <Input placeholder="请输入MAC地址" />
          </Form.Item>
          <Form.Item
            name="signalStrength"
            label="信号强度"
            rules={[{ required: true, message: '请输入信号强度' }]}
          >
            <Input type="number" placeholder="请输入信号强度" />
          </Form.Item>
          <Form.Item
            name="connectedUsers"
            label="连接用户数"
            rules={[{ required: true, message: '请输入连接用户数' }]}
          >
            <Input type="number" placeholder="请输入连接用户数" />
          </Form.Item>
          <Form.Item
            name="lastUpdateTime"
            label="最后更新时间"
            rules={[{ required: true, message: '请选择最后更新时间' }]}
          >
            <Input placeholder="请输入最后更新时间" />
          </Form.Item>
          <Form.Item
            name="securityLevel"
            label="安全等级"
            rules={[{ required: true, message: '请选择安全等级' }]}
          >
            <Select placeholder="请选择安全等级">
              <Select.Option value="high">高</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="low">低</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WirelessNetwork; 