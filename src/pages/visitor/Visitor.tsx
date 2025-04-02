import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, DatePicker, Select, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Visitor {
  id: string;
  name: string;
  phone: string;
  company: string;
  licensePlate: string;
  purpose: string;
  host: string;
  visitTime: [string, string];
  status: 'pending' | 'approved' | 'rejected';
  approvalTime?: string;
}

const Visitor: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟访客数据
  const visitorData: Visitor[] = [
    {
      id: '1',
      name: '王五',
      phone: '13800138002',
      company: '科技有限公司',
      licensePlate: '鲁A12345',
      purpose: '商务洽谈',
      host: '李明华',
      visitTime: ['2025-03-20 09:00:00', '2025-03-20 17:00:00'],
      status: 'approved',
      approvalTime: '2025-03-19 14:30:00'
    },
    {
      id: '2',
      name: '赵六',
      phone: '13800138003',
      company: '网络科技公司',
      licensePlate: '鲁B67890',
      purpose: '项目对接',
      host: '王柳',
      visitTime: ['2025-03-21 10:00:00', '2025-03-21 16:00:00'],
      status: 'pending'
    }
  ];

  const columns = [
    {
      title: '访客姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '访客公司',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '车牌号',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: '访问事由',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '受访人',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: '拜访时间',
      dataIndex: 'visitTime',
      key: 'visitTime',
      render: (time: [string, string]) => (
        <span>{time[0]} 至 {time[1]}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { color: 'orange', text: '待审核' },
          approved: { color: 'green', text: '已授权' },
          rejected: { color: 'red', text: '已拒绝' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '授权时间',
      dataIndex: 'approvalTime',
      key: 'approvalTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Visitor) => (
        <Space size="middle">
          {record.status === 'approved' && (
            <Button type="link" icon={<SyncOutlined />} onClick={() => handleSync(record.id)}>
              同步
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
    form.setFieldsValue({
      ...record,
      visitTime: [dayjs(record.visitTime[0]), dayjs(record.visitTime[1])]
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该访客信息吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleSync = (id: string) => {
    message.success('同步成功');
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
    <div>
      <Card
        title="访客管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加访客
          </Button>
        }
      >
        <Table columns={columns} dataSource={visitorData} rowKey="id" />
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
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="访客公司"
            rules={[{ required: true, message: '请输入访客公司' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="licensePlate"
            label="车牌号"
            rules={[{ required: true, message: '请输入车牌号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="purpose"
            label="访问事由"
            rules={[{ required: true, message: '请输入访问事由' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="host"
            label="受访人"
            rules={[{ required: true, message: '请输入受访人' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="visitTime"
            label="拜访时间"
            rules={[{ required: true, message: '请选择拜访时间' }]}
          >
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Option value="pending">待审核</Option>
              <Option value="approved">已授权</Option>
              <Option value="rejected">已拒绝</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Visitor; 