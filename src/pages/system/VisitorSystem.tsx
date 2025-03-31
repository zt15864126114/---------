import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface Visitor {
  id: string;
  name: string;
  idType: string;
  idNumber: string;
  phone: string;
  company: string;
  purpose: string;
  host: string;
  department: string;
  visitTime: string;
  leaveTime: string;
  status: string;
  accessPoint: string;
  visitorCard: string;
}

const VisitorSystem: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟访客数据
  const visitorData: Visitor[] = [
    {
      id: '1',
      name: '张三',
      idType: '身份证',
      idNumber: '110101199001011234',
      phone: '13800138000',
      company: '科技有限公司',
      purpose: '业务洽谈',
      host: '李四',
      department: '销售部',
      visitTime: '2025-03-20 09:00:00',
      leaveTime: '2025-03-20 11:00:00',
      status: 'completed',
      accessPoint: '主入口',
      visitorCard: 'V2025032001',
    },
    {
      id: '2',
      name: '王五',
      idType: '身份证',
      idNumber: '110101199001011235',
      phone: '13800138001',
      company: '网络科技公司',
      purpose: '技术交流',
      host: '赵六',
      department: '技术部',
      visitTime: '2025-03-20 14:00:00',
      leaveTime: '2025-03-20 16:00:00',
      status: 'visiting',
      accessPoint: '主入口',
      visitorCard: 'V2025032002',
    },
    {
      id: '3',
      name: '孙七',
      idType: '护照',
      idNumber: 'E12345678',
      phone: '13800138002',
      company: '国际企业',
      purpose: '项目合作',
      host: '周八',
      department: '国际合作部',
      visitTime: '2025-03-20 10:30:00',
      leaveTime: '2025-03-20 12:30:00',
      status: 'scheduled',
      accessPoint: '主入口',
      visitorCard: 'V2025032003',
    },
  ];

  const columns = [
    {
      title: '访客姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      key: 'idType',
      width: 100,
    },
    {
      title: '证件号码',
      dataIndex: 'idNumber',
      key: 'idNumber',
      width: 180,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '来访单位',
      dataIndex: 'company',
      key: 'company',
      width: 150,
    },
    {
      title: '来访目的',
      dataIndex: 'purpose',
      key: 'purpose',
      width: 120,
    },
    {
      title: '接待人',
      dataIndex: 'host',
      key: 'host',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '来访时间',
      dataIndex: 'visitTime',
      key: 'visitTime',
      width: 180,
    },
    {
      title: '离开时间',
      dataIndex: 'leaveTime',
      key: 'leaveTime',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={
          status === 'completed' ? 'success' : 
          status === 'visiting' ? 'processing' : 
          status === 'scheduled' ? 'warning' : 
          'error'
        }>
          {status === 'completed' ? '已离开' : 
           status === 'visiting' ? '访问中' : 
           status === 'scheduled' ? '待访问' : 
           '已取消'}
        </Tag>
      ),
    },
    {
      title: '出入口',
      dataIndex: 'accessPoint',
      key: 'accessPoint',
      width: 100,
    },
    {
      title: '访客卡号',
      dataIndex: 'visitorCard',
      key: 'visitorCard',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Visitor) => (
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

  const handleEdit = (record: Visitor) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条访客记录吗？此操作不可恢复。',
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
              title="今日访客总数"
              value={visitorData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="访问中"
              value={visitorData.filter(item => item.status === 'visiting').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待访问"
              value={visitorData.filter(item => item.status === 'scheduled').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已离开"
              value={visitorData.filter(item => item.status === 'completed').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="访客管理系统"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加访客
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={visitorData}
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
        title={editingId ? '编辑访客信息' : '添加访客'}
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
            label="访客姓名"
            rules={[{ required: true, message: '请输入访客姓名' }]}
          >
            <Input placeholder="请输入访客姓名" />
          </Form.Item>
          <Form.Item
            name="idType"
            label="证件类型"
            rules={[{ required: true, message: '请选择证件类型' }]}
          >
            <Select placeholder="请选择证件类型">
              <Select.Option value="身份证">身份证</Select.Option>
              <Select.Option value="护照">护照</Select.Option>
              <Select.Option value="港澳通行证">港澳通行证</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="idNumber"
            label="证件号码"
            rules={[{ required: true, message: '请输入证件号码' }]}
          >
            <Input placeholder="请输入证件号码" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item
            name="company"
            label="来访单位"
            rules={[{ required: true, message: '请输入来访单位' }]}
          >
            <Input placeholder="请输入来访单位" />
          </Form.Item>
          <Form.Item
            name="purpose"
            label="来访目的"
            rules={[{ required: true, message: '请输入来访目的' }]}
          >
            <Input placeholder="请输入来访目的" />
          </Form.Item>
          <Form.Item
            name="host"
            label="接待人"
            rules={[{ required: true, message: '请输入接待人' }]}
          >
            <Input placeholder="请输入接待人" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input placeholder="请输入部门" />
          </Form.Item>
          <Form.Item
            name="visitTime"
            label="来访时间"
            rules={[{ required: true, message: '请选择来访时间' }]}
          >
            <Input placeholder="请输入来访时间" />
          </Form.Item>
          <Form.Item
            name="leaveTime"
            label="离开时间"
            rules={[{ required: true, message: '请选择离开时间' }]}
          >
            <Input placeholder="请输入离开时间" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="completed">已离开</Select.Option>
              <Select.Option value="visiting">访问中</Select.Option>
              <Select.Option value="scheduled">待访问</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="accessPoint"
            label="出入口"
            rules={[{ required: true, message: '请选择出入口' }]}
          >
            <Select placeholder="请选择出入口">
              <Select.Option value="主入口">主入口</Select.Option>
              <Select.Option value="侧门">侧门</Select.Option>
              <Select.Option value="后门">后门</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="visitorCard"
            label="访客卡号"
            rules={[{ required: true, message: '请输入访客卡号' }]}
          >
            <Input placeholder="请输入访客卡号" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VisitorSystem; 