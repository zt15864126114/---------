import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Manufacturer {
  id: string;
  name: string;
  code: string;
  type: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  status: string;
  createTime: string;
  updateTime: string;
}

const Manufacturer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟厂商数据
  const manufacturerData: Manufacturer[] = [
    {
      id: '1',
      name: '海康威视',
      code: 'HIKVISION',
      type: '视频监控设备',
      contact: '张经理',
      phone: '0571-88075998',
      email: 'sales@hikvision.com',
      address: '浙江省杭州市滨江区阡陌路555号',
      description: '全球领先的安防产品及行业解决方案提供商',
      status: 'active',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '2',
      name: '大华技术',
      code: 'DAHUA',
      type: '视频监控设备',
      contact: '李经理',
      phone: '0571-28939888',
      email: 'sales@dahuatech.com',
      address: '浙江省杭州市滨江区长河街道滨安路1199号',
      description: '全球领先的以视频为核心的智慧物联解决方案提供商',
      status: 'active',
      createTime: '2025-03-02 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '3',
      name: '中控智慧',
      code: 'ZKTECO',
      type: '门禁考勤设备',
      contact: '王经理',
      phone: '0755-89938888',
      email: 'sales@zkteco.com',
      address: '广东省东莞市塘厦镇平山188号',
      description: '全球领先的人工智能与物联网解决方案提供商',
      status: 'active',
      createTime: '2025-03-03 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '4',
      name: '旷视科技',
      code: 'MEGVII',
      type: '人工智能设备',
      contact: '赵经理',
      phone: '010-58771988',
      email: 'sales@megvii.com',
      address: '北京市海淀区科学院南路2号融科资讯中心',
      description: '全球领先的人工智能产品和解决方案提供商',
      status: 'active',
      createTime: '2025-03-04 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '5',
      name: '商汤科技',
      code: 'SENSETIME',
      type: '人工智能设备',
      contact: '陈经理',
      phone: '021-20687888',
      email: 'sales@sensetime.com',
      address: '上海市徐汇区漕河泾开发区宜山路900号',
      description: '全球领先的计算机视觉和深度学习技术提供商',
      status: 'active',
      createTime: '2025-03-05 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '6',
      name: '科大讯飞',
      code: 'IFLYTEK',
      type: '智能语音设备',
      contact: '吴经理',
      phone: '0551-65391888',
      email: 'sales@iflytek.com',
      address: '安徽省合肥市高新区望江西路666号',
      description: '全球领先的智能语音和人工智能上市公司',
      status: 'active',
      createTime: '2025-03-06 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '7',
      name: '宇视科技',
      code: 'UNIVIEW',
      type: '视频监控设备',
      contact: '郑经理',
      phone: '0571-88988888',
      email: 'sales@uniview.com',
      address: '浙江省杭州市滨江区西兴街道江陵路88号',
      description: '全球领先的视频监控产品及解决方案提供商',
      status: 'active',
      createTime: '2025-03-07 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '8',
      name: '立方体科技',
      code: 'CUBEE',
      type: '智能门禁设备',
      contact: '孙经理',
      phone: '0755-86567888',
      email: 'sales@cubee.com',
      address: '广东省深圳市南山区科技园北区',
      description: '专业的智能门禁和访客管理系统提供商',
      status: 'active',
      createTime: '2025-03-20 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '9',
      name: '云从科技',
      code: 'CLOUDWALK',
      type: '人工智能设备',
      contact: '周经理',
      phone: '020-38981888',
      email: 'sales@cloudwalk.com',
      address: '广东省广州市黄埔区科学城科学大道182号',
      description: '领先的人工智能技术服务商',
      status: 'active',
      createTime: '2025-03-09 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '10',
      name: '依图科技',
      code: 'YITU',
      type: '人工智能设备',
      contact: '钱经理',
      phone: '021-61066888',
      email: 'sales@yitu.com',
      address: '上海市长宁区娄山关路523号',
      description: '专业的人工智能解决方案提供商',
      status: 'active',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    }
  ];

  const columns = [
    {
      title: '厂商名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '厂商编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
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
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Manufacturer) => (
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

  const handleEdit = (record: Manufacturer) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个厂商吗？此操作不可恢复。',
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
        title="厂商管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加厂商
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={manufacturerData}
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
        title={editingId ? '编辑厂商' : '添加厂商'}
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
            label="厂商名称"
            rules={[{ required: true, message: '请输入厂商名称' }]}
          >
            <Input placeholder="请输入厂商名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="厂商编码"
            rules={[{ required: true, message: '请输入厂商编码' }]}
          >
            <Input placeholder="请输入厂商编码" />
          </Form.Item>
          <Form.Item
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              <Select.Option value="视频监控设备">视频监控设备</Select.Option>
              <Select.Option value="门禁考勤设备">门禁考勤设备</Select.Option>
              <Select.Option value="人工智能设备">人工智能设备</Select.Option>
              <Select.Option value="智能语音设备">智能语音设备</Select.Option>
              <Select.Option value="智能门禁设备">智能门禁设备</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="contact"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input placeholder="请输入联系人" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
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
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea rows={2} placeholder="请输入地址" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入描述" />
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

export default Manufacturer; 