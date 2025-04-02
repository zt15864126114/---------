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
  capacity: number;
  currentUsers: number;
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
      name: '园区主无线网络',
      code: 'WN-001',
      type: 'WiFi 6',
      location: '园区全域',
      status: 'normal',
      capacity: 5000,
      currentUsers: 1200,
      lastMaintenanceTime: '2025-03-15',
      nextMaintenanceTime: '2025-05-15',
      maintainer: '张明',
      description: '园区主无线网络，采用WiFi 6技术，支持多用户MIMO和OFDMA。配备智能网络管理系统，支持自动负载均衡。覆盖面积50万平方米，支持5000个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-15',
    },
    {
      id: '2',
      name: '研发区专用网络',
      code: 'WN-002',
      type: 'WiFi 6E',
      location: '研发中心大楼',
      status: 'warning',
      capacity: 2000,
      currentUsers: 800,
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-10',
      maintainer: '李华',
      description: '研发区专用无线网络，采用WiFi 6E技术，支持6GHz频段。配备研发专用网络管理系统，支持研发数据安全传输。覆盖研发中心大楼，支持2000个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '3',
      name: '会议室无线网络',
      code: 'WN-003',
      type: 'WiFi 6',
      location: '综合服务楼会议室',
      status: 'error',
      capacity: 500,
      currentUsers: 300,
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-01',
      maintainer: '王强',
      description: '会议室专用无线网络，采用WiFi 6技术，支持高清视频会议。配备会议网络管理系统，支持会议数据加密传输。覆盖30间会议室，支持500个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '4',
      name: '访客无线网络',
      code: 'WN-004',
      type: 'WiFi 5',
      location: '园区公共区域',
      status: 'normal',
      capacity: 1000,
      currentUsers: 400,
      lastMaintenanceTime: '2025-03-20',
      nextMaintenanceTime: '2025-05-20',
      maintainer: '赵阳',
      description: '访客专用无线网络，采用WiFi 5技术，支持访客认证和限速。配备访客网络管理系统，支持访客行为监控。覆盖园区公共区域，支持1000个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '5',
      name: '物联网专用网络',
      code: 'WN-005',
      type: 'LoRa',
      location: '园区全域',
      status: 'normal',
      capacity: 10000,
      currentUsers: 5000,
      lastMaintenanceTime: '2025-03-18',
      nextMaintenanceTime: '2025-05-18',
      maintainer: '刘芳',
      description: '物联网设备专用网络，采用LoRa技术，支持低功耗广域网。配备物联网管理平台，支持设备远程管理。覆盖园区全域，支持10000个物联网设备接入。',
      createTime: '2025-03-10',
      updateTime: '2025-03-18',
    },
    {
      id: '6',
      name: '安防监控网络',
      code: 'WN-006',
      type: 'WiFi 6',
      location: '园区安防区域',
      status: 'normal',
      capacity: 200,
      currentUsers: 150,
      lastMaintenanceTime: '2025-03-16',
      nextMaintenanceTime: '2025-05-16',
      maintainer: '陈伟',
      description: '安防监控专用网络，采用WiFi 6技术，支持高清视频传输。配备安防网络管理系统，支持实时监控和智能分析。覆盖安防监控区域，支持200个监控设备接入。',
      createTime: '2025-03-10',
      updateTime: '2025-03-16',
    },
    {
      id: '7',
      name: '停车场无线网络',
      code: 'WN-007',
      type: 'WiFi 5',
      location: '地下停车场',
      status: 'warning',
      capacity: 300,
      currentUsers: 250,
      lastMaintenanceTime: '2025-03-14',
      nextMaintenanceTime: '2025-05-14',
      maintainer: '杨丽',
      description: '停车场专用无线网络，采用WiFi 5技术，支持车位引导和收费管理。配备停车场网络管理系统，支持车牌识别和自动收费。覆盖地下停车场，支持300个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-14',
    },
    {
      id: '8',
      name: '员工宿舍网络',
      code: 'WN-008',
      type: 'WiFi 6',
      location: '人才公寓',
      status: 'normal',
      capacity: 1000,
      currentUsers: 800,
      lastMaintenanceTime: '2025-03-12',
      nextMaintenanceTime: '2025-05-12',
      maintainer: '周思',
      description: '员工宿舍专用网络，采用WiFi 6技术，支持高速上网和视频娱乐。配备宿舍网络管理系统，支持流量控制和内容过滤。覆盖人才公寓，支持1000个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-12',
    },
    {
      id: '9',
      name: '餐厅无线网络',
      code: 'WN-009',
      type: 'WiFi 5',
      location: '员工餐厅',
      status: 'normal',
      capacity: 500,
      currentUsers: 300,
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-10',
      maintainer: '吴霞',
      description: '餐厅专用无线网络，采用WiFi 5技术，支持移动支付和在线点餐。配备餐厅网络管理系统，支持支付安全和流量控制。覆盖员工餐厅，支持500个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '10',
      name: '休闲区无线网络',
      code: 'WN-010',
      type: 'WiFi 5',
      location: '园区休闲区',
      status: 'normal',
      capacity: 800,
      currentUsers: 400,
      lastMaintenanceTime: '2025-03-20',
      nextMaintenanceTime: '2025-05-08',
      maintainer: '李智',
      description: '休闲区专用无线网络，采用WiFi 5技术，支持休闲娱乐和社交网络。配备休闲区网络管理系统，支持内容过滤和流量控制。覆盖园区休闲区，支持800个并发用户。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
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
      title: '当前用户数',
      dataIndex: 'currentUsers',
      key: 'currentUsers',
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
              <Select.Option value="WiFi 6E">WiFi 6E</Select.Option>
              <Select.Option value="WiFi 5">WiFi 5</Select.Option>
              <Select.Option value="LoRa">LoRa</Select.Option>
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
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="currentUsers"
            label="当前用户数"
            rules={[{ required: true, message: '请输入当前用户数' }]}
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

export default WirelessNetwork; 