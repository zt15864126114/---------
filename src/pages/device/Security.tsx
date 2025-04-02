import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface Security {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSyncTime: string;
  resolution: string;
  type: 'fixed' | 'ptz';
  recordingStatus: 'recording' | 'stopped';
}

const Security: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟安防设备数据
  const securityData: Security[] = [
    {
      id: '1',
      name: '1号楼大厅摄像头',
      location: '1号楼大厅',
      status: 'online',
      lastSyncTime: '2025-03-20 10:00:00',
      resolution: '1920x1080',
      type: 'fixed',
      recordingStatus: 'recording'
    },
    {
      id: '2',
      name: '2号楼走廊摄像头',
      location: '2号楼走廊',
      status: 'offline',
      lastSyncTime: '2025-03-20 09:30:00',
      resolution: '1920x1080',
      type: 'ptz',
      recordingStatus: 'stopped'
    },
    {
      id: '3',
      name: '3号楼停车场摄像头',
      location: '3号楼停车场',
      status: 'maintenance',
      lastSyncTime: '2025-03-20 08:00:00',
      resolution: '2560x1440',
      type: 'ptz',
      recordingStatus: 'stopped'
    }
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          online: { color: 'success', text: '在线' },
          offline: { color: 'error', text: '离线' },
          maintenance: { color: 'warning', text: '维护中' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          fixed: { color: 'blue', text: '固定' },
          ptz: { color: 'purple', text: '云台' }
        };
        const { color, text } = typeMap[type as keyof typeof typeMap];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '录像状态',
      dataIndex: 'recordingStatus',
      key: 'recordingStatus',
      render: (status: string) => {
        const statusMap = {
          recording: { color: 'success', text: '录像中' },
          stopped: { color: 'default', text: '已停止' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Security) => (
        <Space size="middle">
          <Button type="link" icon={<VideoCameraOutlined />} onClick={() => handlePreview(record)}>
            预览
          </Button>
          <Button type="link" icon={<SyncOutlined />} onClick={() => handleSync(record)}>
            同步
          </Button>
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

  const handleEdit = (record: Security) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该安防设备吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleSync = (record: Security) => {
    message.success(`正在同步安防设备：${record.name}`);
  };

  const handlePreview = (record: Security) => {
    message.success(`正在打开预览：${record.name}`);
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
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线设备"
              value={securityData.filter(item => item.status === 'online').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离线设备"
              value={securityData.filter(item => item.status === 'offline').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="维护中设备"
              value={securityData.filter(item => item.status === 'maintenance').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="录像中设备"
              value={securityData.filter(item => item.recordingStatus === 'recording').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="安防管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备
          </Button>
        }
      >
        <Table columns={columns} dataSource={securityData} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? '编辑安防设备' : '添加安防设备'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入设备位置' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择设备状态' }]}
          >
            <Select>
              <Select.Option value="online">在线</Select.Option>
              <Select.Option value="offline">离线</Select.Option>
              <Select.Option value="maintenance">维护中</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select>
              <Select.Option value="fixed">固定</Select.Option>
              <Select.Option value="ptz">云台</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="resolution"
            label="分辨率"
            rules={[{ required: true, message: '请选择分辨率' }]}
          >
            <Select>
              <Select.Option value="1920x1080">1920x1080</Select.Option>
              <Select.Option value="2560x1440">2560x1440</Select.Option>
              <Select.Option value="3840x2160">3840x2160</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Security; 