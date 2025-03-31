import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface AccessDevice {
  id: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  type: string;
  status: string;
  ipAddress: string;
  lastMaintenanceTime: string;
  nextMaintenanceTime: string;
  maintainer: string;
  description: string;
}

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  checkInTime: string;
  checkOutTime: string;
  status: string;
  deviceName: string;
  deviceCode: string;
  createTime: string;
}

const AccessControl: React.FC = () => {
  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
  const [deviceForm] = Form.useForm();
  const [attendanceForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟门禁设备数据
  const deviceData: AccessDevice[] = [
    {
      id: '1',
      deviceName: 'A栋一层门禁',
      deviceCode: 'AC-A-001',
      location: 'A栋一层大厅',
      type: '人脸识别门禁',
      status: 'normal',
      ipAddress: '192.168.1.100',
      lastMaintenanceTime: '2025-03-20 09:00:00',
      nextMaintenanceTime: '2025-04-20 09:00:00',
      maintainer: '张工',
      description: '人脸识别门禁设备',
    },
    {
      id: '2',
      deviceName: 'B栋二层门禁',
      deviceCode: 'AC-B-001',
      location: 'B栋二层走廊',
      type: '人脸识别门禁',
      status: 'warning',
      ipAddress: '192.168.1.101',
      lastMaintenanceTime: '2025-03-19 14:30:00',
      nextMaintenanceTime: '2025-04-19 14:30:00',
      maintainer: '李工',
      description: '人脸识别门禁设备',
    },
    {
      id: '3',
      deviceName: 'C栋一层门禁',
      deviceCode: 'AC-C-001',
      location: 'C栋一层大厅',
      type: '人脸识别门禁',
      status: 'normal',
      ipAddress: '192.168.1.102',
      lastMaintenanceTime: '2025-03-18 10:00:00',
      nextMaintenanceTime: '2025-04-18 10:00:00',
      maintainer: '王工',
      description: '人脸识别门禁设备',
    },
  ];

  // 模拟考勤记录数据
  const attendanceData: AttendanceRecord[] = [
    {
      id: '1',
      employeeName: '张三',
      employeeCode: 'EMP001',
      department: '技术部',
      checkInTime: '2025-03-20 08:30:00',
      checkOutTime: '2025-03-20 17:30:00',
      status: 'normal',
      deviceName: 'A栋一层门禁',
      deviceCode: 'AC-A-001',
      createTime: '2025-03-20 08:30:00',
    },
    {
      id: '2',
      employeeName: '李四',
      employeeCode: 'EMP002',
      department: '销售部',
      checkInTime: '2025-03-20 09:15:00',
      checkOutTime: '2025-03-20 18:15:00',
      status: 'late',
      deviceName: 'B栋二层门禁',
      deviceCode: 'AC-B-001',
      createTime: '2025-03-20 09:15:00',
    },
    {
      id: '3',
      employeeName: '王五',
      employeeCode: 'EMP003',
      department: '人事部',
      checkInTime: '2025-03-20 08:45:00',
      checkOutTime: '2025-03-20 17:45:00',
      status: 'normal',
      deviceName: 'C栋一层门禁',
      deviceCode: 'AC-C-001',
      createTime: '2025-03-20 08:45:00',
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
      render: (_: any, record: AccessDevice) => (
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

  const attendanceColumns = [
    {
      title: '员工姓名',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 100,
    },
    {
      title: '员工编号',
      dataIndex: 'employeeCode',
      key: 'employeeCode',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '签到时间',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      width: 180,
    },
    {
      title: '签退时间',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'normal' ? 'success' : status === 'late' ? 'warning' : 'error'}>
          {status === 'normal' ? '正常' : status === 'late' ? '迟到' : '早退'}
        </Tag>
      ),
    },
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: AttendanceRecord) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleAttendanceEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleAttendanceDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleDeviceEdit = (record: AccessDevice) => {
    setEditingId(record.id);
    deviceForm.setFieldsValue(record);
    setIsDeviceModalVisible(true);
  };

  const handleDeviceDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条门禁设备记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleAttendanceEdit = (record: AttendanceRecord) => {
    setEditingId(record.id);
    attendanceForm.setFieldsValue(record);
    setIsAttendanceModalVisible(true);
  };

  const handleAttendanceDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条考勤记录吗？此操作不可恢复。',
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

  const handleAttendanceModalOk = () => {
    attendanceForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsAttendanceModalVisible(false);
      attendanceForm.resetFields();
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
              title="门禁设备总数"
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
              title="今日考勤人数"
              value={attendanceData.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="迟到人数"
              value={attendanceData.filter(item => item.status === 'late').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="门禁设备管理"
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
        title="考勤记录管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAttendanceModalVisible(true)}>
            添加记录
          </Button>
        }
      >
        <Table 
          columns={attendanceColumns} 
          dataSource={attendanceData}
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
        title={editingId ? '编辑门禁设备' : '添加门禁设备'}
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
              <Select.Option value="人脸识别门禁">人脸识别门禁</Select.Option>
              <Select.Option value="指纹识别门禁">指纹识别门禁</Select.Option>
              <Select.Option value="IC卡门禁">IC卡门禁</Select.Option>
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
        title={editingId ? '编辑考勤记录' : '添加考勤记录'}
        open={isAttendanceModalVisible}
        onOk={handleAttendanceModalOk}
        onCancel={() => {
          setIsAttendanceModalVisible(false);
          attendanceForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={attendanceForm}
          layout="vertical"
        >
          <Form.Item
            name="employeeName"
            label="员工姓名"
            rules={[{ required: true, message: '请输入员工姓名' }]}
          >
            <Input placeholder="请输入员工姓名" />
          </Form.Item>
          <Form.Item
            name="employeeCode"
            label="员工编号"
            rules={[{ required: true, message: '请输入员工编号' }]}
          >
            <Input placeholder="请输入员工编号" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input placeholder="请输入部门" />
          </Form.Item>
          <Form.Item
            name="checkInTime"
            label="签到时间"
            rules={[{ required: true, message: '请选择签到时间' }]}
          >
            <Input placeholder="请输入签到时间" />
          </Form.Item>
          <Form.Item
            name="checkOutTime"
            label="签退时间"
            rules={[{ required: true, message: '请选择签退时间' }]}
          >
            <Input placeholder="请输入签退时间" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="late">迟到</Select.Option>
              <Select.Option value="early">早退</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="deviceName"
            label="设备名称"
            rules={[{ required: true, message: '请选择设备' }]}
          >
            <Select placeholder="请选择设备">
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

export default AccessControl; 