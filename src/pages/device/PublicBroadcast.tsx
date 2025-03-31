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
  SoundOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface BroadcastData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  power: string;
  volume: string;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const PublicBroadcast: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟公共广播数据
  const [broadcastData] = useState<BroadcastData[]>([
    {
      id: '1',
      name: '主楼大厅广播',
      code: 'BC-001',
      type: '数字广播',
      location: '主楼1层大厅',
      status: 'normal',
      power: '100W',
      volume: '80%',
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张三',
      description: '主楼大厅公共广播系统',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '园区广场广播',
      code: 'BC-002',
      type: '数字广播',
      location: '园区中心广场',
      status: 'warning',
      power: '200W',
      volume: '60%',
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李四',
      description: '园区广场公共广播系统',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '停车场广播',
      code: 'BC-003',
      type: '数字广播',
      location: '地下停车场',
      status: 'error',
      power: '50W',
      volume: '0%',
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王五',
      description: '停车场公共广播系统',
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
      title: '功率',
      dataIndex: 'power',
      key: 'power',
    },
    {
      title: '音量',
      dataIndex: 'volume',
      key: 'volume',
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
      render: (_: any, record: BroadcastData) => (
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

  const handleEdit = (record: BroadcastData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: BroadcastData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除公共广播 ${record.name} 吗？`,
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
              title="总广播点"
              value={broadcastData.length}
              prefix={<SoundOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常广播"
              value={broadcastData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告广播"
              value={broadcastData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障广播"
              value={broadcastData.filter((item) => item.status === 'error').length}
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
            添加广播点
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={broadcastData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑广播点' : '添加广播点'}
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
              <Select.Option value="数字广播">数字广播</Select.Option>
              <Select.Option value="模拟广播">模拟广播</Select.Option>
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
            name="power"
            label="功率"
            rules={[{ required: true, message: '请选择功率' }]}
          >
            <Select>
              <Select.Option value="50W">50W</Select.Option>
              <Select.Option value="100W">100W</Select.Option>
              <Select.Option value="200W">200W</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="volume"
            label="音量"
            rules={[{ required: true, message: '请选择音量' }]}
          >
            <Select>
              <Select.Option value="0%">0%</Select.Option>
              <Select.Option value="20%">20%</Select.Option>
              <Select.Option value="40%">40%</Select.Option>
              <Select.Option value="60%">60%</Select.Option>
              <Select.Option value="80%">80%</Select.Option>
              <Select.Option value="100%">100%</Select.Option>
            </Select>
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

export default PublicBroadcast; 