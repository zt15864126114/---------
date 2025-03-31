import React, { useState } from 'react';
import { Layout, Tree, Card, Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const { Sider, Content } = Layout;

interface Organization {
  id: string;
  name: string;
  code: string;
  type: string;
  parentId: string | null;
  description: string;
  status: string;
  createTime: string;
  updateTime: string;
}

const Organization: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟组织数据
  const orgData: Organization[] = [
    {
      id: '1',
      name: '山东新高地智慧园区',
      code: 'HQ001',
      type: '总部',
      parentId: null,
      description: '山东新高地智慧园区总部',
      status: 'active',
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-01 10:00:00',
    },
    {
      id: '2',
      name: '技术创新中心',
      code: 'TECH001',
      type: '中心',
      parentId: '1',
      description: '负责技术研发和创新工作',
      status: 'active',
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '3',
      name: '运营管理中心',
      code: 'OPS001',
      type: '中心',
      parentId: '1',
      description: '负责园区运营和管理工作',
      status: 'active',
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '4',
      name: '产业发展中心',
      code: 'BIZ001',
      type: '中心',
      parentId: '1',
      description: '负责园区产业规划和发展',
      status: 'active',
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '5',
      name: '研发部',
      code: 'RD001',
      type: '部门',
      parentId: '2',
      description: '负责软件研发工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '6',
      name: '测试部',
      code: 'QA001',
      type: '部门',
      parentId: '2',
      description: '负责软件测试工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '7',
      name: '产品部',
      code: 'PM001',
      type: '部门',
      parentId: '2',
      description: '负责产品规划和设计',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '8',
      name: '运维部',
      code: 'OPS002',
      type: '部门',
      parentId: '3',
      description: '负责系统运维工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '9',
      name: '人力资源部',
      code: 'HR001',
      type: '部门',
      parentId: '3',
      description: '负责人员管理工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '10',
      name: '财务部',
      code: 'FIN001',
      type: '部门',
      parentId: '3',
      description: '负责财务管理工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '11',
      name: '招商部',
      code: 'BD001',
      type: '部门',
      parentId: '4',
      description: '负责园区招商引资工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '12',
      name: '产业规划部',
      code: 'PLAN001',
      type: '部门',
      parentId: '4',
      description: '负责产业发展规划工作',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '13',
      name: '前端开发组',
      code: 'FE001',
      type: '小组',
      parentId: '5',
      description: '负责前端开发工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '14',
      name: '后端开发组',
      code: 'BE001',
      type: '小组',
      parentId: '5',
      description: '负责后端开发工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '15',
      name: '移动开发组',
      code: 'MOB001',
      type: '小组',
      parentId: '5',
      description: '负责移动端开发工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '16',
      name: '功能测试组',
      code: 'QA002',
      type: '小组',
      parentId: '6',
      description: '负责功能测试工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '17',
      name: '自动化测试组',
      code: 'QA003',
      type: '小组',
      parentId: '6',
      description: '负责自动化测试工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '18',
      name: '性能测试组',
      code: 'QA004',
      type: '小组',
      parentId: '6',
      description: '负责性能测试工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '19',
      name: '产品规划组',
      code: 'PM002',
      type: '小组',
      parentId: '7',
      description: '负责产品规划工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '20',
      name: 'UI设计组',
      code: 'UI001',
      type: '小组',
      parentId: '7',
      description: '负责UI设计工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '21',
      name: '系统运维组',
      code: 'OPS003',
      type: '小组',
      parentId: '8',
      description: '负责系统运维工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '22',
      name: '网络运维组',
      code: 'OPS004',
      type: '小组',
      parentId: '8',
      description: '负责网络运维工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '23',
      name: '招聘组',
      code: 'HR002',
      type: '小组',
      parentId: '9',
      description: '负责人员招聘工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '24',
      name: '培训组',
      code: 'HR003',
      type: '小组',
      parentId: '9',
      description: '负责员工培训工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '25',
      name: '会计组',
      code: 'FIN002',
      type: '小组',
      parentId: '10',
      description: '负责会计核算工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '26',
      name: '出纳组',
      code: 'FIN003',
      type: '小组',
      parentId: '10',
      description: '负责出纳工作',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '27',
      name: '招商一组',
      code: 'BD002',
      type: '小组',
      parentId: '11',
      description: '负责互联网产业招商',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '28',
      name: '招商二组',
      code: 'BD003',
      type: '小组',
      parentId: '11',
      description: '负责智能制造产业招商',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '29',
      name: '规划一组',
      code: 'PLAN002',
      type: '小组',
      parentId: '12',
      description: '负责产业发展规划制定',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '30',
      name: '规划二组',
      code: 'PLAN003',
      type: '小组',
      parentId: '12',
      description: '负责产业政策研究',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    }
  ];

  // 构建树形数据
  const buildTreeData = (data: Organization[]): DataNode[] => {
    // 先找出所有顶级节点
    const rootNodes = data.filter(item => item.parentId === null);
    
    // 递归构建子节点
    const buildChildren = (parentId: string): DataNode[] => {
      return data
        .filter(item => item.parentId === parentId)
        .map(item => ({
          key: item.id,
          title: item.name,
          children: buildChildren(item.id)
        }));
    };

    // 构建完整的树形结构
    return rootNodes.map(root => ({
      key: root.id,
      title: root.name,
      children: buildChildren(root.id)
    }));
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '上级组织',
      dataIndex: 'parentName',
      key: 'parentName',
      width: 180,
      render: (_: any, record: Organization) => {
        if (!record.parentId) return '-';
        const parent = orgData.find(item => item.id === record.parentId);
        return parent ? parent.name : '-';
      },
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
      render: (_: any, record: Organization) => (
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

  const handleEdit = (record: Organization) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
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
    <Layout style={{ background: '#fff' }}>
      <Sider width={300} style={{ background: '#fff', padding: '16px' }}>
        <Card title="组织架构" variant="outlined">
          <Tree
            treeData={buildTreeData(orgData)}
            onSelect={(selectedKeys) => setSelectedOrg(selectedKeys[0] as string)}
            defaultExpandAll
          />
        </Card>
      </Sider>
      <Content style={{ padding: '16px' }}>
        <Card
          title="组织详情"
          variant="outlined"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              添加组织
            </Button>
          }
        >
          <Table 
            columns={columns} 
            dataSource={orgData}
            rowKey="id"
            pagination={{ 
              pageSize: 10,
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条记录`
            }}
          />
        </Card>
      </Content>

      <Modal
        title={editingId ? '编辑组织' : '添加组织'}
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
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入组织名称' }]}
          >
            <Input placeholder="请输入组织名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="编码"
            rules={[{ required: true, message: '请输入组织编码' }]}
          >
            <Input placeholder="请输入组织编码" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择组织类型' }]}
          >
            <Select placeholder="请选择组织类型">
              <Select.Option value="总部">总部</Select.Option>
              <Select.Option value="中心">中心</Select.Option>
              <Select.Option value="部门">部门</Select.Option>
              <Select.Option value="小组">小组</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parentId"
            label="上级组织"
          >
            <Select 
              placeholder="请选择上级组织"
              allowClear
            >
              {orgData.map(org => (
                <Select.Option key={org.id} value={org.id}>{org.name}</Select.Option>
              ))}
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
            rules={[{ required: true, message: '请输入组织描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入组织描述" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Organization; 