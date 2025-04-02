import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

interface Visitor {
  id: string;
  name: string;
  phone: string;
  idCard: string;
  company: string;
  visitee: string;
  visitPurpose: string;
  visitTime: string;
  leaveTime: string;
  status: string;
  createTime: string;
  updateTime: string;
}

const Visitor: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟访客数据
  const visitorData: Visitor[] = [
    {
      id: '1',
      name: '张明',
      phone: '13812345678',
      idCard: '110101199001011234',
      company: '北京科技有限公司',
      visitee: '李工程师',
      visitPurpose: '业务洽谈',
      visitTime: '2025-03-20 09:00:00',
      leaveTime: '2025-03-20 11:00:00',
      status: 'completed',
      createTime: '2025-03-19 16:00:00',
      updateTime: '2025-03-20 11:00:00',
    },
    {
      id: '2',
      name: '王强',
      phone: '13912345678',
      idCard: '110101199002021234',
      company: '上海信息技术有限公司',
      visitee: '陈经理',
      visitPurpose: '项目合作',
      visitTime: '2025-03-20 10:00:00',
      leaveTime: '',
      status: 'in_progress',
      createTime: '2025-03-19 17:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '3',
      name: '刘伟',
      phone: '13712345678',
      idCard: '110101199003031234',
      company: '广州智能科技有限公司',
      visitee: '赵主管',
      visitPurpose: '设备维护',
      visitTime: '2025-03-20 13:00:00',
      leaveTime: '',
      status: 'pending',
      createTime: '2025-03-19 18:00:00',
      updateTime: '2025-03-19 18:00:00',
    },
    {
      id: '4',
      name: '周丽',
      phone: '13612345678',
      idCard: '110101199004041234',
      company: '深圳电子有限公司',
      visitee: '吴经理',
      visitPurpose: '产品展示',
      visitTime: '2025-03-20 14:00:00',
      leaveTime: '',
      status: 'pending',
      createTime: '2025-03-19 19:00:00',
      updateTime: '2025-03-19 19:00:00',
    },
    {
      id: '5',
      name: '陈静',
      phone: '13512345678',
      idCard: '110101199005051234',
      company: '杭州软件有限公司',
      visitee: '郑工程师',
      visitPurpose: '技术交流',
      visitTime: '2025-03-20 15:00:00',
      leaveTime: '',
      status: 'pending',
      createTime: '2025-03-19 20:00:00',
      updateTime: '2025-03-19 20:00:00',
    },
    {
      id: '6',
      name: '李明',
      phone: '13412345678',
      idCard: '110101199006061234',
      company: '天津机械有限公司',
      visitee: '孙主管',
      visitPurpose: '设备检修',
      visitTime: '2025-03-20 09:30:00',
      leaveTime: '2025-03-20 10:30:00',
      status: 'completed',
      createTime: '2025-03-19 15:00:00',
      updateTime: '2025-03-20 10:30:00',
    },
    {
      id: '7',
      name: '赵芳',
      phone: '13312345678',
      idCard: '110101199007071234',
      company: '重庆建设有限公司',
      visitee: '钱经理',
      visitPurpose: '工程验收',
      visitTime: '2025-03-20 10:30:00',
      leaveTime: '',
      status: 'in_progress',
      createTime: '2025-03-19 16:30:00',
      updateTime: '2025-03-20 10:30:00',
    },
    {
      id: '8',
      name: '吴强',
      phone: '13212345678',
      idCard: '110101199008081234',
      company: '武汉科技有限公司',
      visitee: '周工程师',
      visitPurpose: '设备调试',
      visitTime: '2025-03-20 11:00:00',
      leaveTime: '',
      status: 'in_progress',
      createTime: '2025-03-19 17:30:00',
      updateTime: '2025-03-20 11:00:00',
    }
  ];

  const columns = [
    {
      title: '访客姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
      width: 180,
    },
    {
      title: '所属公司',
      dataIndex: 'company',
      key: 'company',
      width: 200,
    },
    {
      title: '被访人',
      dataIndex: 'visitee',
      key: 'visitee',
      width: 100,
    },
    {
      title: '来访目的',
      dataIndex: 'visitPurpose',
      key: 'visitPurpose',
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
      render: (status: string) => {
        let color = 'blue';
        let text = '待审核';
        if (status === 'in_progress') {
          color = 'green';
          text = '在访';
        } else if (status === 'completed') {
          color = 'gray';
          text = '已结束';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: Visitor) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button type="link" icon={<CheckOutlined />} onClick={() => handleApprove(record.id)}>
                审核通过
              </Button>
              <Button type="link" danger icon={<CloseOutlined />} onClick={() => handleReject(record.id)}>
                拒绝
              </Button>
            </>
          )}
          {record.status === 'in_progress' && (
            <Button type="link" icon={<CheckOutlined />} onClick={() => handleComplete(record.id)}>
              结束访问
            </Button>
          )}
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

  const handleApprove = (id: string) => {
    message.success('审核通过');
  };

  const handleReject = (id: string) => {
    Modal.confirm({
      title: '确认拒绝',
      content: '确定要拒绝这个访客申请吗？',
      onOk() {
        message.success('已拒绝');
      },
    });
  };

  const handleComplete = (id: string) => {
    Modal.confirm({
      title: '确认结束访问',
      content: '确定要结束这个访客的访问吗？',
      onOk() {
        message.success('访问已结束');
      },
    });
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
              title="待审核"
              value={visitorData.filter(item => item.status === 'pending').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在访"
              value={visitorData.filter(item => item.status === 'in_progress').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已结束"
              value={visitorData.filter(item => item.status === 'completed').length}
              valueStyle={{ color: '#595959' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总访客数"
              value={visitorData.length}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="访客管理"
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
          scroll={{ x: 1800 }}
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑访客' : '添加访客'}
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
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item
            name="idCard"
            label="身份证号"
            rules={[{ required: true, message: '请输入身份证号' }]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item
            name="company"
            label="所属公司"
            rules={[{ required: true, message: '请输入所属公司' }]}
          >
            <Input placeholder="请输入所属公司" />
          </Form.Item>
          <Form.Item
            name="visitee"
            label="被访人"
            rules={[{ required: true, message: '请输入被访人' }]}
          >
            <Input placeholder="请输入被访人" />
          </Form.Item>
          <Form.Item
            name="visitPurpose"
            label="来访目的"
            rules={[{ required: true, message: '请选择来访目的' }]}
          >
            <Select placeholder="请选择来访目的">
              <Select.Option value="业务洽谈">业务洽谈</Select.Option>
              <Select.Option value="项目合作">项目合作</Select.Option>
              <Select.Option value="设备维护">设备维护</Select.Option>
              <Select.Option value="产品展示">产品展示</Select.Option>
              <Select.Option value="技术交流">技术交流</Select.Option>
              <Select.Option value="设备检修">设备检修</Select.Option>
              <Select.Option value="工程验收">工程验收</Select.Option>
              <Select.Option value="设备调试">设备调试</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="visitTime"
            label="来访时间"
            rules={[{ required: true, message: '请选择来访时间' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="leaveTime"
            label="离开时间"
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="pending">待审核</Select.Option>
              <Select.Option value="in_progress">在访</Select.Option>
              <Select.Option value="completed">已结束</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Visitor; 