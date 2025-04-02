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
  HomeOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface ParkData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  area: number;
  buildings: number;
  departments: number;
  employees: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const BasicInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟园区数据
  const [parkData] = useState<ParkData[]>([
    {
      id: '1',
      name: '山东新高地智慧园区',
      code: 'PARK-001',
      type: '科技园区',
      location: '济宁市嘉祥县汽车站向西新高地产业园',
      status: 'normal',
      area: 500000,
      buildings: 12,
      departments: 8,
      employees: 1200,
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张明',
      description: '山东新高地智慧园区是集研发、办公、生活于一体的现代化科技园区，占地面积50万平方米，总投资30亿元。园区重点发展人工智能、物联网、大数据等高新技术产业，已入驻企业50余家，年产值超过100亿元。',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    }
  ]);

  const columns = [
    {
      title: '园区名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '园区编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '园区类型',
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
      title: '建筑面积(㎡)',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '楼宇数量',
      dataIndex: 'buildings',
      key: 'buildings',
    },
    {
      title: '部门数量',
      dataIndex: 'departments',
      key: 'departments',
    },
    {
      title: '员工数量',
      dataIndex: 'employees',
      key: 'employees',
    },
    {
      title: '最后维护时间',
      dataIndex: 'lastMaintenanceTime',
      key: 'lastMaintenanceTime',
    },
    {
      title: '下次维护时间',
      dataIndex: 'nextMaintenanceTime',
      key: 'nextMaintenanceTime',
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ParkData) => (
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

  const handleEdit = (record: ParkData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: ParkData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除园区 ${record.name} 吗？`,
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
              title="总园区数"
              value={parkData.length}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常园区"
              value={parkData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告园区"
              value={parkData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障园区"
              value={parkData.filter((item) => item.status === 'error').length}
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
            添加园区
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={parkData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑园区' : '添加园区'}
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
            label="园区名称"
            rules={[{ required: true, message: '请输入园区名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="园区编号"
            rules={[{ required: true, message: '请输入园区编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="园区类型"
            rules={[{ required: true, message: '请选择园区类型' }]}
          >
            <Select>
              <Select.Option value="科技园区">科技园区</Select.Option>
              <Select.Option value="创新园区">创新园区</Select.Option>
              <Select.Option value="产业园区">产业园区</Select.Option>
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
            name="area"
            label="建筑面积(㎡)"
            rules={[{ required: true, message: '请输入建筑面积' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="buildings"
            label="楼宇数量"
            rules={[{ required: true, message: '请输入楼宇数量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="departments"
            label="部门数量"
            rules={[{ required: true, message: '请输入部门数量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="employees"
            label="员工数量"
            rules={[{ required: true, message: '请输入员工数量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员' }]}
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

export default BasicInfo; 