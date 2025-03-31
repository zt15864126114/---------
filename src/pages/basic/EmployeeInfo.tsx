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
  gender: string;
  phone: string;
  email: string;
  entryTime: string;
  lastAttendanceTime: string;
  nextAttendanceTime: string;
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
      name: '张明',
      code: 'EMP-001',
      department: '研发部',
      position: '技术总监',
      status: 'normal',
      gender: '男',
      phone: '13800138001',
      email: 'zhangming@example.com',
      entryTime: '2023-01-15',
      lastAttendanceTime: '2024-02-15',
      nextAttendanceTime: '2024-02-16',
      description: '负责园区核心技术的研发和创新，具有10年技术管理经验。清华大学计算机系博士，曾就职于华为、腾讯等知名企业。主导开发了园区智能管理系统，获得多项发明专利。',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '李华',
      code: 'EMP-002',
      department: '运营部',
      position: '运营经理',
      status: 'warning',
      gender: '女',
      phone: '13800138002',
      email: 'lihua@example.com',
      entryTime: '2023-02-20',
      lastAttendanceTime: '2024-02-10',
      nextAttendanceTime: '2024-02-11',
      description: '负责园区的日常运营管理，具有8年运营管理经验。山东大学工商管理硕士，曾就职于万科、保利等知名企业。建立了完善的园区运营管理体系，提升了运营效率30%。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '王强',
      code: 'EMP-003',
      department: '市场部',
      position: '市场总监',
      status: 'error',
      gender: '男',
      phone: '13800138003',
      email: 'wangqiang@example.com',
      entryTime: '2023-03-10',
      lastAttendanceTime: '2024-02-01',
      nextAttendanceTime: '2024-02-02',
      description: '负责园区的市场推广和品牌建设，具有12年市场营销经验。北京大学市场营销硕士，曾就职于阿里巴巴、京东等知名企业。带领团队年销售额突破10亿元，客户满意度达98%。',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
    {
      id: '4',
      name: '赵阳',
      code: 'EMP-004',
      department: '人力资源部',
      position: 'HR经理',
      status: 'normal',
      gender: '女',
      phone: '13800138004',
      email: 'zhaoyang@example.com',
      entryTime: '2023-04-05',
      lastAttendanceTime: '2024-02-20',
      nextAttendanceTime: '2024-02-21',
      description: '负责园区的人才招聘和培训管理，具有6年人力资源管理经验。中国人民大学人力资源管理硕士，曾就职于字节跳动、美团等知名企业。建立了完善的人才培养体系，员工留存率提升20%。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '5',
      name: '刘芳',
      code: 'EMP-005',
      department: '财务部',
      position: '财务总监',
      status: 'normal',
      gender: '女',
      phone: '13800138005',
      email: 'liufang@example.com',
      entryTime: '2023-05-15',
      lastAttendanceTime: '2024-02-18',
      nextAttendanceTime: '2024-02-19',
      description: '负责园区的财务管理和预算控制，具有15年财务管理经验。上海财经大学会计学硕士，注册会计师，曾就职于普华永道、德勤等知名企业。建立了科学的财务管理体系，年节省成本1000万元。',
      createTime: '2024-01-01',
      updateTime: '2024-02-18',
    },
  ]);

  const columns = [
    {
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '员工编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '所属部门',
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
          normal: { color: 'success', text: '正常' },
          warning: { color: 'warning', text: '警告' },
          error: { color: 'error', text: '故障' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
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
      title: '入职时间',
      dataIndex: 'entryTime',
      key: 'entryTime',
    },
    {
      title: '上次考勤时间',
      dataIndex: 'lastAttendanceTime',
      key: 'lastAttendanceTime',
    },
    {
      title: '下次考勤时间',
      dataIndex: 'nextAttendanceTime',
      key: 'nextAttendanceTime',
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
              title="正常员工"
              value={employeeData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告员工"
              value={employeeData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障员工"
              value={employeeData.filter((item) => item.status === 'error').length}
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
            label="员工姓名"
            rules={[{ required: true, message: '请输入员工姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="员工编号"
            rules={[{ required: true, message: '请输入员工编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="所属部门"
            rules={[{ required: true, message: '请选择所属部门' }]}
          >
            <Select>
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="运营部">运营部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="人力资源部">人力资源部</Select.Option>
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
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">警告</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
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
            name="entryTime"
            label="入职时间"
            rules={[{ required: true, message: '请选择入职时间' }]}
          >
            <Input type="date" />
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