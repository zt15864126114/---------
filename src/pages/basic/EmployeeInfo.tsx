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
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface EmployeeData {
  id: string;
  name: string;
  code: string;
  department: string;
  position: string;
  status: string;
  phone: string;
  email: string;
  entryDate: string;
  lastLeaveDate: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const EmployeeInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟员工数据
  const [employeeData] = useState<EmployeeData[]>([
    {
      id: '1',
      name: '张三',
      code: 'EMP-001',
      department: '技术部',
      position: '高级工程师',
      status: 'active',
      phone: '13800138000',
      email: 'zhangsan@example.com',
      entryDate: '2024-01-01',
      lastLeaveDate: '2024-02-15',
      description: '技术骨干',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '李四',
      code: 'EMP-002',
      department: '销售部',
      position: '销售经理',
      status: 'leave',
      phone: '13800138001',
      email: 'lisi@example.com',
      entryDate: '2024-01-02',
      lastLeaveDate: '2024-02-10',
      description: '销售主管',
      createTime: '2024-01-02',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '王五',
      code: 'EMP-003',
      department: '人事部',
      position: 'HR专员',
      status: 'inactive',
      phone: '13800138002',
      email: 'wangwu@example.com',
      entryDate: '2024-01-03',
      lastLeaveDate: '2024-02-01',
      description: '人事专员',
      createTime: '2024-01-03',
      updateTime: '2024-02-01',
    },
  ]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '工号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          active: { color: 'success', text: '在职' },
          leave: { color: 'warning', text: '请假' },
          inactive: { color: 'error', text: '离职' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '入职日期',
      dataIndex: 'entryDate',
      key: 'entryDate',
    },
    {
      title: '最后请假日期',
      dataIndex: 'lastLeaveDate',
      key: 'lastLeaveDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: EmployeeData) => (
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

  const handleEdit = (record: EmployeeData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: EmployeeData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除员工 ${record.name} 吗？`,
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
              title="总员工数"
              value={employeeData.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在职员工"
              value={employeeData.filter((item) => item.status === 'active').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="请假员工"
              value={employeeData.filter((item) => item.status === 'leave').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离职员工"
              value={employeeData.filter((item) => item.status === 'inactive').length}
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
            添加员工
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={employeeData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑员工' : '添加员工'}
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
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="工号"
            rules={[{ required: true, message: '请输入工号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select>
              <Select.Option value="技术部">技术部</Select.Option>
              <Select.Option value="销售部">销售部</Select.Option>
              <Select.Option value="人事部">人事部</Select.Option>
              <Select.Option value="财务部">财务部</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true, message: '请输入职位' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="active">在职</Select.Option>
              <Select.Option value="leave">请假</Select.Option>
              <Select.Option value="inactive">离职</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="entryDate"
            label="入职日期"
            rules={[{ required: true, message: '请选择入职日期' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastLeaveDate"
            label="最后请假日期"
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

export default EmployeeInfo; 