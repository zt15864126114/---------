import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface DepartmentInfoData {
  id: string;
  departmentName: string;
  departmentCode: string;
  buildingName: string;
  floor: number;
  manager: string;
  employeeCount: number;
  status: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const DepartmentInfo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟部门信息数据
  const data: DepartmentInfoData[] = [
    {
      id: '1',
      departmentName: '技术部',
      departmentCode: 'DEPT-TECH-001',
      buildingName: 'A栋',
      floor: 10,
      manager: '张三',
      employeeCount: 50,
      status: 'active',
      description: '负责技术研发',
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '2',
      departmentName: '销售部',
      departmentCode: 'DEPT-SALES-001',
      buildingName: 'B栋',
      floor: 5,
      manager: '李四',
      employeeCount: 30,
      status: 'active',
      description: '负责产品销售',
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '3',
      departmentName: '人事部',
      departmentCode: 'DEPT-HR-001',
      buildingName: 'C栋',
      floor: 3,
      manager: '王五',
      employeeCount: 15,
      status: 'active',
      description: '负责人力资源管理',
      createTime: '2025-03-20 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
  ];

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 120,
    },
    {
      title: '部门编号',
      dataIndex: 'departmentCode',
      key: 'departmentCode',
      width: 150,
    },
    {
      title: '所在楼宇',
      dataIndex: 'buildingName',
      key: 'buildingName',
      width: 100,
    },
    {
      title: '所在楼层',
      dataIndex: 'floor',
      key: 'floor',
      width: 100,
      render: (floor: number) => `${floor}层`,
    },
    {
      title: '部门主管',
      dataIndex: 'manager',
      key: 'manager',
      width: 100,
    },
    {
      title: '员工人数',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      width: 100,
      render: (count: number) => `${count}人`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '正常' : '停用'}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 150,
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
      render: (_: any, record: DepartmentInfoData) => (
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

  const handleEdit = (record: DepartmentInfoData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条部门记录吗？此操作不可恢复。',
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
              title="部门总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常部门"
              value={data.filter(item => item.status === 'active').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="员工总数"
              value={data.reduce((sum, item) => sum + item.employeeCount, 0)}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均人数"
              value={Math.round(data.reduce((sum, item) => sum + item.employeeCount, 0) / data.length)}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="部门信息管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加部门
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
        title={editingId ? '编辑部门信息' : '添加部门信息'}
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
            name="departmentName"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item
            name="departmentCode"
            label="部门编号"
            rules={[{ required: true, message: '请输入部门编号' }]}
          >
            <Input placeholder="请输入部门编号" />
          </Form.Item>
          <Form.Item
            name="buildingName"
            label="所在楼宇"
            rules={[{ required: true, message: '请选择所在楼宇' }]}
          >
            <Select placeholder="请选择所在楼宇">
              <Select.Option value="A栋">A栋</Select.Option>
              <Select.Option value="B栋">B栋</Select.Option>
              <Select.Option value="C栋">C栋</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="floor"
            label="所在楼层"
            rules={[{ required: true, message: '请输入所在楼层' }]}
          >
            <Input type="number" placeholder="请输入所在楼层" />
          </Form.Item>
          <Form.Item
            name="manager"
            label="部门主管"
            rules={[{ required: true, message: '请输入部门主管' }]}
          >
            <Input placeholder="请输入部门主管" />
          </Form.Item>
          <Form.Item
            name="employeeCount"
            label="员工人数"
            rules={[{ required: true, message: '请输入员工人数' }]}
          >
            <Input type="number" placeholder="请输入员工人数" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">正常</Select.Option>
              <Select.Option value="inactive">停用</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentInfo; 