import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';

interface Account {
  id: string;
  username: string;
  realName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: string;
  lastLoginTime: string;
  createTime: string;
}

const Account: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟账号数据
  const accountData: Account[] = [
    {
      id: '1',
      username: 'admin',
      realName: '系统管理员',
      email: 'admin@sdxgzq.com',
      phone: '13800138001',
      department: '信息技术部',
      role: '超级管理员',
      status: 'active',
      lastLoginTime: '2025-03-20 09:30:00',
      createTime: '2025-03-10 00:00:00',
    },
    {
      id: '2',
      username: 'zhangwei',
      realName: '张伟',
      email: 'zhangwei@sdxgzq.com',
      phone: '13800138002',
      department: '信息技术部',
      role: '系统管理员',
      status: 'active',
      lastLoginTime: '2025-03-20 08:45:00',
      createTime: '2025-03-02 00:00:00',
    },
    {
      id: '3',
      username: 'liqiang',
      realName: '李强',
      email: 'liqiang@sdxgzq.com',
      phone: '13800138003',
      department: '安保部',
      role: '安保主管',
      status: 'active',
      lastLoginTime: '2025-03-20 08:00:00',
      createTime: '2025-03-03 00:00:00',
    },
    {
      id: '4',
      username: 'wangxia',
      realName: '王霞',
      email: 'wangxia@sdxgzq.com',
      phone: '13800138004',
      department: '前台',
      role: '前台接待',
      status: 'active',
      lastLoginTime: '2025-03-20 09:00:00',
      createTime: '2025-03-04 00:00:00',
    },
    {
      id: '5',
      username: 'liuyan',
      realName: '刘燕',
      email: 'liuyan@sdxgzq.com',
      phone: '13800138005',
      department: '人力资源部',
      role: '人事专员',
      status: 'active',
      lastLoginTime: '2025-03-20 08:30:00',
      createTime: '2025-03-05 00:00:00',
    },
    {
      id: '6',
      username: 'chengang',
      realName: '陈刚',
      email: 'chengang@sdxgzq.com',
      phone: '13800138006',
      department: '设备部',
      role: '设备维护员',
      status: 'active',
      lastLoginTime: '2025-03-20 07:30:00',
      createTime: '2025-03-06 00:00:00',
    },
    {
      id: '7',
      username: 'zhaoming',
      realName: '赵明',
      email: 'zhaoming@sdxgzq.com',
      phone: '13800138007',
      department: '研发部',
      role: '部门主管',
      status: 'active',
      lastLoginTime: '2025-03-20 09:15:00',
      createTime: '2025-03-07 00:00:00',
    },
    {
      id: '8',
      username: 'wangjing',
      realName: '王静',
      email: 'wangjing@sdxgzq.com',
      phone: '13800138008',
      department: '研发部',
      role: '普通员工',
      status: 'active',
      lastLoginTime: '2025-03-20 08:50:00',
      createTime: '2025-03-20 00:00:00',
    },
    {
      id: '9',
      username: 'lihong',
      realName: '李红',
      email: 'lihong@sdxgzq.com',
      phone: '13800138009',
      department: '安保部',
      role: '安保人员',
      status: 'active',
      lastLoginTime: '2025-03-20 07:00:00',
      createTime: '2025-03-09 00:00:00',
    },
    {
      id: '10',
      username: 'zhangmin',
      realName: '张敏',
      email: 'zhangmin@sdxgzq.com',
      phone: '13800138010',
      department: '市场部',
      role: '部门主管',
      status: 'active',
      lastLoginTime: '2025-03-20 09:20:00',
      createTime: '2025-03-10 00:00:00',
    },
    {
      id: '11',
      username: 'wangfei',
      realName: '王飞',
      email: 'wangfei@sdxgzq.com',
      phone: '13800138011',
      department: '财务部',
      role: '部门主管',
      status: 'inactive',
      lastLoginTime: '2025-03-19 17:30:00',
      createTime: '2025-03-11 00:00:00',
    },
    {
      id: '12',
      username: 'liuwei',
      realName: '刘伟',
      email: 'liuwei@sdxgzq.com',
      phone: '13800138012',
      department: '设备部',
      role: '设备维护员',
      status: 'active',
      lastLoginTime: '2025-03-20 08:20:00',
      createTime: '2025-03-12 00:00:00',
    },
    {
      id: '13',
      username: 'chenxin',
      realName: '陈新',
      email: 'chenxin@sdxgzq.com',
      phone: '13800138013',
      department: '安保部',
      role: '安保人员',
      status: 'active',
      lastLoginTime: '2025-03-20 07:15:00',
      createTime: '2025-03-13 00:00:00',
    },
    {
      id: '14',
      username: 'zhangli',
      realName: '张丽',
      email: 'zhangli@sdxgzq.com',
      phone: '13800138014',
      department: '前台',
      role: '前台接待',
      status: 'active',
      lastLoginTime: '2025-03-20 08:55:00',
      createTime: '2025-03-14 00:00:00',
    },
    {
      id: '15',
      username: 'wangping',
      realName: '王平',
      email: 'wangping@sdxgzq.com',
      phone: '13800138015',
      department: '人力资源部',
      role: '人事专员',
      status: 'active',
      lastLoginTime: '2025-03-20 09:10:00',
      createTime: '2025-03-15 00:00:00',
    }
  ];

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 150,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? '启用' : '禁用'}
        </span>
      ),
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Account) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" icon={<LockOutlined />} onClick={() => handleResetPassword(record.id)}>
            重置密码
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Account) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleResetPassword = (id: string) => {
    Modal.confirm({
      title: '确认重置密码',
      content: '确定要重置该用户的密码吗？重置后的密码将发送至用户邮箱。',
      onOk() {
        message.success('密码重置成功，新密码已发送至用户邮箱');
      },
    });
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
        width={600}
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
            name="realName"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="信息技术部">信息技术部</Select.Option>
              <Select.Option value="人力资源部">人力资源部</Select.Option>
              <Select.Option value="财务部">财务部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="设备部">设备部</Select.Option>
              <Select.Option value="安保部">安保部</Select.Option>
              <Select.Option value="前台">前台</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Select.Option value="超级管理员">超级管理员</Select.Option>
              <Select.Option value="系统管理员">系统管理员</Select.Option>
              <Select.Option value="部门主管">部门主管</Select.Option>
              <Select.Option value="人事专员">人事专员</Select.Option>
              <Select.Option value="安保主管">安保主管</Select.Option>
              <Select.Option value="安保人员">安保人员</Select.Option>
              <Select.Option value="前台接待">前台接待</Select.Option>
              <Select.Option value="设备维护员">设备维护员</Select.Option>
              <Select.Option value="普通员工">普通员工</Select.Option>
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

export default Account; 