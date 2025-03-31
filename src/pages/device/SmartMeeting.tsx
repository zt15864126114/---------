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
  TeamOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface SmartMeetingData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  capacity: number;
  currentUsers: number;
  lastMeetingTime: string;
  nextMeetingTime: string;
  manager: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const SmartMeeting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟智能会议室数据
  const [meetingData] = useState<SmartMeetingData[]>([
    {
      id: '1',
      name: '多功能报告厅',
      code: 'SM-001',
      type: '大型会议室',
      location: '综合服务楼1层',
      status: 'normal',
      capacity: 200,
      currentUsers: 150,
      lastMeetingTime: '2024-02-20 14:00',
      nextMeetingTime: '2024-02-20 16:00',
      manager: '张明',
      description: '多功能报告厅，配备4K投影系统、环绕音响、同声传译系统，支持远程视频会议。配备智能会议系统，支持会议预约、签到和会议纪要自动生成。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '2',
      name: '研发会议室',
      code: 'SM-002',
      type: '中型会议室',
      location: '研发大楼3层',
      status: 'warning',
      capacity: 50,
      currentUsers: 45,
      lastMeetingTime: '2024-02-20 13:30',
      nextMeetingTime: '2024-02-20 15:30',
      manager: '李华',
      description: '研发会议室，配备高清投影、音响系统，支持远程协作。配备研发专用会议系统，支持代码共享和实时协作。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '3',
      name: '培训教室',
      code: 'SM-003',
      type: '培训室',
      location: '综合服务楼2层',
      status: 'error',
      capacity: 100,
      currentUsers: 0,
      lastMeetingTime: '2024-02-20 10:00',
      nextMeetingTime: '2024-02-20 12:00',
      manager: '王强',
      description: '培训教室，配备双屏投影、音响系统，支持远程培训。配备培训管理系统，支持课程录制和在线学习。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '4',
      name: '高管会议室',
      code: 'SM-004',
      type: '小型会议室',
      location: '综合服务楼5层',
      status: 'normal',
      capacity: 20,
      currentUsers: 15,
      lastMeetingTime: '2024-02-20 14:30',
      nextMeetingTime: '2024-02-20 16:30',
      manager: '赵阳',
      description: '高管会议室，配备4K显示屏、音响系统，支持远程会议。配备高管会议系统，支持决策分析和数据可视化。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '5',
      name: '创意会议室',
      code: 'SM-005',
      type: '创意室',
      location: '研发大楼2层',
      status: 'normal',
      capacity: 30,
      currentUsers: 25,
      lastMeetingTime: '2024-02-20 13:00',
      nextMeetingTime: '2024-02-20 15:00',
      manager: '刘芳',
      description: '创意会议室，配备交互式白板、音响系统，支持创意讨论。配备创意协作系统，支持头脑风暴和创意展示。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '6',
      name: '视频会议室',
      code: 'SM-006',
      type: '视频会议室',
      location: '综合服务楼3层',
      status: 'normal',
      capacity: 40,
      currentUsers: 35,
      lastMeetingTime: '2024-02-20 14:00',
      nextMeetingTime: '2024-02-20 16:00',
      manager: '陈伟',
      description: '视频会议室，配备高清摄像头、音响系统，支持远程视频会议。配备视频会议系统，支持多端接入和实时互动。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '7',
      name: '项目会议室',
      code: 'SM-007',
      type: '中型会议室',
      location: '研发大楼4层',
      status: 'warning',
      capacity: 60,
      currentUsers: 55,
      lastMeetingTime: '2024-02-20 13:30',
      nextMeetingTime: '2024-02-20 15:30',
      manager: '杨丽',
      description: '项目会议室，配备投影系统、音响系统，支持项目讨论。配备项目管理系统，支持任务跟踪和进度展示。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '8',
      name: '客户会议室',
      code: 'SM-008',
      type: '小型会议室',
      location: '综合服务楼1层',
      status: 'normal',
      capacity: 15,
      currentUsers: 10,
      lastMeetingTime: '2024-02-20 14:00',
      nextMeetingTime: '2024-02-20 16:00',
      manager: '周思',
      description: '客户会议室，配备高清显示屏、音响系统，支持客户接待。配备客户管理系统，支持客户资料和会议记录。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '9',
      name: '培训室A',
      code: 'SM-009',
      type: '培训室',
      location: '综合服务楼2层',
      status: 'normal',
      capacity: 80,
      currentUsers: 75,
      lastMeetingTime: '2024-02-20 13:00',
      nextMeetingTime: '2024-02-20 15:00',
      manager: '吴霞',
      description: '培训室A，配备双屏投影、音响系统，支持技能培训。配备培训管理系统，支持课程管理和学习跟踪。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '10',
      name: '会议室A',
      code: 'SM-010',
      type: '小型会议室',
      location: '研发大楼1层',
      status: 'normal',
      capacity: 25,
      currentUsers: 20,
      lastMeetingTime: '2024-02-20 14:30',
      nextMeetingTime: '2024-02-20 16:30',
      manager: '李智',
      description: '会议室A，配备投影系统、音响系统，支持日常会议。配备会议管理系统，支持会议预约和资源管理。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
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
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity: number) => `${capacity}人`,
    },
    {
      title: '当前使用',
      dataIndex: 'currentUsers',
      key: 'currentUsers',
      render: (currentUsers: number) => `${currentUsers}人`,
    },
    {
      title: '上次会议时间',
      dataIndex: 'lastMeetingTime',
      key: 'lastMeetingTime',
    },
    {
      title: '下次会议时间',
      dataIndex: 'nextMeetingTime',
      key: 'nextMeetingTime',
    },
    {
      title: '管理员',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: SmartMeetingData) => (
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

  const handleEdit = (record: SmartMeetingData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: SmartMeetingData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除会议室 ${record.name} 吗？`,
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
              title="总会议室"
              value={meetingData.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常会议室"
              value={meetingData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告会议室"
              value={meetingData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障会议室"
              value={meetingData.filter((item) => item.status === 'error').length}
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
            添加会议室
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={meetingData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑会议室' : '添加会议室'}
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
              <Select.Option value="大型会议室">大型会议室</Select.Option>
              <Select.Option value="中型会议室">中型会议室</Select.Option>
              <Select.Option value="小型会议室">小型会议室</Select.Option>
              <Select.Option value="培训室">培训室</Select.Option>
              <Select.Option value="创意室">创意室</Select.Option>
              <Select.Option value="视频会议室">视频会议室</Select.Option>
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
            name="capacity"
            label="容量"
            rules={[{ required: true, message: '请输入容量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="currentUsers"
            label="当前使用人数"
            rules={[{ required: true, message: '请输入当前使用人数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="manager"
            label="管理员"
            rules={[{ required: true, message: '请输入管理员' }]}
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

export default SmartMeeting; 