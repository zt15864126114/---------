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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface PatrolPointData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  patrolFrequency: string;
  lastPatrolTime: string;
  nextPatrolTime: string;
  patrolPerson: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const PatrolPoint: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟巡检点位数据
  const [patrolData] = useState<PatrolPointData[]>([
    {
      id: '1',
      name: '主楼消防设施',
      code: 'PP-001',
      type: '消防设施',
      location: '主楼1层',
      status: 'normal',
      patrolFrequency: '每日',
      lastPatrolTime: '2024-02-15 09:00',
      nextPatrolTime: '2024-02-16 09:00',
      patrolPerson: '张三',
      description: '主楼消防设施巡检点',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '园区配电室',
      code: 'PP-002',
      type: '电力设施',
      location: '园区配电室',
      status: 'warning',
      patrolFrequency: '每周',
      lastPatrolTime: '2024-02-10 14:00',
      nextPatrolTime: '2024-02-17 14:00',
      patrolPerson: '李四',
      description: '园区配电室巡检点',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '停车场监控室',
      code: 'PP-003',
      type: '安防设施',
      location: '地下停车场',
      status: 'error',
      patrolFrequency: '每日',
      lastPatrolTime: '2024-02-01 10:00',
      nextPatrolTime: '2024-02-02 10:00',
      patrolPerson: '王五',
      description: '停车场监控室巡检点',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
  ]);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          normal: { color: 'success', text: '正常' },
          warning: { color: 'warning', text: '警告' },
          error: { color: 'error', text: '故障' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '巡检频率',
      dataIndex: 'patrolFrequency',
      key: 'patrolFrequency',
    },
    {
      title: '上次巡检时间',
      dataIndex: 'lastPatrolTime',
      key: 'lastPatrolTime',
    },
    {
      title: '下次巡检时间',
      dataIndex: 'nextPatrolTime',
      key: 'nextPatrolTime',
    },
    {
      title: '巡检人员',
      dataIndex: 'patrolPerson',
      key: 'patrolPerson',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PatrolPointData) => (
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

  const handleEdit = (record: PatrolPointData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: PatrolPointData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除巡检点位 ${record.name} 吗？`,
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
              title="总巡检点"
              value={patrolData.length}
              prefix={<SafetyCertificateOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常巡检点"
              value={patrolData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告巡检点"
              value={patrolData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障巡检点"
              value={patrolData.filter((item) => item.status === 'error').length}
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
            添加巡检点
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={patrolData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑巡检点' : '添加巡检点'}
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
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="编号"
            rules={[{ required: true, message: '请输入编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="消防设施">消防设施</Select.Option>
              <Select.Option value="电力设施">电力设施</Select.Option>
              <Select.Option value="安防设施">安防设施</Select.Option>
              <Select.Option value="其他设施">其他设施</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">警告</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="patrolFrequency"
            label="巡检频率"
            rules={[{ required: true, message: '请选择巡检频率' }]}
          >
            <Select>
              <Select.Option value="每日">每日</Select.Option>
              <Select.Option value="每周">每周</Select.Option>
              <Select.Option value="每月">每月</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="patrolPerson"
            label="巡检人员"
            rules={[{ required: true, message: '请输入巡检人员' }]}
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

export default PatrolPoint; 