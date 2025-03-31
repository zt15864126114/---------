import React, { useState } from 'react';
import { Layout, Tree, Card, Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

const { Sider, Content } = Layout;

interface SceneData {
  key: string;
  title: string;
  children?: SceneData[];
}

interface SceneDetail {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  description: string;
}

interface Scene {
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

const Scene: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟场景数据
  const sceneData: Scene[] = [
    {
      id: '1',
      name: '山东新高地智慧园区',
      code: 'PARK001',
      type: '园区',
      parentId: null,
      description: '山东新高地智慧园区总部基地',
      status: 'active',
      createTime: '2024-01-01 10:00:00',
      updateTime: '2024-01-01 10:00:00',
    },
    {
      id: '2',
      name: 'A区办公楼',
      code: 'BUILDING001',
      type: '建筑',
      parentId: '1',
      description: 'A区综合办公楼',
      status: 'active',
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '3',
      name: 'B区研发中心',
      code: 'BUILDING002',
      type: '建筑',
      parentId: '1',
      description: 'B区研发中心大楼',
      status: 'active',
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '4',
      name: 'C区产业园',
      code: 'BUILDING003',
      type: '建筑',
      parentId: '1',
      description: 'C区产业孵化园',
      status: 'active',
      createTime: '2024-01-02 10:00:00',
      updateTime: '2024-01-02 10:00:00',
    },
    {
      id: '5',
      name: 'A1楼层',
      code: 'FLOOR001',
      type: '楼层',
      parentId: '2',
      description: 'A区办公楼1层',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '6',
      name: 'A2楼层',
      code: 'FLOOR002',
      type: '楼层',
      parentId: '2',
      description: 'A区办公楼2层',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '7',
      name: 'A3楼层',
      code: 'FLOOR003',
      type: '楼层',
      parentId: '2',
      description: 'A区办公楼3层',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '8',
      name: 'B1实验室',
      code: 'LAB001',
      type: '实验室',
      parentId: '3',
      description: 'B区研发中心实验室1',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '9',
      name: 'B2实验室',
      code: 'LAB002',
      type: '实验室',
      parentId: '3',
      description: 'B区研发中心实验室2',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '10',
      name: 'B3会议室',
      code: 'MEETING001',
      type: '会议室',
      parentId: '3',
      description: 'B区研发中心会议室',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '11',
      name: 'C1孵化空间',
      code: 'SPACE001',
      type: '空间',
      parentId: '4',
      description: 'C区创业孵化空间1',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '12',
      name: 'C2孵化空间',
      code: 'SPACE002',
      type: '空间',
      parentId: '4',
      description: 'C区创业孵化空间2',
      status: 'active',
      createTime: '2024-01-03 10:00:00',
      updateTime: '2024-01-03 10:00:00',
    },
    {
      id: '13',
      name: 'A1-办公区',
      code: 'OFFICE001',
      type: '区域',
      parentId: '5',
      description: 'A1层综合办公区',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '14',
      name: 'A1-会议区',
      code: 'MEETING002',
      type: '区域',
      parentId: '5',
      description: 'A1层会议室区域',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '15',
      name: 'A1-休息区',
      code: 'REST001',
      type: '区域',
      parentId: '5',
      description: 'A1层员工休息区',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '16',
      name: 'A2-培训室',
      code: 'TRAIN001',
      type: '区域',
      parentId: '6',
      description: 'A2层员工培训室',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '17',
      name: 'A2-展厅',
      code: 'SHOW001',
      type: '区域',
      parentId: '6',
      description: 'A2层产品展示厅',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '18',
      name: 'A3-办公区',
      code: 'OFFICE002',
      type: '区域',
      parentId: '7',
      description: 'A3层高管办公区',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '19',
      name: 'A3-接待室',
      code: 'RECEPTION001',
      type: '区域',
      parentId: '7',
      description: 'A3层贵宾接待室',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    },
    {
      id: '20',
      name: 'B1-研发工位',
      code: 'RD001',
      type: '工位',
      parentId: '8',
      description: 'B1实验室研发工位区',
      status: 'active',
      createTime: '2024-01-04 10:00:00',
      updateTime: '2024-01-04 10:00:00',
    }
  ];

  // 构建树形数据
  const buildTreeData = (data: Scene[]): DataNode[] => {
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
      title: '上级场景',
      dataIndex: 'parentName',
      key: 'parentName',
      width: 180,
      render: (_: any, record: Scene) => {
        if (!record.parentId) return '-';
        const parent = sceneData.find(item => item.id === record.parentId);
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
      render: (_: any, record: Scene) => (
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

  const handleEdit = (record: Scene) => {
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
        <Card title="场景架构" variant="outlined">
          <Tree
            treeData={buildTreeData(sceneData)}
            onSelect={(selectedKeys) => setSelectedScene(selectedKeys[0] as string)}
            defaultExpandAll
          />
        </Card>
      </Sider>
      <Content style={{ padding: '16px' }}>
        <Card
          title="场景详情"
          variant="outlined"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              添加场景
            </Button>
          }
        >
          <Table 
            columns={columns} 
            dataSource={sceneData}
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
        title={editingId ? '编辑场景' : '添加场景'}
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
            rules={[{ required: true, message: '请输入场景名称' }]}
          >
            <Input placeholder="请输入场景名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="编码"
            rules={[{ required: true, message: '请输入场景编码' }]}
          >
            <Input placeholder="请输入场景编码" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择场景类型' }]}
          >
            <Select placeholder="请选择场景类型">
              <Select.Option value="园区">园区</Select.Option>
              <Select.Option value="建筑">建筑</Select.Option>
              <Select.Option value="楼层">楼层</Select.Option>
              <Select.Option value="实验室">实验室</Select.Option>
              <Select.Option value="会议室">会议室</Select.Option>
              <Select.Option value="空间">空间</Select.Option>
              <Select.Option value="区域">区域</Select.Option>
              <Select.Option value="工位">工位</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="parentId"
            label="上级场景"
          >
            <Select 
              placeholder="请选择上级场景"
              allowClear
            >
              {sceneData.map(scene => (
                <Select.Option key={scene.id} value={scene.id}>{scene.name}</Select.Option>
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
            rules={[{ required: true, message: '请输入场景描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入场景描述" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Scene; 