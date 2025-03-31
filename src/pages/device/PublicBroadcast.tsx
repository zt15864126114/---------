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

interface PublicBroadcastData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  power: number;
  coverage: string;
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
  const [broadcastData] = useState<PublicBroadcastData[]>([
    {
      id: '1',
      name: '园区主广播系统',
      code: 'PB-001',
      type: '数字广播系统',
      location: '园区全域',
      status: 'normal',
      power: 1000,
      coverage: '50万平方米',
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张明',
      description: '园区主广播系统，采用数字广播技术，支持分区广播和紧急广播。配备智能广播管理系统，支持定时广播和远程控制。覆盖面积50万平方米，支持多区域独立控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '研发区广播系统',
      code: 'PB-002',
      type: '智能广播系统',
      location: '研发中心大楼',
      status: 'warning',
      power: 500,
      coverage: '20万平方米',
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李华',
      description: '研发区智能广播系统，采用智能广播技术，支持语音识别和自动广播。配备研发区专用广播系统，支持研发通知和紧急疏散。覆盖研发中心大楼，支持多楼层独立控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '会议室广播系统',
      code: 'PB-003',
      type: '会议广播系统',
      location: '综合服务楼会议室',
      status: 'error',
      power: 200,
      coverage: '5万平方米',
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王强',
      description: '会议室广播系统，采用会议广播技术，支持会议扩声和远程会议。配备会议管理系统，支持会议通知和紧急疏散。覆盖30间会议室，支持独立控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
    {
      id: '4',
      name: '餐厅广播系统',
      code: 'PB-004',
      type: '背景音乐系统',
      location: '员工餐厅',
      status: 'normal',
      power: 300,
      coverage: '10万平方米',
      lastMaintenanceTime: '2024-02-20',
      nextMaintenanceTime: '2024-05-20',
      maintainer: '赵阳',
      description: '餐厅广播系统，采用背景音乐技术，支持音乐播放和通知广播。配备餐厅管理系统，支持就餐通知和紧急疏散。覆盖员工餐厅，支持分区控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '5',
      name: '宿舍区广播系统',
      code: 'PB-005',
      type: '智能广播系统',
      location: '人才公寓',
      status: 'normal',
      power: 400,
      coverage: '15万平方米',
      lastMaintenanceTime: '2024-02-18',
      nextMaintenanceTime: '2024-05-18',
      maintainer: '刘芳',
      description: '宿舍区广播系统，采用智能广播技术，支持定时广播和紧急通知。配备宿舍管理系统，支持生活通知和紧急疏散。覆盖人才公寓，支持多楼层独立控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-18',
    },
    {
      id: '6',
      name: '休闲区广播系统',
      code: 'PB-006',
      type: '背景音乐系统',
      location: '园区休闲区',
      status: 'normal',
      power: 300,
      coverage: '8万平方米',
      lastMaintenanceTime: '2024-02-16',
      nextMaintenanceTime: '2024-05-16',
      maintainer: '陈伟',
      description: '休闲区广播系统，采用背景音乐技术，支持音乐播放和环境营造。配备休闲区管理系统，支持活动通知和紧急疏散。覆盖园区休闲区，支持分区控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-16',
    },
    {
      id: '7',
      name: '停车场广播系统',
      code: 'PB-007',
      type: '紧急广播系统',
      location: '地下停车场',
      status: 'warning',
      power: 200,
      coverage: '12万平方米',
      lastMaintenanceTime: '2024-02-14',
      nextMaintenanceTime: '2024-05-14',
      maintainer: '杨丽',
      description: '停车场广播系统，采用紧急广播技术，支持车辆引导和紧急疏散。配备停车场管理系统，支持车位引导和紧急通知。覆盖地下停车场，支持分区控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-14',
    },
    {
      id: '8',
      name: '实验室广播系统',
      code: 'PB-008',
      type: '智能广播系统',
      location: '研发实验室',
      status: 'normal',
      power: 300,
      coverage: '10万平方米',
      lastMaintenanceTime: '2024-02-12',
      nextMaintenanceTime: '2024-05-12',
      maintainer: '周思',
      description: '实验室广播系统，采用智能广播技术，支持实验通知和安全预警。配备实验室管理系统，支持实验通知和紧急疏散。覆盖研发实验室，支持独立控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-12',
    },
    {
      id: '9',
      name: '数据中心广播系统',
      code: 'PB-009',
      type: '紧急广播系统',
      location: '数据中心机房',
      status: 'normal',
      power: 200,
      coverage: '5万平方米',
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '吴霞',
      description: '数据中心广播系统，采用紧急广播技术，支持设备预警和紧急疏散。配备数据中心管理系统，支持设备预警和紧急通知。覆盖数据中心机房，支持独立控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '10',
      name: '园区周界广播系统',
      code: 'PB-010',
      type: '数字广播系统',
      location: '园区周界',
      status: 'normal',
      power: 800,
      coverage: '30万平方米',
      lastMaintenanceTime: '2024-02-08',
      nextMaintenanceTime: '2024-05-08',
      maintainer: '李智',
      description: '园区周界广播系统，采用数字广播技术，支持安防预警和紧急通知。配备安防管理系统，支持入侵预警和紧急疏散。覆盖园区周界，支持分区控制。',
      createTime: '2024-01-01',
      updateTime: '2024-02-08',
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
      render: (power: number) => `${power}W`,
    },
    {
      title: '覆盖范围',
      dataIndex: 'coverage',
      key: 'coverage',
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
      render: (_: any, record: PublicBroadcastData) => (
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

  const handleEdit = (record: PublicBroadcastData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: PublicBroadcastData) => {
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
              <Select.Option value="数字广播系统">数字广播系统</Select.Option>
              <Select.Option value="智能广播系统">智能广播系统</Select.Option>
              <Select.Option value="会议广播系统">会议广播系统</Select.Option>
              <Select.Option value="背景音乐系统">背景音乐系统</Select.Option>
              <Select.Option value="紧急广播系统">紧急广播系统</Select.Option>
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
            rules={[{ required: true, message: '请输入功率' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="coverage"
            label="覆盖范围"
            rules={[{ required: true, message: '请输入覆盖范围' }]}
          >
            <Input />
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