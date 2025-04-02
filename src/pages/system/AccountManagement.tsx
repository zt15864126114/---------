import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface AccountData {
  id: string;
  username: string;
  name: string;
  role: string;
  department: string;
  status: string;
  lastLoginTime: string;
  lastLoginIp: string;
  createTime: string;
  updateTime: string;
  description: string;
}

const AccountManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟账号数据
  const [accountData] = useState<AccountData[]>([
    {
      id: '1',
      username: 'admin',
      name: '系统管理员',
      role: '超级管理员',
      department: '信息技术部',
      status: 'active',
      lastLoginTime: '2025-03-20 14:30:00',
      lastLoginIp: '192.168.1.100',
      createTime: '2025-03-10 09:00:00',
      updateTime: '2025-03-20 14:30:00',
      description: '系统最高权限管理员，负责系统维护和权限管理。具有10年系统管理经验，精通各类操作系统和数据库管理。',
    },
    {
      id: '2',
      username: 'zhangming',
      name: '张明',
      role: '部门管理员',
      department: '研发部',
      status: 'active',
      lastLoginTime: '2025-03-20 15:45:00',
      lastLoginIp: '192.168.1.101',
      createTime: '2025-03-10 09:00:00',
      updateTime: '2025-03-20 15:45:00',
      description: '研发部负责人，负责部门日常管理和技术决策。清华大学计算机系博士，具有8年研发管理经验。',
    },
    {
      id: '3',
      username: 'lihua',
      name: '李华',
      role: '部门管理员',
      department: '运营部',
      status: 'inactive',
      lastLoginTime: '2025-03-19 16:20:00',
      lastLoginIp: '192.168.1.102',
      createTime: '2025-03-10 09:00:00',
      updateTime: '2025-03-19 16:20:00',
      description: '运营部负责人，负责园区日常运营管理。山东大学工商管理硕士，具有6年运营管理经验。',
    },
    {
      id: '4',
      username: 'wangqiang',
      name: '王强',
      role: '部门管理员',
      department: '市场部',
      status: 'active',
      lastLoginTime: '2025-03-20 10:15:00',
      lastLoginIp: '192.168.1.103',
      createTime: '2025-03-10 09:00:00',
      updateTime: '2025-03-20 10:15:00',
      description: '市场部负责人，负责市场推广和品牌建设。北京大学市场营销硕士，具有10年市场营销经验。',
    },
    {
      id: '5',
      username: 'zhaoyang',
      name: '赵阳',
      role: '部门管理员',
      department: '人力资源部',
      status: 'active',
      lastLoginTime: '2025-03-20 11:30:00',
      lastLoginIp: '192.168.1.104',
      createTime: '2025-03-10 09:00:00',
      updateTime: '2025-03-20 11:30:00',
      description: '人力资源部负责人，负责人才招聘和培训管理。中国人民大学人力资源管理硕士，具有8年HR管理经验。',
    },
    {
      id: '6',
      username: 'liufang',
      name: '刘芳',
      role: '部门管理员',
      department: '财务部',
      status: 'active',
      lastLoginTime: '2025-03-20 13:45:00',
      lastLoginIp: '192.168.1.105',
      createTime: '2025-03-10 09:00:00',
      updateTime: '2025-03-20 13:45:00',
      description: '财务部负责人，负责财务管理和预算控制。上海财经大学会计学硕士，注册会计师，具有12年财务管理经验。',
    },
    {
      id: '7',
      username: 'chenwei',
      name: '陈伟',
      role: '普通用户',
      department: '研发部',
      status: 'active',
      lastLoginTime: '2025-03-20 09:15:00',
      lastLoginIp: '192.168.1.106',
      createTime: '2025-03-15 09:00:00',
      updateTime: '2025-03-20 09:15:00',
      description: '高级软件工程师，负责核心系统开发。浙江大学计算机系硕士，具有5年开发经验，精通Java和Python。',
    },
    {
      id: '8',
      username: 'yangli',
      name: '杨丽',
      role: '普通用户',
      department: '运营部',
      status: 'locked',
      lastLoginTime: '2025-03-19 17:30:00',
      lastLoginIp: '192.168.1.107',
      createTime: '2025-03-15 09:00:00',
      updateTime: '2025-03-19 17:30:00',
      description: '设备维护工程师，负责园区设备维护。山东科技大学自动化专业本科，具有3年设备维护经验。',
    },
    {
      id: '9',
      username: 'zhousi',
      name: '周思',
      role: '普通用户',
      department: '市场部',
      status: 'active',
      lastLoginTime: '2025-03-20 16:20:00',
      lastLoginIp: '192.168.1.108',
      createTime: '2025-03-15 09:00:00',
      updateTime: '2025-03-20 16:20:00',
      description: '市场专员，负责客户关系管理。南京大学市场营销专业本科，具有4年市场工作经验。',
    },
    {
      id: '10',
      username: 'wuxia',
      name: '吴霞',
      role: '普通用户',
      department: '人力资源部',
      status: 'active',
      lastLoginTime: '2025-03-20 14:45:00',
      lastLoginIp: '192.168.1.109',
      createTime: '2025-03-15 09:00:00',
      updateTime: '2025-03-20 14:45:00',
      description: '招聘专员，负责人才招聘。武汉大学人力资源管理专业本科，具有3年招聘经验。',
    },
    {
      id: '11',
      username: 'lizhi',
      name: '李智',
      role: '普通用户',
      department: '财务部',
      status: 'active',
      lastLoginTime: '2025-03-20 15:30:00',
      lastLoginIp: '192.168.1.110',
      createTime: '2025-03-15 09:00:00',
      updateTime: '2025-03-20 15:30:00',
      description: '会计主管，负责日常会计核算。中南财经政法大学会计学本科，具有5年会计工作经验。',
    },
    {
      id: '12',
      username: 'sunyang',
      name: '孙阳',
      role: '普通用户',
      department: '研发部',
      status: 'inactive',
      lastLoginTime: '2025-03-18 16:45:00',
      lastLoginIp: '192.168.1.111',
      createTime: '2025-03-15 09:00:00',
      updateTime: '2025-03-18 16:45:00',
      description: '测试工程师，负责系统测试。西安电子科技大学软件工程专业本科，具有3年测试经验。',
    },
  ]);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 180,
    },
    {
      title: '最后登录IP',
      dataIndex: 'lastLoginIp',
      key: 'lastLoginIp',
      width: 180,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: AccountData) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: AccountData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个账号吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Success:', values);
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      message.success(editingId ? '更新成功' : '添加成功');
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="账号总数"
              value={accountData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="启用账号"
              value={accountData.filter(item => item.status === 'active').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日登录"
              value={accountData.filter(item => {
                const lastLogin = new Date(item.lastLoginTime);
                const today = new Date();
                return lastLogin.toDateString() === today.toDateString();
              }).length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="部门数量"
              value={new Set(accountData.map(item => item.department)).size}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="账号管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加账号
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={accountData}
          rowKey="id"
          scroll={{ x: 1500 }}
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑账号' : '添加账号'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="技术部">技术部</Select.Option>
              <Select.Option value="销售部">销售部</Select.Option>
              <Select.Option value="人事部">人事部</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="系统管理员">系统管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountManagement; 