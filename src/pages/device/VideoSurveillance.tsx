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

interface VideoData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  resolution: string;
  frameRate: string;
  storageDays: number;
  storageUsed: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const VideoSurveillance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟视频监控数据
  const [videoData] = useState<VideoData[]>([
    {
      id: '1',
      name: '主楼大厅监控',
      code: 'VIDEO-001',
      type: 'IP摄像头',
      location: '主楼1层大厅',
      status: 'normal',
      resolution: '4K',
      frameRate: '30fps',
      storageDays: 30,
      storageUsed: 15,
      lastMaintenanceTime: '2024-02-15',
      nextMaintenanceTime: '2024-05-15',
      maintainer: '张三',
      description: '主楼大厅高清监控',
      createTime: '2024-01-01',
      updateTime: '2024-02-15',
    },
    {
      id: '2',
      name: '停车场监控',
      code: 'VIDEO-002',
      type: 'IP摄像头',
      location: '地下停车场',
      status: 'warning',
      resolution: '1080P',
      frameRate: '25fps',
      storageDays: 30,
      storageUsed: 28,
      lastMaintenanceTime: '2024-02-10',
      nextMaintenanceTime: '2024-05-10',
      maintainer: '李四',
      description: '停车场出入口监控',
      createTime: '2024-01-01',
      updateTime: '2024-02-10',
    },
    {
      id: '3',
      name: '园区周界监控',
      code: 'VIDEO-003',
      type: 'IP摄像头',
      location: '园区围墙',
      status: 'error',
      resolution: '4K',
      frameRate: '30fps',
      storageDays: 30,
      storageUsed: 0,
      lastMaintenanceTime: '2024-02-01',
      nextMaintenanceTime: '2024-05-01',
      maintainer: '王五',
      description: '园区周界安防监控',
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
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
    },
    {
      title: '帧率',
      dataIndex: 'frameRate',
      key: 'frameRate',
    },
    {
      title: '存储使用',
      key: 'storage',
      render: (record: VideoData) => `${record.storageUsed}/${record.storageDays}天`,
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
      render: (_: any, record: VideoData) => (
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

  const handleEdit = (record: VideoData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: VideoData) => {
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
              <Select.Option value="IP摄像头">IP摄像头</Select.Option>
              <Select.Option value="模拟摄像头">模拟摄像头</Select.Option>
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
              <Select.Option value="1080P">1080P</Select.Option>
              <Select.Option value="720P">720P</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="frameRate"
            label="帧率"
            rules={[{ required: true, message: '请选择帧率' }]}
          >
            <Select>
              <Select.Option value="30fps">30fps</Select.Option>
              <Select.Option value="25fps">25fps</Select.Option>
              <Select.Option value="20fps">20fps</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="storageDays"
            label="存储天数"
            rules={[{ required: true, message: '请输入存储天数' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="storageUsed"
            label="已用天数"
            rules={[{ required: true, message: '请输入已用天数' }]}
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

export default VideoSurveillance; 