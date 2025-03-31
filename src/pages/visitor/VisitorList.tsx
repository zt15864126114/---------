import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message, Row, Col, Statistic, Modal, Form, Input, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface VisitorData {
  id: string;
  visitorName: string;
  visitorType: string;
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
  vehicleNumber: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const VisitorList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟访客数据
  const data: VisitorData[] = [
    {
      id: '1',
      visitorName: '李明华',
      visitorType: '商务访客',
      idType: '身份证',
      idNumber: '110101199001011234',
      phone: '13800138000',
      company: '科技有限公司',
      purpose: '商务洽谈',
      host: '王柳',
      department: '市场部',
      visitTime: '2025-03-20 09:00:00',
      leaveTime: '2025-03-20 11:00:00',
      status: 'visiting',
      vehicleNumber: '京A12345',
      description: '产品合作洽谈',
      createTime: '2025-03-19 14:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '2',
      visitorName: '王五',
      visitorType: '临时访客',
      idType: '身份证',
      idNumber: '110101199001011235',
      phone: '13800138001',
      company: '快递公司',
      purpose: '快递配送',
      host: '系统',
      department: '前台',
      visitTime: '2025-03-20 10:00:00',
      leaveTime: '2025-03-20 10:30:00',
      status: 'completed',
      vehicleNumber: '京B12345',
      description: '快递包裹配送',
      createTime: '2025-03-20 09:30:00',
      updateTime: '2025-03-20 10:30:00',
    },
    {
      id: '3',
      visitorName: '赵六',
      visitorType: '商务访客',
      idType: '身份证',
      idNumber: '110101199001011236',
      phone: '13800138002',
      company: '设计公司',
      purpose: '项目对接',
      host: '王七',
      department: '研发部',
      visitTime: '2025-03-20 14:00:00',
      leaveTime: '2025-03-20 16:00:00',
      status: 'scheduled',
      vehicleNumber: '京C12345',
      description: 'UI设计评审',
      createTime: '2025-03-19 16:00:00',
      updateTime: '2025-03-19 16:00:00',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'visiting':
        return 'processing';
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '访客姓名',
      dataIndex: 'visitorName',
      key: 'visitorName',
      width: 120,
    },
    {
      title: '访客类型',
      dataIndex: 'visitorType',
      key: 'visitorType',
      width: 120,
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
      title: '所属单位',
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
      width: 120,
    },
    {
      title: '接待部门',
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
        <Tag color={getStatusColor(status)}>
          {status === 'visiting' ? '访问中' : status === 'completed' ? '已离开' : '待访问'}
        </Tag>
      ),
    },
    {
      title: '车牌号',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
      width: 120,
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: VisitorData) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: VisitorData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: VisitorData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除访客记录 ${record.visitorName} 吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      // 模拟保存
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        message.success(editingId ? '更新成功' : '添加成功');
      }, 1000);
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="访客总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="访问中"
              value={data.filter(item => item.status === 'visiting').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已离开"
              value={data.filter(item => item.status === 'completed').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待访问"
              value={data.filter(item => item.status === 'scheduled').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="访客列表"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加访客
            </Button>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
          </Space>
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
        title={editingId ? '编辑访客' : '添加访客'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="visitorName"
            label="访客姓名"
            rules={[{ required: true, message: '请输入访客姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="visitorType"
            label="访客类型"
            rules={[{ required: true, message: '请选择访客类型' }]}
          >
            <Select>
              <Select.Option value="商务访客">商务访客</Select.Option>
              <Select.Option value="临时访客">临时访客</Select.Option>
              <Select.Option value="其他访客">其他访客</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="idType"
            label="证件类型"
            rules={[{ required: true, message: '请选择证件类型' }]}
          >
            <Select>
              <Select.Option value="身份证">身份证</Select.Option>
              <Select.Option value="护照">护照</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="idNumber"
            label="证件号码"
            rules={[{ required: true, message: '请输入证件号码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="所属单位"
            rules={[{ required: true, message: '请输入所属单位' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="purpose"
            label="来访目的"
            rules={[{ required: true, message: '请输入来访目的' }]}
          >
            <Select>
              <Select.Option value="商务洽谈">商务洽谈</Select.Option>
              <Select.Option value="项目对接">项目对接</Select.Option>
              <Select.Option value="快递配送">快递配送</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="host"
            label="接待人"
            rules={[{ required: true, message: '请输入接待人' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="接待部门"
            rules={[{ required: true, message: '请选择接待部门' }]}
          >
            <Select>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="人事部">人事部</Select.Option>
              <Select.Option value="前台">前台</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="time"
            label="访问时间"
            rules={[{ required: true, message: '请选择访问时间' }]}
          >
            <RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="visiting">访问中</Select.Option>
              <Select.Option value="completed">已离开</Select.Option>
              <Select.Option value="scheduled">待访问</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vehicleNumber"
            label="车牌号"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="备注"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VisitorList; 