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
  TeamOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface DepartmentData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  manager: string;
  employees: number;
  lastMeetingTime: string;
  nextMeetingTime: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const DepartmentInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟部门数据
  const [departmentData] = useState<DepartmentData[]>([
    {
      id: '1',
      name: '研发部',
      code: 'DEPT-001',
      type: '技术部门',
      location: '研发中心大楼15-20层',
      status: 'normal',
      manager: '张明',
      employees: 120,
      lastMeetingTime: '2024-02-15',
      nextMeetingTime: '2024-02-22',
      description: '负责园区核心技术的研发和创新，包括人工智能、物联网等前沿技术。下设算法组、系统架构组、测试组等，拥有博士10人，硕士50人，本科60人。年研发投入超过5000万元，已申请专利100余项。',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '运营部',
      code: 'DEPT-002',
      type: '运营部门',
      location: '研发中心大楼10-14层',
      status: 'warning',
      manager: '李华',
      employees: 80,
      lastMeetingTime: '2024-02-10',
      nextMeetingTime: '2024-02-17',
      description: '负责园区的日常运营管理，包括设备维护、环境管理等。下设设备组、环境组、安保组等，配备专业维护人员30人，安保人员20人，保洁人员30人。日均处理各类维护请求50余件。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '市场部',
      code: 'DEPT-003',
      type: '市场部门',
      location: '研发中心大楼5-9层',
      status: 'error',
      manager: '王强',
      employees: 60,
      lastMeetingTime: '2024-02-01',
      nextMeetingTime: '2024-02-08',
      description: '负责园区的市场推广、品牌建设和客户关系管理。下设品牌组、销售组、客服组等，年接待客户超过1000家，举办各类活动50余场，客户满意度达95%以上。',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
    {
      id: '4',
      name: '人力资源部',
      code: 'DEPT-004',
      type: '职能部门',
      location: '研发中心大楼1-4层',
      status: 'normal',
      manager: '赵阳',
      employees: 30,
      lastMeetingTime: '2024-02-20',
      nextMeetingTime: '2024-02-27',
      description: '负责园区的人才招聘、培训、绩效考核等人力资源管理工作。下设招聘组、培训组、绩效组等，年招聘新员工200余人，组织培训100余场，员工培训覆盖率100%。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '5',
      name: '财务部',
      code: 'DEPT-005',
      type: '职能部门',
      location: '研发中心大楼1-4层',
      status: 'normal',
      manager: '刘芳',
      employees: 25,
      lastMeetingTime: '2024-02-18',
      nextMeetingTime: '2024-02-25',
      description: '负责园区的财务管理、预算控制、会计核算等工作。下设会计组、预算组、审计组等，年处理各类财务事项10000余笔，预算执行率98%以上，资金周转率提升20%。',
      createTime: '2024-01-01',
      updateTime: '2024-02-18',
    },
  ]);

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '部门类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '办公位置',
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
      title: '部门主管',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '员工数量',
      dataIndex: 'employees',
      key: 'employees',
    },
    {
      title: '上次会议时间',
      dataIndex: 'lastMeetingTime',
      key: 'lastMeetingTime',
    },
    {
      title: '下次会议时间',
      dataIndex: 'nextMeetingTime',
      key: 'nextMeetingTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: DepartmentData) => (
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

  const handleEdit = (record: DepartmentData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: DepartmentData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除部门 ${record.name} 吗？`,
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
              title="总部门数"
              value={departmentData.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常部门"
              value={departmentData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告部门"
              value={departmentData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障部门"
              value={departmentData.filter((item) => item.status === 'error').length}
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
            添加部门
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={departmentData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑部门' : '添加部门'}
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
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="部门编号"
            rules={[{ required: true, message: '请输入部门编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="部门类型"
            rules={[{ required: true, message: '请选择部门类型' }]}
          >
            <Select>
              <Select.Option value="技术部门">技术部门</Select.Option>
              <Select.Option value="运营部门">运营部门</Select.Option>
              <Select.Option value="市场部门">市场部门</Select.Option>
              <Select.Option value="职能部门">职能部门</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="办公位置"
            rules={[{ required: true, message: '请输入办公位置' }]}
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
            name="manager"
            label="部门主管"
            rules={[{ required: true, message: '请输入部门主管' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="employees"
            label="员工数量"
            rules={[{ required: true, message: '请输入员工数量' }]}
          >
            <Input type="number" />
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

export default DepartmentInfo; 