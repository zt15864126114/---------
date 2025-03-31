import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message, Row, Col, Statistic, Modal, Form, Input, Select, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

interface DeviceData {
  id: string;
  deviceName: string;
  deviceCode: string;
  category: string;
  location: string;
  status: string;
  ip: string;
  mac: string;
  firmware: string;
  lastMaintenance: string;
  nextMaintenance: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const DeviceList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟设备数据
  const data: DeviceData[] = [
    {
      id: '1',
      deviceName: '摄像头-01',
      deviceCode: 'CAM001',
      category: '视频监控',
      location: '1号楼-1层-大厅',
      status: 'online',
      ip: '192.168.1.101',
      mac: '00:11:22:33:44:55',
      firmware: 'v1.2.3',
      lastMaintenance: '2025-03-01',
      nextMaintenance: '2025-04-01',
      description: '大厅主摄像头',
      createTime: '2025-01-01 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '2',
      deviceName: '门禁-01',
      deviceCode: 'ACC001',
      category: '门禁控制',
      location: '1号楼-1层-正门',
      status: 'offline',
      ip: '192.168.1.102',
      mac: '00:11:22:33:44:66',
      firmware: 'v2.1.0',
      lastMaintenance: '2025-03-15',
      nextMaintenance: '2025-04-15',
      description: '正门门禁设备',
      createTime: '2025-01-01 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '3',
      deviceName: '传感器-01',
      deviceCode: 'SEN001',
      category: '环境监测',
      location: '1号楼-1层-会议室',
      status: 'maintenance',
      ip: '192.168.1.103',
      mac: '00:11:22:33:44:77',
      firmware: 'v1.0.1',
      lastMaintenance: '2025-03-10',
      nextMaintenance: '2025-04-10',
      description: '会议室温湿度传感器',
      createTime: '2025-01-01 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 150,
    },
    {
      title: '设备编号',
      dataIndex: 'deviceCode',
      key: 'deviceCode',
      width: 120,
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status === 'online' ? '在线' : status === 'offline' ? '离线' : '维护中'}
        </Tag>
      ),
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 140,
    },
    {
      title: 'MAC地址',
      dataIndex: 'mac',
      key: 'mac',
      width: 140,
    },
    {
      title: '固件版本',
      dataIndex: 'firmware',
      key: 'firmware',
      width: 100,
    },
    {
      title: '最后维护',
      dataIndex: 'lastMaintenance',
      key: 'lastMaintenance',
      width: 120,
    },
    {
      title: '下次维护',
      dataIndex: 'nextMaintenance',
      key: 'nextMaintenance',
      width: 120,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: DeviceData) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: DeviceData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: DeviceData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除设备 ${record.deviceName} 吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      // 模拟保存
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        message.success(editingId ? '更新成功' : '添加成功');
      }, 1000);
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线设备"
              value={data.filter(item => item.status === 'online').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离线设备"
              value={data.filter(item => item.status === 'offline').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="维护中设备"
              value={data.filter(item => item.status === 'maintenance').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="设备列表"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加设备
            </Button>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={data}
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
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
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
            <Input />
          </Form.Item>
          <Form.Item
            name="deviceCode"
            label="设备编号"
            rules={[{ required: true, message: '请输入设备编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="设备类别"
            rules={[{ required: true, message: '请选择设备类别' }]}
          >
            <Select>
              <Select.Option value="视频监控">视频监控</Select.Option>
              <Select.Option value="门禁控制">门禁控制</Select.Option>
              <Select.Option value="环境监测">环境监测</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="设备位置"
            rules={[{ required: true, message: '请输入设备位置' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="设备状态"
            rules={[{ required: true, message: '请选择设备状态' }]}
          >
            <Select>
              <Select.Option value="online">在线</Select.Option>
              <Select.Option value="offline">离线</Select.Option>
              <Select.Option value="maintenance">维护中</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="ip"
            label="IP地址"
            rules={[
              { required: true, message: '请输入IP地址' },
              { pattern: /^(\d{1,3}\.){3}\d{1,3}$/, message: '请输入正确的IP地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mac"
            label="MAC地址"
            rules={[
              { required: true, message: '请输入MAC地址' },
              { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: '请输入正确的MAC地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firmware"
            label="固件版本"
            rules={[{ required: true, message: '请输入固件版本' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastMaintenance"
            label="最后维护时间"
            rules={[{ required: true, message: '请选择最后维护时间' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="nextMaintenance"
            label="下次维护时间"
            rules={[{ required: true, message: '请选择下次维护时间' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="description"
            label="设备描述"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceList; 