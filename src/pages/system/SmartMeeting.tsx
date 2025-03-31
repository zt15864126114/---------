import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface MeetingRoom {
  id: string;
  roomName: string;
  roomCode: string;
  location: string;
  capacity: number;
  equipment: string[];
  status: string;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
}

interface MeetingRecord {
  id: string;
  meetingName: string;
  roomName: string;
  roomCode: string;
  organizer: string;
  department: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  status: string;
  createTime: string;
}

const SmartMeeting: React.FC = () => {
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [isMeetingModalVisible, setIsMeetingModalVisible] = useState(false);
  const [roomForm] = Form.useForm();
  const [meetingForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟会议室数据
  const roomData: MeetingRoom[] = [
    {
      id: '1',
      roomName: 'A栋101会议室',
      roomCode: 'MR-A-101',
      location: 'A栋一层',
      capacity: 20,
      equipment: ['投影仪', '音响', '视频会议系统'],
      status: 'normal',
      lastMaintenanceTime: '2025-03-20 09:00:00',
      nextMaintenanceTime: '2025-04-20 09:00:00',
      maintainer: '张工',
      description: '标准会议室',
    },
    {
      id: '2',
      roomName: 'B栋201会议室',
      roomCode: 'MR-B-201',
      location: 'B栋二层',
      capacity: 30,
      equipment: ['投影仪', '音响', '视频会议系统', '电子白板'],
      status: 'warning',
      lastMaintenanceTime: '2025-03-19 14:30:00',
      nextMaintenanceTime: '2025-04-19 14:30:00',
      maintainer: '李工',
      description: '大型会议室',
    },
    {
      id: '3',
      roomName: 'C栋301会议室',
      roomCode: 'MR-C-301',
      location: 'C栋三层',
      capacity: 15,
      equipment: ['投影仪', '音响', '视频会议系统'],
      status: 'normal',
      lastMaintenanceTime: '2025-03-18 10:00:00',
      nextMaintenanceTime: '2025-04-18 10:00:00',
      maintainer: '王工',
      description: '小型会议室',
    },
  ];

  // 模拟会议记录数据
  const meetingData: MeetingRecord[] = [
    {
      id: '1',
      meetingName: '项目周会',
      roomName: 'A栋101会议室',
      roomCode: 'MR-A-101',
      organizer: '李明华',
      department: '技术部',
      startTime: '2025-03-20 09:00:00',
      endTime: '2025-03-20 10:00:00',
      attendees: ['李明华', '王柳', '王五'],
      status: 'completed',
      createTime: '2025-03-19 14:30:00',
    },
    {
      id: '2',
      meetingName: '部门会议',
      roomName: 'B栋201会议室',
      roomCode: 'MR-B-201',
      organizer: '王柳',
      department: '销售部',
      startTime: '2025-03-20 14:00:00',
      endTime: '2025-03-20 15:30:00',
      attendees: ['王柳', '赵六', '钱七'],
      status: 'scheduled',
      createTime: '2025-03-19 16:00:00',
    },
    {
      id: '3',
      meetingName: '培训会议',
      roomName: 'C栋301会议室',
      roomCode: 'MR-C-301',
      organizer: '王五',
      department: '人事部',
      startTime: '2025-03-21 09:00:00',
      endTime: '2025-03-21 11:00:00',
      attendees: ['王五', '孙八', '周九'],
      status: 'scheduled',
      createTime: '2025-03-19 17:30:00',
    },
  ];

  const roomColumns = [
    {
      title: '会议室名称',
      dataIndex: 'roomName',
      key: 'roomName',
      width: 150,
    },
    {
      title: '会议室编号',
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: 120,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 100,
      render: (capacity: number) => `${capacity}人`,
    },
    {
      title: '设备',
      dataIndex: 'equipment',
      key: 'equipment',
      width: 200,
      render: (equipment: string[]) => equipment.join(', '),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'success' : status === 'warning' ? 'warning' : 'error'}>
          {status === 'normal' ? '正常' : status === 'warning' ? '维护中' : '故障'}
        </Tag>
      ),
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
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: MeetingRoom) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleRoomEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleRoomDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const meetingColumns = [
    {
      title: '会议名称',
      dataIndex: 'meetingName',
      key: 'meetingName',
      width: 150,
    },
    {
      title: '会议室',
      dataIndex: 'roomName',
      key: 'roomName',
      width: 150,
    },
    {
      title: '会议室编号',
      dataIndex: 'roomCode',
      key: 'roomCode',
      width: 120,
    },
    {
      title: '组织者',
      dataIndex: 'organizer',
      key: 'organizer',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 180,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 180,
    },
    {
      title: '参会人员',
      dataIndex: 'attendees',
      key: 'attendees',
      width: 200,
      render: (attendees: string[]) => attendees.join(', '),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'success' : status === 'scheduled' ? 'processing' : 'error'}>
          {status === 'completed' ? '已完成' : status === 'scheduled' ? '已预约' : '已取消'}
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
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: MeetingRecord) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleMeetingEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleMeetingDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleRoomEdit = (record: MeetingRoom) => {
    setEditingId(record.id);
    roomForm.setFieldsValue(record);
    setIsRoomModalVisible(true);
  };

  const handleRoomDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条会议室记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleMeetingEdit = (record: MeetingRecord) => {
    setEditingId(record.id);
    meetingForm.setFieldsValue(record);
    setIsMeetingModalVisible(true);
  };

  const handleMeetingDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条会议记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleRoomModalOk = () => {
    roomForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsRoomModalVisible(false);
      roomForm.resetFields();
      setEditingId(null);
      message.success(editingId ? '更新成功' : '添加成功');
    });
  };

  const handleMeetingModalOk = () => {
    meetingForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsMeetingModalVisible(false);
      meetingForm.resetFields();
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
              title="会议室总数"
              value={roomData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常会议室"
              value={roomData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日会议数"
              value={meetingData.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已预约会议"
              value={meetingData.filter(item => item.status === 'scheduled').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="会议室管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsRoomModalVisible(true)}>
            添加会议室
          </Button>
        }
        style={{ marginBottom: 16 }}
      >
        <Table 
          columns={roomColumns} 
          dataSource={roomData}
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
        title="会议记录管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsMeetingModalVisible(true)}>
            添加会议
          </Button>
        }
      >
        <Table 
          columns={meetingColumns} 
          dataSource={meetingData}
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
        title={editingId ? '编辑会议室' : '添加会议室'}
        open={isRoomModalVisible}
        onOk={handleRoomModalOk}
        onCancel={() => {
          setIsRoomModalVisible(false);
          roomForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={roomForm}
          layout="vertical"
        >
          <Form.Item
            name="roomName"
            label="会议室名称"
            rules={[{ required: true, message: '请输入会议室名称' }]}
          >
            <Input placeholder="请输入会议室名称" />
          </Form.Item>
          <Form.Item
            name="roomCode"
            label="会议室编号"
            rules={[{ required: true, message: '请输入会议室编号' }]}
          >
            <Input placeholder="请输入会议室编号" />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input placeholder="请输入位置" />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="容量"
            rules={[{ required: true, message: '请输入容量' }]}
          >
            <Input type="number" placeholder="请输入容量" />
          </Form.Item>
          <Form.Item
            name="equipment"
            label="设备"
            rules={[{ required: true, message: '请选择设备' }]}
          >
            <Select mode="multiple" placeholder="请选择设备">
              <Select.Option value="投影仪">投影仪</Select.Option>
              <Select.Option value="音响">音响</Select.Option>
              <Select.Option value="视频会议系统">视频会议系统</Select.Option>
              <Select.Option value="电子白板">电子白板</Select.Option>
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
              <Select.Option value="warning">维护中</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
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
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingId ? '编辑会议' : '添加会议'}
        open={isMeetingModalVisible}
        onOk={handleMeetingModalOk}
        onCancel={() => {
          setIsMeetingModalVisible(false);
          meetingForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={meetingForm}
          layout="vertical"
        >
          <Form.Item
            name="meetingName"
            label="会议名称"
            rules={[{ required: true, message: '请输入会议名称' }]}
          >
            <Input placeholder="请输入会议名称" />
          </Form.Item>
          <Form.Item
            name="roomName"
            label="会议室"
            rules={[{ required: true, message: '请选择会议室' }]}
          >
            <Select placeholder="请选择会议室">
              {roomData.map(room => (
                <Select.Option key={room.id} value={room.roomName}>
                  {room.roomName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="organizer"
            label="组织者"
            rules={[{ required: true, message: '请输入组织者' }]}
          >
            <Input placeholder="请输入组织者" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input placeholder="请输入部门" />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="开始时间"
            rules={[{ required: true, message: '请选择开始时间' }]}
          >
            <Input placeholder="请输入开始时间" />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="结束时间"
            rules={[{ required: true, message: '请选择结束时间' }]}
          >
            <Input placeholder="请输入结束时间" />
          </Form.Item>
          <Form.Item
            name="attendees"
            label="参会人员"
            rules={[{ required: true, message: '请选择参会人员' }]}
          >
            <Select mode="multiple" placeholder="请选择参会人员">
              <Select.Option value="李明华">李明华</Select.Option>
              <Select.Option value="王柳">王柳</Select.Option>
              <Select.Option value="王五">王五</Select.Option>
              <Select.Option value="赵六">赵六</Select.Option>
              <Select.Option value="钱七">钱七</Select.Option>
              <Select.Option value="孙八">孙八</Select.Option>
              <Select.Option value="周九">周九</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="scheduled">已预约</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SmartMeeting; 