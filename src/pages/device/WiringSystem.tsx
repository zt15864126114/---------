import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  message,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ApiOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface WiringData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  capacity: string;
  usedPorts: number;
  totalPorts: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const WiringSystem: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟布线系统数据
  const [wiringData] = useState<WiringData[]>([
    {
      id: '1',
      name: '主楼布线系统',
      code: 'WIRING-001',
      type: '光纤',
      location: '主楼1层',
      status: 'normal',
      capacity: '1000Mbps',
      usedPorts: 45,
      totalPorts: 48,
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张三',
      description: '主楼核心布线系统',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '副楼布线系统',
      code: 'WIRING-002',
      type: '铜缆',
      location: '副楼2层',
      status: 'warning',
      capacity: '100Mbps',
      usedPorts: 24,
      totalPorts: 24,
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李四',
      description: '副楼办公区布线系统',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '数据中心布线系统',
      code: 'WIRING-003',
      type: '光纤',
      location: '数据中心',
      status: 'error',
      capacity: '10000Mbps',
      usedPorts: 96,
      totalPorts: 96,
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王五',
      description: '数据中心核心布线系统',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
  ]);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
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
          normal: { color: 'success', text: '正常' },
          warning: { color: 'warning', text: '警告' },
          error: { color: 'error', text: '故障' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: '端口使用',
      key: 'ports',
      render: (record: WiringData) => `${record.usedPorts}/${record.totalPorts}`,
    },
    {
      title: '最后维护时间',
      dataIndex: 'lastMaintenanceTime',
      key: 'lastMaintenanceTime',
    },
    {
      title: '下次维护时间',
      dataIndex: 'nextMaintenanceTime',
      key: 'nextMaintenanceTime',
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: WiringData) => (
        <Space size="middle">
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

  const handleEdit = (record: WiringData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: WiringData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除布线系统 ${record.name} 吗？`,
      onOk() {
        // 这里添加删除逻辑
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      // 这里添加保存逻辑
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        form.resetFields();
        message.success('保存成功');
      }, 1000);
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总布线系统"
              value={wiringData.length}
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常系统"
              value={wiringData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告系统"
              value={wiringData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障系统"
              value={wiringData.filter((item) => item.status === 'error').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingId(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            添加布线系统
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={wiringData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑布线系统' : '添加布线系统'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="编号"
            rules={[{ required: true, message: '请输入编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="光纤">光纤</Select.Option>
              <Select.Option value="铜缆">铜缆</Select.Option>
            </Select>
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
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">警告</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="capacity"
            label="容量"
            rules={[{ required: true, message: '请输入容量' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="totalPorts"
            label="总端口数"
            rules={[{ required: true, message: '请输入总端口数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="usedPorts"
            label="已用端口数"
            rules={[{ required: true, message: '请输入已用端口数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WiringSystem; 