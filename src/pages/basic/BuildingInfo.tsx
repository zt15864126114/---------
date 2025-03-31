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
  BankOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface BuildingData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  floors: number;
  area: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const BuildingInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟楼宇数据
  const [buildingData] = useState<BuildingData[]>([
    {
      id: '1',
      name: '研发中心大楼',
      code: 'BLD-001',
      type: '办公大楼',
      location: '山东新高地智慧园区A区1号楼',
      status: 'normal',
      floors: 20,
      area: 50000,
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张明',
      description: '研发中心大楼是园区的主要研发办公场所，配备先进的研发设备和办公设施。大楼采用智能化管理系统，包括智能照明、空调控制、安防监控等。设有多个研发实验室、会议室和休闲区域，可容纳500人同时办公。',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '创新孵化楼',
      code: 'BLD-002',
      type: '孵化器',
      location: '山东新高地智慧园区B区2号楼',
      status: 'warning',
      floors: 15,
      area: 30000,
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李华',
      description: '创新孵化楼为初创企业提供办公空间和创业服务支持。配备共享会议室、路演厅、创业咖啡厅等设施。设有创业导师办公室、知识产权服务中心、投融资对接中心等服务机构，可容纳30家初创企业入驻。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '综合服务楼',
      code: 'BLD-003',
      type: '服务楼',
      location: '山东新高地智慧园区C区3号楼',
      status: 'error',
      floors: 12,
      area: 25000,
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王强',
      description: '综合服务楼提供餐饮、会议、健身等配套服务设施。设有员工餐厅、商务餐厅、多功能会议室、健身房、医务室等。配备智能门禁系统和访客管理系统，日均接待访客200人次。',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
    {
      id: '4',
      name: '数据中心',
      code: 'BLD-004',
      type: '数据中心',
      location: '山东新高地智慧园区D区4号楼',
      status: 'normal',
      floors: 5,
      area: 15000,
      lastMaintenanceTime: '2024-02-20',
      nextMaintenanceTime: '2024-05-20',
      maintainer: '赵阳',
      description: '数据中心配备高性能服务器和存储设备，为园区提供数据服务支持。采用T3+级数据中心标准建设，配备双路供电、精密空调、气体灭火等系统。设有运维监控中心、设备机房、网络机房等功能区。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '5',
      name: '人才公寓',
      code: 'BLD-005',
      type: '住宅楼',
      location: '山东新高地智慧园区E区5号楼',
      status: 'normal',
      floors: 18,
      area: 40000,
      lastMaintenanceTime: '2024-02-18',
      nextMaintenanceTime: '2024-05-18',
      maintainer: '刘芳',
      description: '人才公寓为园区员工提供舒适的居住环境，配备完善的配套设施。设有单人间、双人间、家庭套房等多种户型，配备家具、家电、网络等设施。设有公共活动区、洗衣房、快递收发室等生活配套。',
      createTime: '2024-01-01',
      updateTime: '2024-02-18',
    },
  ]);

  const columns = [
    {
      title: '楼宇名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '楼宇编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '楼宇类型',
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
      title: '楼层数',
      dataIndex: 'floors',
      key: 'floors',
    },
    {
      title: '建筑面积(㎡)',
      dataIndex: 'area',
      key: 'area',
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
      render: (_: any, record: BuildingData) => (
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

  const handleEdit = (record: BuildingData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: BuildingData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除楼宇 ${record.name} 吗？`,
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
              title="总楼宇数"
              value={buildingData.length}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常楼宇"
              value={buildingData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告楼宇"
              value={buildingData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障楼宇"
              value={buildingData.filter((item) => item.status === 'error').length}
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
            添加楼宇
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={buildingData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑楼宇' : '添加楼宇'}
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
            label="楼宇名称"
            rules={[{ required: true, message: '请输入楼宇名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="楼宇编号"
            rules={[{ required: true, message: '请输入楼宇编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="楼宇类型"
            rules={[{ required: true, message: '请选择楼宇类型' }]}
          >
            <Select>
              <Select.Option value="办公大楼">办公大楼</Select.Option>
              <Select.Option value="孵化器">孵化器</Select.Option>
              <Select.Option value="服务楼">服务楼</Select.Option>
              <Select.Option value="数据中心">数据中心</Select.Option>
              <Select.Option value="住宅楼">住宅楼</Select.Option>
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
            name="floors"
            label="楼层数"
            rules={[{ required: true, message: '请输入楼层数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="area"
            label="建筑面积(㎡)"
            rules={[{ required: true, message: '请输入建筑面积' }]}
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

export default BuildingInfo; 