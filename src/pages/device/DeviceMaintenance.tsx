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
  ToolOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface DeviceMaintenanceData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  maintenanceType: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const DeviceMaintenance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟设备维护数据
  const [maintenanceData] = useState<DeviceMaintenanceData[]>([
    {
      id: '1',
      name: '园区主配电室',
      code: 'DM-001',
      type: '电力设备',
      location: '园区配电中心',
      status: 'normal',
      lastMaintenanceTime: '2025-03-15',
      nextMaintenanceTime: '2025-05-15',
      maintainer: '张明',
      maintenanceType: '定期维护',
      description: '园区主配电室设备维护，包括变压器、开关柜、继电保护等设备的定期检查和维护。配备智能监控系统，实时监测设备运行状态。',
      createTime: '2025-03-10',
      updateTime: '2025-03-15',
    },
    {
      id: '2',
      name: '中央空调系统',
      code: 'DM-002',
      type: '暖通设备',
      location: '综合服务楼',
      status: 'warning',
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-10',
      maintainer: '李华',
      maintenanceType: '定期维护',
      description: '中央空调系统维护，包括主机、冷却塔、水泵等设备的定期检查和维护。配备温湿度监控系统，确保系统正常运行。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '3',
      name: '消防系统',
      code: 'DM-003',
      type: '消防设备',
      location: '园区全域',
      status: 'error',
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-01',
      maintainer: '王强',
      maintenanceType: '定期维护',
      description: '消防系统维护，包括消防泵、喷淋系统、烟感器等设备的定期检查和维护。配备消防监控系统，确保消防安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '4',
      name: '安防监控系统',
      code: 'DM-004',
      type: '安防设备',
      location: '园区全域',
      status: 'normal',
      lastMaintenanceTime: '2025-03-20',
      nextMaintenanceTime: '2025-05-20',
      maintainer: '赵阳',
      maintenanceType: '定期维护',
      description: '安防监控系统维护，包括摄像头、存储设备、监控平台等设备的定期检查和维护。配备智能安防系统，确保园区安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '5',
      name: '电梯系统',
      code: 'DM-005',
      type: '电梯设备',
      location: '综合服务楼',
      status: 'normal',
      lastMaintenanceTime: '2025-03-18',
      nextMaintenanceTime: '2025-05-18',
      maintainer: '刘芳',
      maintenanceType: '定期维护',
      description: '电梯系统维护，包括电梯主机、控制系统、安全装置等设备的定期检查和维护。配备电梯监控系统，确保运行安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-18',
    },
    {
      id: '6',
      name: '给排水系统',
      code: 'DM-006',
      type: '给排水设备',
      location: '园区全域',
      status: 'normal',
      lastMaintenanceTime: '2025-03-16',
      nextMaintenanceTime: '2025-05-16',
      maintainer: '陈伟',
      maintenanceType: '定期维护',
      description: '给排水系统维护，包括水泵、管道、阀门等设备的定期检查和维护。配备水质监测系统，确保供水安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-16',
    },
    {
      id: '7',
      name: '门禁系统',
      code: 'DM-007',
      type: '安防设备',
      location: '园区全域',
      status: 'warning',
      lastMaintenanceTime: '2025-03-14',
      nextMaintenanceTime: '2025-05-14',
      maintainer: '杨丽',
      maintenanceType: '定期维护',
      description: '门禁系统维护，包括读卡器、控制器、门锁等设备的定期检查和维护。配备门禁管理系统，确保出入安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-14',
    },
    {
      id: '8',
      name: '网络设备',
      code: 'DM-008',
      type: '网络设备',
      location: '数据中心',
      status: 'normal',
      lastMaintenanceTime: '2025-03-12',
      nextMaintenanceTime: '2025-05-12',
      maintainer: '周思',
      maintenanceType: '定期维护',
      description: '网络设备维护，包括交换机、路由器、防火墙等设备的定期检查和维护。配备网络监控系统，确保网络稳定。',
      createTime: '2025-03-10',
      updateTime: '2025-03-12',
    },
    {
      id: '9',
      name: '照明系统',
      code: 'DM-009',
      type: '照明设备',
      location: '园区全域',
      status: 'normal',
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-10',
      maintainer: '吴霞',
      maintenanceType: '定期维护',
      description: '照明系统维护，包括灯具、控制器、传感器等设备的定期检查和维护。配备智能照明系统，实现节能控制。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '10',
      name: '停车场系统',
      code: 'DM-010',
      type: '停车设备',
      location: '地下停车场',
      status: 'normal',
      lastMaintenanceTime: '2025-03-20',
      nextMaintenanceTime: '2025-05-08',
      maintainer: '李智',
      maintenanceType: '定期维护',
      description: '停车场系统维护，包括道闸、收费系统、监控设备等设备的定期检查和维护。配备智能停车系统，提高管理效率。',
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
      title: '上次维护时间',
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
      title: '维护类型',
      dataIndex: 'maintenanceType',
      key: 'maintenanceType',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: DeviceMaintenanceData) => (
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

  const handleEdit = (record: DeviceMaintenanceData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: DeviceMaintenanceData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除设备维护记录 ${record.name} 吗？`,
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
              title="总设备数"
              value={maintenanceData.length}
              prefix={<ToolOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常设备"
              value={maintenanceData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告设备"
              value={maintenanceData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障设备"
              value={maintenanceData.filter((item) => item.status === 'error').length}
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
            添加设备
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={maintenanceData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑设备' : '添加设备'}
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
              <Select.Option value="电力设备">电力设备</Select.Option>
              <Select.Option value="暖通设备">暖通设备</Select.Option>
              <Select.Option value="消防设备">消防设备</Select.Option>
              <Select.Option value="安防设备">安防设备</Select.Option>
              <Select.Option value="电梯设备">电梯设备</Select.Option>
              <Select.Option value="给排水设备">给排水设备</Select.Option>
              <Select.Option value="网络设备">网络设备</Select.Option>
              <Select.Option value="照明设备">照明设备</Select.Option>
              <Select.Option value="停车设备">停车设备</Select.Option>
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
            name="maintenanceType"
            label="维护类型"
            rules={[{ required: true, message: '请选择维护类型' }]}
          >
            <Select>
              <Select.Option value="定期维护">定期维护</Select.Option>
              <Select.Option value="故障维修">故障维修</Select.Option>
              <Select.Option value="预防性维护">预防性维护</Select.Option>
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

export default DeviceMaintenance; 