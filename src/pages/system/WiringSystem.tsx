import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface WiringRecord {
  id: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  type: string;
  status: string;
  lastCheckTime: string;
  nextCheckTime: string;
  maintainer: string;
  description: string;
}

const WiringSystem: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟数据
  const wiringData: WiringRecord[] = [
    {
      id: '1',
      deviceName: '主配线架',
      deviceCode: 'WIRING-MDF-001',
      location: 'A栋一层机房',
      type: '光纤配线架',
      status: 'normal',
      lastCheckTime: '2025-03-20 09:00:00',
      nextCheckTime: '2025-04-20 09:00:00',
      maintainer: '张工',
      description: '24口光纤配线架',
    },
    {
      id: '2',
      deviceName: '楼层配线架',
      deviceCode: 'WIRING-FDF-001',
      location: 'A栋二层弱电间',
      type: '铜缆配线架',
      status: 'warning',
      lastCheckTime: '2025-03-19 14:30:00',
      nextCheckTime: '2025-04-19 14:30:00',
      maintainer: '李工',
      description: '48口铜缆配线架',
    },
    {
      id: '3',
      deviceName: '光纤收发器',
      deviceCode: 'WIRING-FO-001',
      location: 'B栋一层机房',
      type: '网络设备',
      status: 'normal',
      lastCheckTime: '2025-03-18 10:00:00',
      nextCheckTime: '2025-04-18 10:00:00',
      maintainer: '王工',
      description: '千兆光纤收发器',
    },
  ];

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
      title: '上次检查时间',
      dataIndex: 'lastCheckTime',
      key: 'lastCheckTime',
      width: 180,
    },
    {
      title: '下次检查时间',
      dataIndex: 'nextCheckTime',
      key: 'nextCheckTime',
      width: 180,
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
      width: 100,
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
      render: (_: any, record: WiringRecord) => (
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

  const handleEdit = (record: WiringRecord) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条布线记录吗？此操作不可恢复。',
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
              value={wiringData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常设备"
              value={wiringData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告设备"
              value={wiringData.filter(item => item.status === 'warning').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障设备"
              value={wiringData.filter(item => item.status === 'error').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="综合布线系统"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={wiringData}
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
              <Select.Option value="光纤配线架">光纤配线架</Select.Option>
              <Select.Option value="铜缆配线架">铜缆配线架</Select.Option>
              <Select.Option value="网络设备">网络设备</Select.Option>
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
            name="lastCheckTime"
            label="上次检查时间"
            rules={[{ required: true, message: '请选择上次检查时间' }]}
          >
            <Input placeholder="请输入上次检查时间" />
          </Form.Item>
          <Form.Item
            name="nextCheckTime"
            label="下次检查时间"
            rules={[{ required: true, message: '请选择下次检查时间' }]}
          >
            <Input placeholder="请输入下次检查时间" />
          </Form.Item>
          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员' }]}
          >
            <Input placeholder="请输入维护人员" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WiringSystem; 