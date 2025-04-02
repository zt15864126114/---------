import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const { Option } = Select;

interface AccessDevice {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSyncTime: string;
}

const AccessDevices: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟门禁设备数据
  const deviceData: AccessDevice[] = [
    {
      id: '1',
      name: '1号楼大厅门禁',
      type: '门禁',
      manufacturer: '海康威视',
      model: 'DS-K2604',
      location: '1号楼大厅',
      status: 'online',
      lastSyncTime: '2025-03-20 10:30:00'
    },
    {
      id: '2',
      name: '2号楼侧门门禁',
      type: '门禁',
      manufacturer: '大华',
      model: 'DH-IPC-HDBW1230S',
      location: '2号楼侧门',
      status: 'offline',
      lastSyncTime: '2025-03-19 15:45:00'
    },
    {
      id: '3',
      name: '3号楼入口门禁',
      type: '门禁',
      manufacturer: '海康威视',
      model: 'DS-K1T671M',
      location: '3号楼入口',
      status: 'maintenance',
      lastSyncTime: '2025-03-18 09:20:00'
    }
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '厂家',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
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
          online: { color: 'green', text: '在线' },
          offline: { color: 'red', text: '离线' },
          maintenance: { color: 'orange', text: '维护中' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '最后同步时间',
      dataIndex: 'lastSyncTime',
      key: 'lastSyncTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AccessDevice) => (
        <Space size="middle">
          <Button type="link" icon={<SyncOutlined />} onClick={() => handleSync(record.id)}>
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

  const handleEdit = (record: AccessDevice) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该门禁设备吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleSync = (id: string) => {
    message.success('同步成功');
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
      <Card
        title="门禁设备列表"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备
          </Button>
        }
      >
        <Table columns={columns} dataSource={deviceData} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? '编辑门禁设备' : '添加门禁设备'}
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
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select>
              <Option value="门禁">门禁</Option>
              <Option value="人脸识别">人脸识别</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="manufacturer"
            label="厂家"
            rules={[{ required: true, message: '请选择厂家' }]}
          >
            <Select>
              <Option value="海康威视">海康威视</Option>
              <Option value="大华">大华</Option>
              <Option value="宇视">宇视</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="model"
            label="型号"
            rules={[{ required: true, message: '请输入型号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Option value="online">在线</Option>
              <Option value="offline">离线</Option>
              <Option value="maintenance">维护中</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccessDevices; 