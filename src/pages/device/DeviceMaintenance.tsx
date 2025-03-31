import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message, Row, Col, Statistic, Modal, Form, Input, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface MaintenanceData {
  id: string;
  deviceName: string;
  deviceCode: string;
  category: string;
  maintenanceType: string;
  startTime: string;
  endTime: string;
  maintainer: string;
  status: string;
  description: string;
  result: string;
  cost: number;
  createTime: string;
  updateTime: string;
}

const DeviceMaintenance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟维护记录数据
  const data: MaintenanceData[] = [
    {
      id: '1',
      deviceName: '摄像头-01',
      deviceCode: 'CAM001',
      category: '视频监控',
      maintenanceType: '定期维护',
      startTime: '2025-03-20 09:00:00',
      endTime: '2025-03-20 10:00:00',
      maintainer: '张三',
      status: 'completed',
      description: '清洁镜头，检查连接',
      result: '正常',
      cost: 200,
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '2',
      deviceName: '门禁-01',
      deviceCode: 'ACC001',
      category: '门禁控制',
      maintenanceType: '故障维修',
      startTime: '2025-03-19 14:00:00',
      endTime: '2025-03-19 16:00:00',
      maintainer: '李四',
      status: 'completed',
      description: '更换读卡器',
      result: '已修复',
      cost: 500,
      createTime: '2025-03-19 14:00:00',
      updateTime: '2025-03-19 16:00:00',
    },
    {
      id: '3',
      deviceName: '传感器-01',
      deviceCode: 'SEN001',
      category: '环境监测',
      maintenanceType: '定期维护',
      startTime: '2025-03-18 10:00:00',
      endTime: '2025-03-18 11:00:00',
      maintainer: '王五',
      status: 'in_progress',
      description: '校准传感器',
      result: '进行中',
      cost: 300,
      createTime: '2025-03-18 10:00:00',
      updateTime: '2025-03-18 11:00:00',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'processing';
      case 'scheduled':
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
      title: '维护类型',
      dataIndex: 'maintenanceType',
      key: 'maintenanceType',
      width: 120,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180,
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status === 'completed' ? '已完成' : status === 'in_progress' ? '进行中' : '已计划'}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      width: 100,
    },
    {
      title: '费用',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      render: (cost: number) => `¥${cost.toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: MaintenanceData) => (
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

  const handleEdit = (record: MaintenanceData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: MaintenanceData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除维护记录 ${record.deviceName} 吗？`,
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
              title="维护记录总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已完成维护"
              value={data.filter(item => item.status === 'completed').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="进行中维护"
              value={data.filter(item => item.status === 'in_progress').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总维护费用"
              value={data.reduce((sum, item) => sum + item.cost, 0)}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="设备维护"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加维护记录
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
        title={editingId ? '编辑维护记录' : '添加维护记录'}
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
            name="maintenanceType"
            label="维护类型"
            rules={[{ required: true, message: '请选择维护类型' }]}
          >
            <Select>
              <Select.Option value="定期维护">定期维护</Select.Option>
              <Select.Option value="故障维修">故障维修</Select.Option>
              <Select.Option value="升级改造">升级改造</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="time"
            label="维护时间"
            rules={[{ required: true, message: '请选择维护时间' }]}
          >
            <RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="in_progress">进行中</Select.Option>
              <Select.Option value="scheduled">已计划</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="维护描述"
            rules={[{ required: true, message: '请输入维护描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="result"
            label="维护结果"
            rules={[{ required: true, message: '请输入维护结果' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cost"
            label="维护费用"
            rules={[{ required: true, message: '请输入维护费用' }]}
          >
            <Input type="number" prefix="¥" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceMaintenance; 