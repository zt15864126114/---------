import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic, Tree } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface RoleData {
  id: string;
  roleName: string;
  roleCode: string;
  description: string;
  permissions: string[];
  status: string;
  createTime: string;
  updateTime: string;
}

const RoleManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟角色数据
  const data: RoleData[] = [
    {
      id: '1',
      roleName: '系统管理员',
      roleCode: 'ROLE-ADMIN',
      description: '系统最高权限',
      permissions: ['system:manage', 'user:manage', 'role:manage'],
      status: 'active',
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '2',
      roleName: '普通用户',
      roleCode: 'ROLE-USER',
      description: '基础功能权限',
      permissions: ['user:view'],
      status: 'active',
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '3',
      roleName: '访客',
      roleCode: 'ROLE-GUEST',
      description: '访客权限',
      permissions: ['guest:view'],
      status: 'active',
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
  ];

  // 权限树数据
  const permissionTreeData = [
    {
      title: '系统管理',
      key: 'system',
      children: [
        {
          title: '用户管理',
          key: 'system:user',
          children: [
            { title: '查看用户', key: 'system:user:view' },
            { title: '添加用户', key: 'system:user:add' },
            { title: '编辑用户', key: 'system:user:edit' },
            { title: '删除用户', key: 'system:user:delete' },
          ],
        },
        {
          title: '角色管理',
          key: 'system:role',
          children: [
            { title: '查看角色', key: 'system:role:view' },
            { title: '添加角色', key: 'system:role:add' },
            { title: '编辑角色', key: 'system:role:edit' },
            { title: '删除角色', key: 'system:role:delete' },
          ],
        },
      ],
    },
    {
      title: '设备管理',
      key: 'device',
      children: [
        {
          title: '设备列表',
          key: 'device:list',
          children: [
            { title: '查看设备', key: 'device:list:view' },
            { title: '添加设备', key: 'device:list:add' },
            { title: '编辑设备', key: 'device:list:edit' },
            { title: '删除设备', key: 'device:list:delete' },
          ],
        },
        {
          title: '设备分类',
          key: 'device:category',
          children: [
            { title: '查看分类', key: 'device:category:view' },
            { title: '添加分类', key: 'device:category:add' },
            { title: '编辑分类', key: 'device:category:edit' },
            { title: '删除分类', key: 'device:category:delete' },
          ],
        },
      ],
    },
  ];

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 150,
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '权限数量',
      dataIndex: 'permissions',
      key: 'permissions',
      width: 100,
      render: (permissions: string[]) => permissions.length,
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
      render: (_: any, record: RoleData) => (
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

  const handleEdit = (record: RoleData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个角色吗？此操作不可恢复。',
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
              title="角色总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="启用角色"
              value={data.filter(item => item.status === 'active').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="权限总数"
              value={permissionTreeData.reduce((count, item) => {
                const countPermissions = (node: any): number => {
                  if (node.children) {
                    return node.children.reduce((sum: number, child: any) => sum + countPermissions(child), 0);
                  }
                  return 1;
                };
                return count + countPermissions(item);
              }, 0)}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均权限数"
              value={Math.round(
                data.reduce((sum, item) => sum + item.permissions.length, 0) / data.length
              )}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

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
          dataSource={data}
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
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            name="roleCode"
            label="角色编码"
            rules={[{ required: true, message: '请输入角色编码' }]}
          >
            <Input placeholder="请输入角色编码" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Tree
              checkable
              treeData={permissionTreeData}
              defaultExpandAll
            />
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

export default RoleManagement; 