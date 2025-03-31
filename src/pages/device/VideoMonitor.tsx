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
  VideoCameraOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface VideoMonitorData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  resolution: string;
  fps: number;
  storageDays: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const VideoMonitor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟视频监控数据
  const [videoData] = useState<VideoMonitorData[]>([
    {
      id: '1',
      name: '园区主入口监控',
      code: 'VM-001',
      type: '高清网络摄像机',
      location: '园区主入口',
      status: 'normal',
      resolution: '4K',
      fps: 30,
      storageDays: 30,
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张明',
      description: '园区主入口高清监控系统，采用4K分辨率网络摄像机，支持人脸识别和车牌识别。配备智能分析系统，支持异常行为检测。存储时间30天，支持远程查看。',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '研发区监控系统',
      code: 'VM-002',
      type: 'AI智能摄像机',
      location: '研发中心大楼',
      status: 'warning',
      resolution: '2K',
      fps: 25,
      storageDays: 90,
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李华',
      description: '研发区智能监控系统，采用AI智能摄像机，支持人员轨迹跟踪和区域入侵检测。配备研发区专用存储系统，支持90天数据存储。支持研发数据安全保护。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '停车场监控系统',
      code: 'VM-003',
      type: '全景摄像机',
      location: '地下停车场',
      status: 'error',
      resolution: '4K',
      fps: 20,
      storageDays: 60,
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王强',
      description: '停车场全景监控系统，采用4K全景摄像机，支持360度无死角监控。配备智能停车管理系统，支持车位引导和车辆定位。存储时间60天，支持车牌识别。',
      createTime: '2024-01-01',
      updateTime: '2024-02-01',
    },
    {
      id: '4',
      name: '安防监控系统',
      code: 'VM-004',
      type: '红外热成像摄像机',
      location: '园区周界',
      status: 'normal',
      resolution: '2K',
      fps: 15,
      storageDays: 90,
      lastMaintenanceTime: '2024-02-20',
      nextMaintenanceTime: '2024-05-20',
      maintainer: '赵阳',
      description: '园区周界安防监控系统，采用红外热成像摄像机，支持夜间监控和温度异常检测。配备智能安防系统，支持入侵报警和联动控制。存储时间90天，支持远程监控。',
      createTime: '2024-01-01',
      updateTime: '2024-02-20',
    },
    {
      id: '5',
      name: '会议室监控系统',
      code: 'VM-005',
      type: '高清云台摄像机',
      location: '综合服务楼会议室',
      status: 'normal',
      resolution: '1080P',
      fps: 30,
      storageDays: 30,
      lastMaintenanceTime: '2024-02-18',
      nextMaintenanceTime: '2024-05-18',
      maintainer: '刘芳',
      description: '会议室监控系统，采用高清云台摄像机，支持远程控制和自动跟踪。配备会议管理系统，支持视频会议和远程协作。存储时间30天，支持会议记录。',
      createTime: '2024-01-01',
      updateTime: '2024-02-18',
    },
    {
      id: '6',
      name: '餐厅监控系统',
      code: 'VM-006',
      type: '高清网络摄像机',
      location: '员工餐厅',
      status: 'normal',
      resolution: '2K',
      fps: 25,
      storageDays: 30,
      lastMaintenanceTime: '2024-02-16',
      nextMaintenanceTime: '2024-05-16',
      maintainer: '陈伟',
      description: '餐厅监控系统，采用2K高清网络摄像机，支持食品安全监控和客流统计。配备餐厅管理系统，支持食品安全追溯。存储时间30天，支持远程查看。',
      createTime: '2024-01-01',
      updateTime: '2024-02-16',
    },
    {
      id: '7',
      name: '宿舍区监控系统',
      code: 'VM-007',
      type: '高清网络摄像机',
      location: '人才公寓',
      status: 'warning',
      resolution: '2K',
      fps: 20,
      storageDays: 30,
      lastMaintenanceTime: '2024-02-14',
      nextMaintenanceTime: '2024-05-14',
      maintainer: '杨丽',
      description: '宿舍区监控系统，采用2K高清网络摄像机，支持人员出入管理和安全监控。配备宿舍管理系统，支持访客记录和异常报警。存储时间30天，支持远程查看。',
      createTime: '2024-01-01',
      updateTime: '2024-02-14',
    },
    {
      id: '8',
      name: '休闲区监控系统',
      code: 'VM-008',
      type: '高清网络摄像机',
      location: '园区休闲区',
      status: 'normal',
      resolution: '2K',
      fps: 20,
      storageDays: 30,
      lastMaintenanceTime: '2024-02-12',
      nextMaintenanceTime: '2024-05-12',
      maintainer: '周思',
      description: '休闲区监控系统，采用2K高清网络摄像机，支持人流统计和环境监控。配备休闲区管理系统，支持设施管理和安全监控。存储时间30天，支持远程查看。',
      createTime: '2024-01-01',
      updateTime: '2024-02-12',
    },
    {
      id: '9',
      name: '实验室监控系统',
      code: 'VM-009',
      type: 'AI智能摄像机',
      location: '研发实验室',
      status: 'normal',
      resolution: '4K',
      fps: 30,
      storageDays: 90,
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '吴霞',
      description: '实验室监控系统，采用4K AI智能摄像机，支持实验过程记录和安全监控。配备实验室管理系统，支持实验数据采集和安全预警。存储时间90天，支持远程查看。',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '10',
      name: '数据中心监控系统',
      code: 'VM-010',
      type: '高清网络摄像机',
      location: '数据中心机房',
      status: 'normal',
      resolution: '2K',
      fps: 20,
      storageDays: 90,
      lastMaintenanceTime: '2024-02-08',
      nextMaintenanceTime: '2024-05-08',
      maintainer: '李智',
      description: '数据中心监控系统，采用2K高清网络摄像机，支持机房环境监控和人员管理。配备数据中心管理系统，支持设备运行监控和安全预警。存储时间90天，支持远程查看。',
      createTime: '2024-01-01',
      updateTime: '2024-02-08',
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
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: '帧率',
      dataIndex: 'fps',
      key: 'fps',
      render: (fps: number) => `${fps}fps`,
    },
    {
      title: '存储天数',
      dataIndex: 'storageDays',
      key: 'storageDays',
      render: (days: number) => `${days}天`,
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
      render: (_: any, record: VideoMonitorData) => (
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

  const handleEdit = (record: VideoMonitorData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: VideoMonitorData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除视频监控 ${record.name} 吗？`,
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
              title="总监控点"
              value={videoData.length}
              prefix={<VideoCameraOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常监控"
              value={videoData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告监控"
              value={videoData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障监控"
              value={videoData.filter((item) => item.status === 'error').length}
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
            添加监控点
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={videoData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑监控点' : '添加监控点'}
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
              <Select.Option value="高清网络摄像机">高清网络摄像机</Select.Option>
              <Select.Option value="AI智能摄像机">AI智能摄像机</Select.Option>
              <Select.Option value="全景摄像机">全景摄像机</Select.Option>
              <Select.Option value="红外热成像摄像机">红外热成像摄像机</Select.Option>
              <Select.Option value="高清云台摄像机">高清云台摄像机</Select.Option>
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
            name="resolution"
            label="分辨率"
            rules={[{ required: true, message: '请选择分辨率' }]}
          >
            <Select>
              <Select.Option value="4K">4K</Select.Option>
              <Select.Option value="2K">2K</Select.Option>
              <Select.Option value="1080P">1080P</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="fps"
            label="帧率"
            rules={[{ required: true, message: '请输入帧率' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="storageDays"
            label="存储天数"
            rules={[{ required: true, message: '请输入存储天数' }]}
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

export default VideoMonitor; 