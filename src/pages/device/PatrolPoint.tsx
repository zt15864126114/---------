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
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface PatrolPointData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  frequency: string;
  lastPatrolTime: string;
  nextPatrolTime: string;
  patroler: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const PatrolPoint: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟巡更点位数据
  const [patrolData] = useState<PatrolPointData[]>([
    {
      id: '1',
      name: '园区主入口',
      code: 'PP-001',
      type: '重点区域',
      location: '园区南门',
      status: 'normal',
      frequency: '每小时',
      lastPatrolTime: '2025-03-20 15:00',
      nextPatrolTime: '2025-03-20 16:00',
      patroler: '张明',
      description: '园区主入口巡更点，负责监控人员进出、车辆通行和周边环境安全。配备高清监控和门禁系统，24小时值守。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '2',
      name: '研发中心',
      code: 'PP-002',
      type: '重点区域',
      location: '研发大楼',
      status: 'warning',
      frequency: '每2小时',
      lastPatrolTime: '2025-03-20 14:30',
      nextPatrolTime: '2025-03-20 16:30',
      patroler: '李华',
      description: '研发中心巡更点，负责监控研发区域安全、设备运行和人员出入。配备实验室安全监控系统，确保研发环境安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '3',
      name: '数据中心',
      code: 'PP-003',
      type: '重点区域',
      location: '数据中心机房',
      status: 'error',
      frequency: '每30分钟',
      lastPatrolTime: '2025-03-20 14:45',
      nextPatrolTime: '2025-03-20 15:15',
      patroler: '王强',
      description: '数据中心巡更点，负责监控机房设备运行、温湿度和消防安全。配备环境监控系统，确保数据中心安全运行。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '4',
      name: '停车场',
      code: 'PP-004',
      type: '一般区域',
      location: '地下停车场',
      status: 'normal',
      frequency: '每3小时',
      lastPatrolTime: '2025-03-20 14:00',
      nextPatrolTime: '2025-03-20 17:00',
      patroler: '赵阳',
      description: '停车场巡更点，负责监控车辆停放、照明和消防设施。配备车位引导系统和消防监控系统，确保停车场安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '5',
      name: '员工餐厅',
      code: 'PP-005',
      type: '一般区域',
      location: '综合服务楼',
      status: 'normal',
      frequency: '每4小时',
      lastPatrolTime: '2025-03-20 13:00',
      nextPatrolTime: '2025-03-20 17:00',
      patroler: '刘芳',
      description: '员工餐厅巡更点，负责监控食品安全、环境卫生和消防设施。配备食品安全监控系统，确保就餐环境安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '6',
      name: '人才公寓',
      code: 'PP-006',
      type: '重点区域',
      location: '宿舍区',
      status: 'normal',
      frequency: '每2小时',
      lastPatrolTime: '2025-03-20 14:00',
      nextPatrolTime: '2025-03-20 16:00',
      patroler: '陈伟',
      description: '人才公寓巡更点，负责监控人员出入、消防安全和环境卫生。配备门禁系统和消防监控系统，确保居住安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '7',
      name: '园区周界',
      code: 'PP-007',
      type: '重点区域',
      location: '园区边界',
      status: 'warning',
      frequency: '每小时',
      lastPatrolTime: '2025-03-20 14:30',
      nextPatrolTime: '2025-03-20 15:30',
      patroler: '杨丽',
      description: '园区周界巡更点，负责监控园区边界安全、围栏状态和周边环境。配备红外监控系统，确保园区边界安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '8',
      name: '实验室区域',
      code: 'PP-008',
      type: '重点区域',
      location: '研发实验室',
      status: 'normal',
      frequency: '每2小时',
      lastPatrolTime: '2025-03-20 14:00',
      nextPatrolTime: '2025-03-20 16:00',
      patroler: '周思',
      description: '实验室区域巡更点，负责监控实验安全、设备运行和危险品管理。配备实验室安全监控系统，确保实验安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '9',
      name: '休闲区域',
      code: 'PP-009',
      type: '一般区域',
      location: '园区休闲区',
      status: 'normal',
      frequency: '每4小时',
      lastPatrolTime: '2025-03-20 13:00',
      nextPatrolTime: '2025-03-20 17:00',
      patroler: '吴霞',
      description: '休闲区域巡更点，负责监控环境安全、设施完好和人员活动。配备环境监控系统，确保休闲环境安全。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '10',
      name: '会议室区域',
      code: 'PP-010',
      type: '一般区域',
      location: '综合服务楼',
      status: 'normal',
      frequency: '每3小时',
      lastPatrolTime: '2025-03-20 14:00',
      nextPatrolTime: '2025-03-20 17:00',
      patroler: '李智',
      description: '会议室区域巡更点，负责监控设备运行、消防安全和环境卫生。配备会议系统监控，确保会议环境安全。',
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
      title: '巡更频率',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: '上次巡更时间',
      dataIndex: 'lastPatrolTime',
      key: 'lastPatrolTime',
    },
    {
      title: '下次巡更时间',
      dataIndex: 'nextPatrolTime',
      key: 'nextPatrolTime',
    },
    {
      title: '巡更人员',
      dataIndex: 'patroler',
      key: 'patroler',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PatrolPointData) => (
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

  const handleEdit = (record: PatrolPointData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: PatrolPointData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除巡更点位 ${record.name} 吗？`,
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
              title="总巡更点"
              value={patrolData.length}
              prefix={<SafetyCertificateOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常巡更点"
              value={patrolData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告巡更点"
              value={patrolData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障巡更点"
              value={patrolData.filter((item) => item.status === 'error').length}
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
            添加巡更点
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={patrolData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑巡更点' : '添加巡更点'}
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
              <Select.Option value="重点区域">重点区域</Select.Option>
              <Select.Option value="一般区域">一般区域</Select.Option>
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
            label="巡更频率"
            rules={[{ required: true, message: '请选择巡更频率' }]}
          >
            <Select>
              <Select.Option value="每30分钟">每30分钟</Select.Option>
              <Select.Option value="每小时">每小时</Select.Option>
              <Select.Option value="每2小时">每2小时</Select.Option>
              <Select.Option value="每3小时">每3小时</Select.Option>
              <Select.Option value="每4小时">每4小时</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="patroler"
            label="巡更人员"
            rules={[{ required: true, message: '请输入巡更人员' }]}
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

export default PatrolPoint; 