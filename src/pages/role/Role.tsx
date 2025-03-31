import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, message, Tree } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

interface Role {
  id: string;
  name: string;
  code: string;
  type: string;
  status: string;
  description: string;
  permissions: string[];
  createTime: string;
  updateTime: string;
}

const Role: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 权限树数据
  const permissionTreeData: DataNode[] = [
    {
      title: '系统管理',
      key: 'system',
      children: [
        {
          title: '用户管理',
          key: 'system:user',
          children: [
            { title: '查看用户', key: 'system:user:view' },
            { title: '创建用户', key: 'system:user:create' },
            { title: '编辑用户', key: 'system:user:edit' },
            { title: '删除用户', key: 'system:user:delete' },
          ],
        },
        {
          title: '角色管理',
          key: 'system:role',
          children: [
            { title: '查看角色', key: 'system:role:view' },
            { title: '创建角色', key: 'system:role:create' },
            { title: '编辑角色', key: 'system:role:edit' },
            { title: '删除角色', key: 'system:role:delete' },
          ],
        },
        {
          title: '菜单管理',
          key: 'system:menu',
          children: [
            { title: '查看菜单', key: 'system:menu:view' },
            { title: '创建菜单', key: 'system:menu:create' },
            { title: '编辑菜单', key: 'system:menu:edit' },
            { title: '删除菜单', key: 'system:menu:delete' },
          ],
        },
      ],
    },
    {
      title: '基础管理',
      key: 'basic',
      children: [
        {
          title: '组织管理',
          key: 'basic:org',
          children: [
            { title: '查看组织', key: 'basic:org:view' },
            { title: '创建组织', key: 'basic:org:create' },
            { title: '编辑组织', key: 'basic:org:edit' },
            { title: '删除组织', key: 'basic:org:delete' },
          ],
        },
        {
          title: '员工管理',
          key: 'basic:employee',
          children: [
            { title: '查看员工', key: 'basic:employee:view' },
            { title: '创建员工', key: 'basic:employee:create' },
            { title: '编辑员工', key: 'basic:employee:edit' },
            { title: '删除员工', key: 'basic:employee:delete' },
          ],
        },
      ],
    },
    {
      title: '设备管理',
      key: 'device',
      children: [
        {
          title: '设备监控',
          key: 'device:monitor',
          children: [
            { title: '查看设备', key: 'device:monitor:view' },
            { title: '控制设备', key: 'device:monitor:control' },
          ],
        },
        {
          title: '设备维护',
          key: 'device:maintenance',
          children: [
            { title: '查看维护记录', key: 'device:maintenance:view' },
            { title: '创建维护记录', key: 'device:maintenance:create' },
            { title: '编辑维护记录', key: 'device:maintenance:edit' },
            { title: '删除维护记录', key: 'device:maintenance:delete' },
          ],
        },
      ],
    },
    {
      title: '门禁管理',
      key: 'access',
      children: [
        {
          title: '门禁控制',
          key: 'access:control',
          children: [
            { title: '查看门禁', key: 'access:control:view' },
            { title: '远程开门', key: 'access:control:open' },
            { title: '远程关门', key: 'access:control:close' },
          ],
        },
        {
          title: '门禁记录',
          key: 'access:record',
          children: [
            { title: '查看记录', key: 'access:record:view' },
            { title: '导出记录', key: 'access:record:export' },
          ],
        },
      ],
    },
    {
      title: '访客管理',
      key: 'visitor',
      children: [
        {
          title: '访客预约',
          key: 'visitor:appointment',
          children: [
            { title: '查看预约', key: 'visitor:appointment:view' },
            { title: '创建预约', key: 'visitor:appointment:create' },
            { title: '审核预约', key: 'visitor:appointment:approve' },
          ],
        },
        {
          title: '访客记录',
          key: 'visitor:record',
          children: [
            { title: '查看记录', key: 'visitor:record:view' },
            { title: '导出记录', key: 'visitor:record:export' },
          ],
        },
      ],
    },
  ];

  // 模拟角色数据
  const roleData: Role[] = [
    {
      id: '1',
      name: '超级管理员',
      code: 'SUPER_ADMIN',
      type: '系统角色',
      status: 'active',
      description: '系统最高权限管理员',
      permissions: ['system', 'basic', 'device', 'access', 'visitor'],
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-01 10:00:00',
    },
    {
      id: '2',
      name: '系统管理员',
      code: 'SYS_ADMIN',
      type: '系统角色',
      status: 'active',
      description: '负责系统配置和维护',
      permissions: ['system:user:view', 'system:role:view', 'system:menu:view'],
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '3',
      name: '安保主管',
      code: 'SECURITY_MANAGER',
      type: '业务角色',
      status: 'active',
      description: '负责园区安防和门禁管理',
      permissions: ['access:control', 'access:record', 'visitor:appointment', 'visitor:record'],
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '4',
      name: '前台接待',
      code: 'RECEPTIONIST',
      type: '业务角色',
      status: 'active',
      description: '负责访客接待和预约管理',
      permissions: ['visitor:appointment:view', 'visitor:appointment:create', 'visitor:record:view'],
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '5',
      name: '人事专员',
      code: 'HR_SPECIALIST',
      type: '业务角色',
      status: 'active',
      description: '负责员工信息管理',
      permissions: ['basic:employee:view', 'basic:employee:create', 'basic:employee:edit'],
      createTime: '2024-01-05 10:00:00',
      updateTime: '2024-01-05 10:00:00',
    },
    {
      id: '6',
      name: '设备维护员',
      code: 'DEVICE_MAINTAINER',
      type: '业务角色',
      status: 'active',
      description: '负责设备维护和保养',
      permissions: ['device:monitor:view', 'device:maintenance'],
      createTime: '2024-01-06 10:00:00',
      updateTime: '2024-01-06 10:00:00',
    },
    {
      id: '7',
      name: '部门主管',
      code: 'DEPT_MANAGER',
      type: '业务角色',
      status: 'active',
      description: '部门负责人',
      permissions: ['basic:org:view', 'basic:employee:view', 'visitor:appointment:approve'],
      createTime: '2024-01-07 10:00:00',
      updateTime: '2024-01-07 10:00:00',
    },
    {
      id: '8',
      name: '普通员工',
      code: 'EMPLOYEE',
      type: '业务角色',
      status: 'active',
      description: '基础员工权限',
      permissions: ['basic:employee:view', 'visitor:appointment:create'],
      createTime: '2024-01-08 10:00:00',
      updateTime: '2024-01-08 10:00:00',
    },
    {
      id: '9',
      name: '安保人员',
      code: 'SECURITY_STAFF',
      type: '业务角色',
      status: 'active',
      description: '负责日常安保工作',
      permissions: ['access:control:view', 'access:record:view', 'visitor:record:view'],
      createTime: '2024-01-09 10:00:00',
      updateTime: '2024-01-09 10:00:00',
    },
    {
      id: '10',
      name: '访客',
      code: 'VISITOR',
      type: '其他角色',
      status: 'active',
      description: '临时访客权限',
      permissions: ['visitor:appointment:create'],
      createTime: '2024-01-10 10:00:00',
      updateTime: '2024-01-10 10:00:00',
    }
  ];

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: '角色类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
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
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Role) => (
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

  const handleEdit = (record: Role) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      permissions: record.permissions
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
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
        title="角色管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加角色
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={roleData}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑角色' : '添加角色'}
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
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="角色编码"
            rules={[{ required: true, message: '请输入角色编码' }]}
          >
            <Input placeholder="请输入角色编码" />
          </Form.Item>
          <Form.Item
            name="type"
            label="角色类型"
            rules={[{ required: true, message: '请选择角色类型' }]}
          >
            <Select placeholder="请选择角色类型">
              <Select.Option value="系统角色">系统角色</Select.Option>
              <Select.Option value="业务角色">业务角色</Select.Option>
              <Select.Option value="其他角色">其他角色</Select.Option>
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
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入角色描述" />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限配置"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Tree
              checkable
              defaultExpandAll
              treeData={permissionTreeData}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Role; 