import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  message,
  Row,
  Col,
  Statistic,
  DatePicker,
  TimePicker,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface VisitorRecordData {
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

const VisitorRecords: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟访客记录数据
  const [recordData] = useState<VisitorRecordData[]>([
    {
      id: '1',
      visitorName: '李明华',
      visitorType: '访客',
      idType: '身份证',
      idNumber: '110101199001011234',
      phone: '13800138000',
      company: '科技有限公司',
      purpose: '商务洽谈',
      host: '王柳',
      department: '销售部',
      visitTime: '2024-02-20 09:00:00',
      leaveTime: '2024-02-20 17:00:00',
      status: 'visiting',
      vehicleNumber: '京A12345',
      description: '项目合作洽谈',
      createTime: '2024-02-19 14:30:00',
      updateTime: '2024-02-20 09:00:00',
    },
    {
      id: '2',
      visitorName: '王五',
      visitorType: '供应商',
      idType: '身份证',
      idNumber: '110101199001011235',
      phone: '13800138001',
      company: '设备有限公司',
      purpose: '设备维护',
      host: '赵六',
      department: '设备部',
      visitTime: '2024-02-20 10:00:00',
      leaveTime: '2024-02-20 16:00:00',
      status: 'completed',
      vehicleNumber: '京B12345',
      description: '设备定期维护',
      createTime: '2024-02-19 15:30:00',
      updateTime: '2024-02-20 16:00:00',
    },
    {
      id: '3',
      visitorName: '赵琳',
      visitorType: '客户',
      idType: '身份证',
      idNumber: '110101199001011236',
      phone: '13800138002',
      company: '投资有限公司',
      purpose: '项目考察',
      host: '周八',
      department: '市场部',
      visitTime: '2024-02-21 09:30:00',
      leaveTime: '2024-02-21 17:30:00',
      status: 'scheduled',
      vehicleNumber: '京C12345',
      description: '项目现场考察',
      createTime: '2024-02-19 16:30:00',
      updateTime: '2024-02-19 16:30:00',
    },
  ]);

  const columns = [
    {
      title: '访客姓名',
      dataIndex: 'visitorName',
      key: 'visitorName',
    },
    {
      title: '访客类型',
      dataIndex: 'visitorType',
      key: 'visitorType',
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      key: 'idType',
    },
    {
      title: '证件号码',
      dataIndex: 'idNumber',
      key: 'idNumber',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '所属单位',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '来访目的',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '接待人',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: '接待部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '来访时间',
      dataIndex: 'visitTime',
      key: 'visitTime',
    },
    {
      title: '离开时间',
      dataIndex: 'leaveTime',
      key: 'leaveTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          visiting: { color: 'processing', text: '访问中' },
          completed: { color: 'success', text: '已离开' },
          scheduled: { color: 'warning', text: '待访问' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '车牌号',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: VisitorRecordData) => (
        <Space size="middle">
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

  const handleEdit = (record: VisitorRecordData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: VisitorRecordData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除访客记录 ${record.visitorName} 吗？`,
      onOk() {
        // 这里添加删除逻辑
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      // 这里添加保存逻辑
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        form.resetFields();
        message.success('保存成功');
      }, 1000);
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总访客记录"
              value={recordData.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="访问中"
              value={recordData.filter((item) => item.status === 'visiting').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已离开"
              value={recordData.filter((item) => item.status === 'completed').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待访问"
              value={recordData.filter((item) => item.status === 'scheduled').length}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingId(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            添加访客记录
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={recordData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑访客记录' : '添加访客记录'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
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
              <Select.Option value="访客">访客</Select.Option>
              <Select.Option value="供应商">供应商</Select.Option>
              <Select.Option value="客户">客户</Select.Option>
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
            <Input />
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
            rules={[{ required: true, message: '请输入接待部门' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="visitTime"
            label="来访时间"
            rules={[{ required: true, message: '请选择来访时间' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            name="leaveTime"
            label="离开时间"
            rules={[{ required: true, message: '请选择离开时间' }]}
          >
            <DatePicker showTime />
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
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VisitorRecords; 