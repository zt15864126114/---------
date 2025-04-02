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
  ApiOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

interface WiringData {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  capacity: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
  createTime: string;
  updateTime: string;
}

const WiringSystem: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟布线系统数据
  const [wiringData] = useState<WiringData[]>([
    {
      id: '1',
      name: '主数据中心布线系统',
      code: 'WS-001',
      type: '光纤布线',
      location: '数据中心大楼1-5层',
      status: 'normal',
      capacity: 10000,
      lastMaintenanceTime: '2025-03-15',
      nextMaintenanceTime: '2025-05-15',
      maintainer: '张明',
      description: '园区核心数据中心布线系统，采用OM4多模光纤，支持40G/100G网络传输。配备智能布线管理系统，可实时监控光纤状态。总布线长度超过10000米，连接服务器机柜200个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-15',
    },
    {
      id: '2',
      name: '研发楼布线系统',
      code: 'WS-002',
      type: '综合布线',
      location: '研发中心大楼1-20层',
      status: 'warning',
      capacity: 5000,
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-10',
      maintainer: '李华',
      description: '研发中心综合布线系统，采用Cat6A类网线，支持10G网络传输。配备智能配线架，支持远程管理。总布线长度5000米，连接工位500个，会议室20间。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '3',
      name: '安防监控布线系统',
      code: 'WS-003',
      type: '视频布线',
      location: '园区全域',
      status: 'error',
      capacity: 3000,
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-01',
      maintainer: '王强',
      description: '园区安防监控布线系统，采用同轴电缆和光纤混合布线，支持4K视频传输。配备视频监控管理平台，支持智能分析。总布线长度3000米，连接摄像头200个，门禁系统50个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '4',
      name: '楼宇自控布线系统',
      code: 'WS-004',
      type: '控制布线',
      location: '园区所有楼宇',
      status: 'normal',
      capacity: 4000,
      lastMaintenanceTime: '2025-03-20',
      nextMaintenanceTime: '2025-05-20',
      maintainer: '赵阳',
      description: '园区楼宇自控布线系统，采用RS485总线，支持智能控制。配备楼宇自控系统，可远程控制空调、照明等设备。总布线长度4000米，连接控制点1000个，覆盖12栋楼宇。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
    },
    {
      id: '5',
      name: '会议室布线系统',
      code: 'WS-005',
      type: '音视频布线',
      location: '综合服务楼1-12层',
      status: 'normal',
      capacity: 2000,
      lastMaintenanceTime: '2025-03-18',
      nextMaintenanceTime: '2025-05-18',
      maintainer: '刘芳',
      description: '会议室音视频布线系统，采用HDMI和音频线缆，支持4K视频和7.1声道音频传输。配备会议系统管理平台，支持远程会议。总布线长度2000米，连接会议室30间，配备专业音响设备。',
      createTime: '2025-03-10',
      updateTime: '2025-03-18',
    },
    {
      id: '6',
      name: '停车场布线系统',
      code: 'WS-006',
      type: '控制布线',
      location: '地下停车场B1-B3层',
      status: 'normal',
      capacity: 1500,
      lastMaintenanceTime: '2025-03-16',
      nextMaintenanceTime: '2025-05-16',
      maintainer: '陈伟',
      description: '停车场管理布线系统，采用RS485总线，支持车位引导和收费管理。配备智能停车场管理系统，支持车牌识别和自动收费。总布线长度1500米，连接车位引导屏20个，收费系统10个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-16',
    },
    {
      id: '7',
      name: '门禁系统布线',
      code: 'WS-007',
      type: '控制布线',
      location: '园区所有出入口',
      status: 'warning',
      capacity: 1000,
      lastMaintenanceTime: '2025-03-14',
      nextMaintenanceTime: '2025-05-14',
      maintainer: '杨丽',
      description: '门禁系统布线，采用RS485总线，支持人脸识别和刷卡认证。配备门禁管理系统，支持访客管理。总布线长度1000米，连接门禁设备50个，人脸识别设备30个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-14',
    },
    {
      id: '8',
      name: '消防系统布线',
      code: 'WS-008',
      type: '控制布线',
      location: '园区所有楼宇',
      status: 'normal',
      capacity: 2500,
      lastMaintenanceTime: '2025-03-12',
      nextMaintenanceTime: '2025-05-12',
      maintainer: '周思',
      description: '消防系统布线，采用消防专用线缆，支持火灾报警和联动控制。配备消防监控系统，支持实时监控和自动报警。总布线长度2500米，连接烟感器200个，消防控制箱10个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-12',
    },
    {
      id: '9',
      name: '电梯系统布线',
      code: 'WS-009',
      type: '控制布线',
      location: '园区所有电梯',
      status: 'normal',
      capacity: 800,
      lastMaintenanceTime: '2025-03-10',
      nextMaintenanceTime: '2025-05-10',
      maintainer: '吴霞',
      description: '电梯系统布线，采用电梯专用线缆，支持电梯控制和监控。配备电梯监控系统，支持实时监控和故障诊断。总布线长度800米，连接电梯20部，监控设备40个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-10',
    },
    {
      id: '10',
      name: '照明系统布线',
      code: 'WS-010',
      type: '控制布线',
      location: '园区所有公共区域',
      status: 'normal',
      capacity: 3000,
      lastMaintenanceTime: '2025-03-20',
      nextMaintenanceTime: '2025-05-08',
      maintainer: '李智',
      description: '照明系统布线，采用KNX总线，支持智能照明控制。配备照明控制系统，支持场景控制和节能管理。总布线长度3000米，连接照明控制器50个，灯具500个。',
      createTime: '2025-03-10',
      updateTime: '2025-03-20',
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
      render: (_: any, record: WiringData) => (
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

  const handleEdit = (record: WiringData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: WiringData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除布线系统 ${record.name} 吗？`,
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
              title="总布线系统"
              value={wiringData.length}
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常系统"
              value={wiringData.filter((item) => item.status === 'normal').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="警告系统"
              value={wiringData.filter((item) => item.status === 'warning').length}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障系统"
              value={wiringData.filter((item) => item.status === 'error').length}
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
            添加布线系统
          </Button>
          <Button icon={<ReloadOutlined />}>刷新</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={wiringData}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑布线系统' : '添加布线系统'}
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
              <Select.Option value="光纤">光纤</Select.Option>
              <Select.Option value="铜缆">铜缆</Select.Option>
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
            <Input />
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

export default WiringSystem; 