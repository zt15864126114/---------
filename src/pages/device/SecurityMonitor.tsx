import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';

interface SecurityMonitor {
  id: string;
  name: string;
  code: string;
  location: string;
  deviceType: string;
  deviceModel: string;
  resolution: string;
  storageTime: number;
  status: string;
  lastMaintenance: string;
  createTime: string;
  updateTime: string;
}

const SecurityMonitor: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟监控数据
  const monitorData: SecurityMonitor[] = [
    {
      id: '1',
      name: '主入口监控',
      code: 'CAM-MAIN-001',
      location: '园区主入口',
      deviceType: '球机',
      deviceModel: 'DS-2DC6223IW-A',
      resolution: '4K',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-15',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '2',
      name: 'A栋大厅监控',
      code: 'CAM-A-001',
      location: 'A栋一层大厅',
      deviceType: '半球',
      deviceModel: 'DS-2CD3345-I',
      resolution: '4MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-16',
      createTime: '2025-03-02 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '3',
      name: 'B栋走廊监控',
      code: 'CAM-B-001',
      location: 'B栋一层走廊',
      deviceType: '半球',
      deviceModel: 'DS-2CD3345-I',
      resolution: '4MP',
      storageTime: 30,
      status: 'fault',
      lastMaintenance: '2025-03-10',
      createTime: '2025-03-03 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '4',
      name: '停车场入口监控',
      code: 'CAM-PARK-001',
      location: '地下停车场入口',
      deviceType: '枪机',
      deviceModel: 'DS-2CD5A26G0-IZ',
      resolution: '2MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-17',
      createTime: '2025-03-04 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '5',
      name: '食堂监控',
      code: 'CAM-CANT-001',
      location: '员工食堂',
      deviceType: '全景',
      deviceModel: 'DS-2CD6924F-IS',
      resolution: '8MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-18',
      createTime: '2025-03-05 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '6',
      name: '档案室监控',
      code: 'CAM-FILE-001',
      location: 'A栋三层档案室',
      deviceType: '半球',
      deviceModel: 'DS-2CD3345-I',
      resolution: '4MP',
      storageTime: 90,
      status: 'normal',
      lastMaintenance: '2025-03-19',
      createTime: '2025-03-06 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '7',
      name: '机房监控',
      code: 'CAM-SERVER-001',
      location: 'B栋负一层机房',
      deviceType: '半球',
      deviceModel: 'DS-2CD3345-I',
      resolution: '4MP',
      storageTime: 90,
      status: 'normal',
      lastMaintenance: '2025-03-20',
      createTime: '2025-03-07 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '8',
      name: '后勤仓库监控',
      code: 'CAM-STORE-001',
      location: 'C栋负一层仓库',
      deviceType: '枪机',
      deviceModel: 'DS-2CD5A26G0-IZ',
      resolution: '2MP',
      storageTime: 30,
      status: 'maintenance',
      lastMaintenance: '2025-03-20',
      createTime: '2025-03-20 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '9',
      name: '消防通道监控',
      code: 'CAM-FIRE-001',
      location: 'A栋安全通道',
      deviceType: '半球',
      deviceModel: 'DS-2CD3345-I',
      resolution: '4MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-14',
      createTime: '2025-03-09 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '10',
      name: '员工通道监控',
      code: 'CAM-STAFF-001',
      location: '园区侧门',
      deviceType: '枪机',
      deviceModel: 'DS-2CD5A26G0-IZ',
      resolution: '2MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-13',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '11',
      name: '园区周界监控1',
      code: 'CAM-PERI-001',
      location: '园区东北角',
      deviceType: '枪机',
      deviceModel: 'DS-2CD5A26G0-IZ',
      resolution: '2MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-12',
      createTime: '2025-03-11 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '12',
      name: '园区周界监控2',
      code: 'CAM-PERI-002',
      location: '园区东南角',
      deviceType: '枪机',
      deviceModel: 'DS-2CD5A26G0-IZ',
      resolution: '2MP',
      storageTime: 30,
      status: 'normal',
      lastMaintenance: '2025-03-11',
      createTime: '2025-03-12 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    }
  ];

  const columns = [
    {
      title: '监控名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '监控编号',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 100,
    },
    {
      title: '设备型号',
      dataIndex: 'deviceModel',
      key: 'deviceModel',
      width: 150,
    },
    {
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
      width: 100,
    },
    {
      title: '存储时间(天)',
      dataIndex: 'storageTime',
      key: 'storageTime',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'green';
        let text = '正常';
        if (status === 'fault') {
          color = 'red';
          text = '故障';
        } else if (status === 'maintenance') {
          color = 'orange';
          text = '维护中';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '最后维护时间',
      dataIndex: 'lastMaintenance',
      key: 'lastMaintenance',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: SecurityMonitor) => (
        <Space size="middle">
          <Button type="link" icon={<PlayCircleOutlined />} onClick={() => handlePreview(record.id)}>
            预览
          </Button>
          <Button type="link" icon={<VideoCameraOutlined />} onClick={() => handlePlayback(record.id)}>
            回放
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

  const handleEdit = (record: SecurityMonitor) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handlePreview = (id: string) => {
    message.info('打开预览窗口');
  };

  const handlePlayback = (id: string) => {
    message.info('打开回放窗口');
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个监控设备吗？此操作不可恢复。',
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
              title="在线监控"
              value={monitorData.filter(item => item.status === 'normal').length}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障监控"
              value={monitorData.filter(item => item.status === 'fault').length}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="维护中监控"
              value={monitorData.filter(item => item.status === 'maintenance').length}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总监控数"
              value={monitorData.length}
              prefix={<VideoCameraOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="监控管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加监控
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={monitorData}
          rowKey="id"
          scroll={{ x: 1800 }}
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑监控' : '添加监控'}
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
            name="name"
            label="监控名称"
            rules={[{ required: true, message: '请输入监控名称' }]}
          >
            <Input placeholder="请输入监控名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="监控编号"
            rules={[{ required: true, message: '请输入监控编号' }]}
          >
            <Input placeholder="请输入监控编号" />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input placeholder="请输入位置" />
          </Form.Item>
          <Form.Item
            name="deviceType"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              <Select.Option value="球机">球机</Select.Option>
              <Select.Option value="半球">半球</Select.Option>
              <Select.Option value="枪机">枪机</Select.Option>
              <Select.Option value="全景">全景</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="deviceModel"
            label="设备型号"
            rules={[{ required: true, message: '请输入设备型号' }]}
          >
            <Input placeholder="请输入设备型号" />
          </Form.Item>
          <Form.Item
            name="resolution"
            label="分辨率"
            rules={[{ required: true, message: '请选择分辨率' }]}
          >
            <Select placeholder="请选择分辨率">
              <Select.Option value="2MP">2MP</Select.Option>
              <Select.Option value="4MP">4MP</Select.Option>
              <Select.Option value="8MP">8MP</Select.Option>
              <Select.Option value="4K">4K</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="storageTime"
            label="存储时间(天)"
            rules={[{ required: true, message: '请选择存储时间' }]}
          >
            <Select placeholder="请选择存储时间">
              <Select.Option value={30}>30天</Select.Option>
              <Select.Option value={60}>60天</Select.Option>
              <Select.Option value={90}>90天</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="fault">故障</Select.Option>
              <Select.Option value="maintenance">维护中</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SecurityMonitor; 