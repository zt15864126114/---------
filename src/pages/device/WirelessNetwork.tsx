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
  WifiOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface WirelessData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  frequency: string;
  channel: string;
  maxConnections: number;
  currentConnections: number;
  signalStrength: string;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const WirelessNetwork: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟无线网络数据
  const [wirelessData] = useState<WirelessData[]>([
    {
      id: '1',
      name: '主楼WiFi',
      code: 'WIFI-001',
      type: 'WiFi 6',
      location: '主楼1层',
      status: 'normal',
      frequency: '5GHz',
      channel: '36',
      maxConnections: 200,
      currentConnections: 150,
      signalStrength: '强',
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张三',
      description: '主楼办公区无线网络',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '副楼WiFi',
      code: 'WIFI-002',
      type: 'WiFi 5',
      location: '副楼2层',
      status: 'warning',
      frequency: '2.4GHz',
      channel: '6',
      maxConnections: 100,
      currentConnections: 95,
      signalStrength: '中',
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李四',
      description: '副楼办公区无线网络',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '会议室WiFi',
      code: 'WIFI-003',
      type: 'WiFi 6',
      location: '会议室区域',
      status: 'error',
      frequency: '5GHz',
      channel: '44',
      maxConnections: 50,
      currentConnections: 0,
      signalStrength: '弱',
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王五',
      description: '会议室专用无线网络',
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
      title: '频段',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: '信道',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: '连接数',
      key: 'connections',
      render: (record: WirelessData) => `${record.currentConnections}/${record.maxConnections}`,
    },
    {
      title: '信号强度',
      dataIndex: 'signalStrength',
      key: 'signalStrength',
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
      render: (_: any, record: WirelessData) => (
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

  const handleEdit = (record: WirelessData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: WirelessData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除无线网络 ${record.name} 吗？`,
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
              title="总无线网络"
              value={wirelessData.length}
              prefix={<WifiOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常网络"
              value={wirelessData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告网络"
              value={wirelessData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障网络"
              value={wirelessData.filter((item) => item.status === 'error').length}
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
            添加无线网络
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={wirelessData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑无线网络' : '添加无线网络'}
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
              <Select.Option value="WiFi 6">WiFi 6</Select.Option>
              <Select.Option value="WiFi 5">WiFi 5</Select.Option>
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
            name="frequency"
            label="频段"
            rules={[{ required: true, message: '请选择频段' }]}
          >
            <Select>
              <Select.Option value="2.4GHz">2.4GHz</Select.Option>
              <Select.Option value="5GHz">5GHz</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="channel"
            label="信道"
            rules={[{ required: true, message: '请输入信道' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="maxConnections"
            label="最大连接数"
            rules={[{ required: true, message: '请输入最大连接数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="currentConnections"
            label="当前连接数"
            rules={[{ required: true, message: '请输入当前连接数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="signalStrength"
            label="信号强度"
            rules={[{ required: true, message: '请选择信号强度' }]}
          >
            <Select>
              <Select.Option value="强">强</Select.Option>
              <Select.Option value="中">中</Select.Option>
              <Select.Option value="弱">弱</Select.Option>
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

export default WirelessNetwork; 