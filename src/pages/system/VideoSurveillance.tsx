import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface Camera {
  id: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  type: string;
  status: string;
  ipAddress: string;
  resolution: string;
  streamType: string;
  storageDays: number;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
}

const VideoSurveillance: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟数据
  const cameraData: Camera[] = [
    {
      id: '1',
      deviceName: '主入口摄像头',
      deviceCode: 'CAM-ENT-001',
      location: '园区主入口',
      type: '枪机',
      status: 'normal',
      ipAddress: '192.168.1.200',
      resolution: '4K',
      streamType: 'H.265',
      storageDays: 30,
      lastMaintenanceTime: '2025-03-15 09:00:00',
      nextMaintenanceTime: '2025-04-15 09:00:00',
      maintainer: '张工',
    },
    {
      id: '2',
      deviceName: '停车场摄像头',
      deviceCode: 'CAM-PARK-001',
      location: '地下停车场',
      type: '球机',
      status: 'warning',
      ipAddress: '192.168.1.201',
      resolution: '1080P',
      streamType: 'H.264',
      storageDays: 15,
      lastMaintenanceTime: '2025-03-10 14:30:00',
      nextMaintenanceTime: '2025-04-10 14:30:00',
      maintainer: '李工',
    },
    {
      id: '3',
      deviceName: '电梯摄像头',
      deviceCode: 'CAM-ELEV-001',
      location: 'A栋电梯',
      type: '半球机',
      status: 'normal',
      ipAddress: '192.168.1.202',
      resolution: '720P',
      streamType: 'H.264',
      storageDays: 7,
      lastMaintenanceTime: '2025-03-18 10:00:00',
      nextMaintenanceTime: '2025-04-18 10:00:00',
      maintainer: '王工',
    },
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 150,
    },
    {
      title: '设备编号',
      dataIndex: 'deviceCode',
      key: 'deviceCode',
      width: 120,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'success' : status === 'warning' ? 'warning' : 'error'}>
          {status === 'normal' ? '正常' : status === 'warning' ? '警告' : '故障'}
        </Tag>
      ),
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 120,
    },
    {
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
      width: 100,
    },
    {
      title: '码流类型',
      dataIndex: 'streamType',
      key: 'streamType',
      width: 100,
    },
    {
      title: '存储天数',
      dataIndex: 'storageDays',
      key: 'storageDays',
      width: 100,
    },
    {
      title: '上次维护时间',
      dataIndex: 'lastMaintenanceTime',
      key: 'lastMaintenanceTime',
      width: 180,
    },
    {
      title: '下次维护时间',
      dataIndex: 'nextMaintenanceTime',
      key: 'nextMaintenanceTime',
      width: 180,
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Camera) => (
        <Space size="middle">
          <Button type="link" icon={<VideoCameraOutlined />}>
            查看视频
          </Button>
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

  const handleEdit = (record: Camera) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条摄像头记录吗？此操作不可恢复。',
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
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="摄像头总数"
              value={cameraData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线摄像头"
              value={cameraData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离线摄像头"
              value={cameraData.filter(item => item.status === 'error').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="需要维护"
              value={cameraData.filter(item => item.status === 'warning').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="视频监控系统"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加摄像头
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={cameraData}
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
        title={editingId ? '编辑摄像头' : '添加摄像头'}
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
            name="deviceName"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          <Form.Item
            name="deviceCode"
            label="设备编号"
            rules={[{ required: true, message: '请输入设备编号' }]}
          >
            <Input placeholder="请输入设备编号" />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input placeholder="请输入位置" />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder="请选择类型">
              <Select.Option value="枪机">枪机</Select.Option>
              <Select.Option value="球机">球机</Select.Option>
              <Select.Option value="半球机">半球机</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">警告</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="ipAddress"
            label="IP地址"
            rules={[{ required: true, message: '请输入IP地址' }]}
          >
            <Input placeholder="请输入IP地址" />
          </Form.Item>
          <Form.Item
            name="resolution"
            label="分辨率"
            rules={[{ required: true, message: '请选择分辨率' }]}
          >
            <Select placeholder="请选择分辨率">
              <Select.Option value="4K">4K</Select.Option>
              <Select.Option value="1080P">1080P</Select.Option>
              <Select.Option value="720P">720P</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="streamType"
            label="码流类型"
            rules={[{ required: true, message: '请选择码流类型' }]}
          >
            <Select placeholder="请选择码流类型">
              <Select.Option value="H.265">H.265</Select.Option>
              <Select.Option value="H.264">H.264</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="storageDays"
            label="存储天数"
            rules={[{ required: true, message: '请输入存储天数' }]}
          >
            <Input type="number" placeholder="请输入存储天数" />
          </Form.Item>
          <Form.Item
            name="lastMaintenanceTime"
            label="上次维护时间"
            rules={[{ required: true, message: '请选择上次维护时间' }]}
          >
            <Input placeholder="请输入上次维护时间" />
          </Form.Item>
          <Form.Item
            name="nextMaintenanceTime"
            label="下次维护时间"
            rules={[{ required: true, message: '请选择下次维护时间' }]}
          >
            <Input placeholder="请输入下次维护时间" />
          </Form.Item>
          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员' }]}
          >
            <Input placeholder="请输入维护人员" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VideoSurveillance; 