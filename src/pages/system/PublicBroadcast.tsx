import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SoundOutlined } from '@ant-design/icons';

interface BroadcastDevice {
  id: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  type: string;
  status: string;
  ipAddress: string;
  volume: number;
  lastCheckTime: string;
  nextCheckTime: string;
  maintainer: string;
  description: string;
}

interface BroadcastTask {
  id: string;
  taskName: string;
  content: string;
  schedule: string;
  priority: string;
  status: string;
  createTime: string;
  creator: string;
  targetDevices: string[];
}

const PublicBroadcast: React.FC = () => {
  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [deviceForm] = Form.useForm();
  const [taskForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟广播设备数据
  const deviceData: BroadcastDevice[] = [
    {
      id: '1',
      deviceName: '主入口音箱',
      deviceCode: 'BC-ENT-001',
      location: '园区主入口',
      type: '户外音箱',
      status: 'normal',
      ipAddress: '192.168.1.400',
      volume: 80,
      lastCheckTime: '2025-03-20 09:00:00',
      nextCheckTime: '2025-04-20 09:00:00',
      maintainer: '张工',
      description: '防水户外音箱',
    },
    {
      id: '2',
      deviceName: '大厅音箱',
      deviceCode: 'BC-LOB-001',
      location: 'A栋一层大厅',
      type: '室内音箱',
      status: 'warning',
      ipAddress: '192.168.1.401',
      volume: 70,
      lastCheckTime: '2025-03-19 14:30:00',
      nextCheckTime: '2025-04-19 14:30:00',
      maintainer: '李工',
      description: '吸顶式音箱',
    },
    {
      id: '3',
      deviceName: '会议室音箱',
      deviceCode: 'BC-MTG-001',
      location: 'B栋二层会议室',
      type: '室内音箱',
      status: 'normal',
      ipAddress: '192.168.1.402',
      volume: 60,
      lastCheckTime: '2025-03-18 10:00:00',
      nextCheckTime: '2025-04-18 10:00:00',
      maintainer: '王工',
      description: '壁挂式音箱',
    },
  ];

  // 模拟广播任务数据
  const taskData: BroadcastTask[] = [
    {
      id: '1',
      taskName: '上班通知',
      content: '各位同事早上好，现在是早上8:30，请准时上班。',
      schedule: '2025-03-20 08:30:00',
      priority: 'high',
      status: 'completed',
      createTime: '2025-03-19 17:00:00',
      creator: '系统管理员',
      targetDevices: ['主入口音箱', '大厅音箱'],
    },
    {
      id: '2',
      taskName: '紧急通知',
      content: '请注意，园区A栋电梯正在进行维护，请使用B栋电梯。',
      schedule: '2025-03-20 10:00:00',
      priority: 'high',
      status: 'scheduled',
      createTime: '2025-03-20 09:30:00',
      creator: '系统管理员',
      targetDevices: ['主入口音箱', '大厅音箱', '会议室音箱'],
    },
    {
      id: '3',
      taskName: '下班通知',
      content: '各位同事下午好，现在是下午5:30，请准时下班。',
      schedule: '2025-03-20 17:30:00',
      priority: 'normal',
      status: 'scheduled',
      createTime: '2025-03-19 17:00:00',
      creator: '系统管理员',
      targetDevices: ['主入口音箱', '大厅音箱'],
    },
  ];

  const deviceColumns = [
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
      width: 120,
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
      title: '音量',
      dataIndex: 'volume',
      key: 'volume',
      width: 100,
      render: (volume: number) => `${volume}%`,
    },
    {
      title: '上次检查时间',
      dataIndex: 'lastCheckTime',
      key: 'lastCheckTime',
      width: 180,
    },
    {
      title: '下次检查时间',
      dataIndex: 'nextCheckTime',
      key: 'nextCheckTime',
      width: 180,
    },
    {
      title: '维护人员',
      dataIndex: 'maintainer',
      key: 'maintainer',
      width: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: BroadcastDevice) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleDeviceEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDeviceDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const taskColumns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      width: 150,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 300,
    },
    {
      title: '计划时间',
      dataIndex: 'schedule',
      key: 'schedule',
      width: 180,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: string) => (
        <Tag color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}>
          {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={
          status === 'completed' ? 'success' : 
          status === 'scheduled' ? 'processing' : 
          status === 'cancelled' ? 'default' : 
          'error'
        }>
          {status === 'completed' ? '已完成' : 
           status === 'scheduled' ? '待执行' : 
           status === 'cancelled' ? '已取消' : 
           '执行失败'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 120,
    },
    {
      title: '目标设备',
      dataIndex: 'targetDevices',
      key: 'targetDevices',
      width: 200,
      render: (devices: string[]) => devices.join(', '),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: BroadcastTask) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleTaskEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleTaskDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleDeviceEdit = (record: BroadcastDevice) => {
    setEditingId(record.id);
    deviceForm.setFieldsValue(record);
    setIsDeviceModalVisible(true);
  };

  const handleDeviceDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条广播设备记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleTaskEdit = (record: BroadcastTask) => {
    setEditingId(record.id);
    taskForm.setFieldsValue(record);
    setIsTaskModalVisible(true);
  };

  const handleTaskDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条广播任务记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleDeviceModalOk = () => {
    deviceForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsDeviceModalVisible(false);
      deviceForm.resetFields();
      setEditingId(null);
      message.success(editingId ? '更新成功' : '添加成功');
    });
  };

  const handleTaskModalOk = () => {
    taskForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsTaskModalVisible(false);
      taskForm.resetFields();
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
              title="设备总数"
              value={deviceData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常设备"
              value={deviceData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日任务数"
              value={taskData.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待执行任务"
              value={taskData.filter(item => item.status === 'scheduled').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="广播设备管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDeviceModalVisible(true)}>
            添加设备
          </Button>
        }
        style={{ marginBottom: 16 }}
      >
        <Table 
          columns={deviceColumns} 
          dataSource={deviceData}
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

      <Card
        title="广播任务管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsTaskModalVisible(true)}>
            添加任务
          </Button>
        }
      >
        <Table 
          columns={taskColumns} 
          dataSource={taskData}
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
        title={editingId ? '编辑广播设备' : '添加广播设备'}
        open={isDeviceModalVisible}
        onOk={handleDeviceModalOk}
        onCancel={() => {
          setIsDeviceModalVisible(false);
          deviceForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={deviceForm}
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
              <Select.Option value="户外音箱">户外音箱</Select.Option>
              <Select.Option value="室内音箱">室内音箱</Select.Option>
              <Select.Option value="吸顶音箱">吸顶音箱</Select.Option>
              <Select.Option value="壁挂音箱">壁挂音箱</Select.Option>
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
            name="volume"
            label="音量"
            rules={[{ required: true, message: '请输入音量' }]}
          >
            <Input type="number" placeholder="请输入音量" />
          </Form.Item>
          <Form.Item
            name="lastCheckTime"
            label="上次检查时间"
            rules={[{ required: true, message: '请选择上次检查时间' }]}
          >
            <Input placeholder="请输入上次检查时间" />
          </Form.Item>
          <Form.Item
            name="nextCheckTime"
            label="下次检查时间"
            rules={[{ required: true, message: '请选择下次检查时间' }]}
          >
            <Input placeholder="请输入下次检查时间" />
          </Form.Item>
          <Form.Item
            name="maintainer"
            label="维护人员"
            rules={[{ required: true, message: '请输入维护人员' }]}
          >
            <Input placeholder="请输入维护人员" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingId ? '编辑广播任务' : '添加广播任务'}
        open={isTaskModalVisible}
        onOk={handleTaskModalOk}
        onCancel={() => {
          setIsTaskModalVisible(false);
          taskForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={taskForm}
          layout="vertical"
        >
          <Form.Item
            name="taskName"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item
            name="content"
            label="广播内容"
            rules={[{ required: true, message: '请输入广播内容' }]}
          >
            <Input.TextArea placeholder="请输入广播内容" />
          </Form.Item>
          <Form.Item
            name="schedule"
            label="计划时间"
            rules={[{ required: true, message: '请选择计划时间' }]}
          >
            <Input placeholder="请输入计划时间" />
          </Form.Item>
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="请选择优先级">
              <Select.Option value="high">高</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="low">低</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="scheduled">待执行</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
              <Select.Option value="failed">执行失败</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="targetDevices"
            label="目标设备"
            rules={[{ required: true, message: '请选择目标设备' }]}
          >
            <Select mode="multiple" placeholder="请选择目标设备">
              {deviceData.map(device => (
                <Select.Option key={device.id} value={device.deviceName}>
                  {device.deviceName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PublicBroadcast; 