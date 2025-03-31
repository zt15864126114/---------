import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';

interface Device {
  id: string;
  name: string;
  code: string;
  type: string;
  model: string;
  manufacturer: string;
  location: string;
  ipAddress: string;
  status: string;
  lastOnlineTime: string;
  createTime: string;
  updateTime: string;
}

const Device: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟设备数据
  const deviceData: Device[] = [
    {
      id: '1',
      name: '主入口人脸识别一体机',
      code: 'FACE-001',
      type: '门禁设备',
      model: 'DS-K5671-ZU',
      manufacturer: '海康威视',
      location: '园区主入口',
      ipAddress: '192.168.1.101',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-01 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '2',
      name: '东门高清监控摄像头',
      code: 'CAM-001',
      type: '监控设备',
      model: 'DH-IPC-HFW5241E-ZE',
      manufacturer: '大华技术',
      location: '园区东门',
      ipAddress: '192.168.1.102',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-02 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '3',
      name: 'A栋门禁控制器',
      code: 'CTRL-001',
      type: '门禁设备',
      model: 'DS-K2604',
      manufacturer: '海康威视',
      location: 'A栋一层大厅',
      ipAddress: '192.168.1.103',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-03 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '4',
      name: '访客登记终端',
      code: 'VIS-001',
      type: '访客设备',
      model: 'Face-X7',
      manufacturer: '旷视科技',
      location: '园区接待大厅',
      ipAddress: '192.168.1.104',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-04 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '5',
      name: '停车场入口车牌识别',
      code: 'LPR-001',
      type: '停车场设备',
      model: 'ITC215-GVRB4A',
      manufacturer: '海康威视',
      location: '地下停车场入口',
      ipAddress: '192.168.1.105',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-05 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '6',
      name: 'B栋闸机',
      code: 'GATE-001',
      type: '门禁设备',
      model: 'ZK-FBL5000',
      manufacturer: '中控智慧',
      location: 'B栋一层大厅',
      ipAddress: '192.168.1.106',
      status: 'offline',
      lastOnlineTime: '2024-03-19 18:30:00',
      createTime: '2024-01-06 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '7',
      name: '食堂入口测温设备',
      code: 'THERM-001',
      type: '安防设备',
      model: 'DS-2TD1217B',
      manufacturer: '海康威视',
      location: '员工食堂入口',
      ipAddress: '192.168.1.107',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-07 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '8',
      name: '巡更打卡点1',
      code: 'PATROL-001',
      type: '安防设备',
      model: 'ZK-D200',
      manufacturer: '中控智慧',
      location: 'A栋安全通道',
      ipAddress: '192.168.1.108',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-08 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '9',
      name: 'C栋可视对讲',
      code: 'INTERCOM-001',
      type: '门禁设备',
      model: 'VTO2202F-P',
      manufacturer: '大华技术',
      location: 'C栋一层大厅',
      ipAddress: '192.168.1.109',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-09 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '10',
      name: '停车场出口道闸',
      code: 'BARRIER-001',
      type: '停车场设备',
      model: 'ZK-BAR3000',
      manufacturer: '中控智慧',
      location: '地下停车场出口',
      ipAddress: '192.168.1.110',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-10 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '11',
      name: '园区全景摄像机',
      code: 'CAM-002',
      type: '监控设备',
      model: 'DS-2CD6924F-IS',
      manufacturer: '海康威视',
      location: '园区中心广场',
      ipAddress: '192.168.1.111',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-11 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '12',
      name: 'D栋智能门锁',
      code: 'LOCK-001',
      type: '门禁设备',
      model: 'ZK-ML100',
      manufacturer: '中控智慧',
      location: 'D栋会议室',
      ipAddress: '192.168.1.112',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-12 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '13',
      name: '西门监控球机',
      code: 'CAM-003',
      type: '监控设备',
      model: 'DH-SD6CE245U-HNI',
      manufacturer: '大华技术',
      location: '园区西门',
      ipAddress: '192.168.1.113',
      status: 'maintenance',
      lastOnlineTime: '2024-03-19 15:30:00',
      createTime: '2024-01-13 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '14',
      name: '消防控制室监控',
      code: 'CAM-004',
      type: '监控设备',
      model: 'DS-2CD2T47G1-L',
      manufacturer: '海康威视',
      location: '消防控制室',
      ipAddress: '192.168.1.114',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-14 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '15',
      name: '机房温湿度监测',
      code: 'SENSOR-001',
      type: '安防设备',
      model: 'SHT30',
      manufacturer: '中控智慧',
      location: '中心机房',
      ipAddress: '192.168.1.115',
      status: 'online',
      lastOnlineTime: '2024-03-20 10:00:00',
      createTime: '2024-01-15 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    }
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: '设备编码',
      dataIndex: 'code',
      key: 'code',
      width: 120,
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: '设备型号',
      dataIndex: 'model',
      key: 'model',
      width: 150,
    },
    {
      title: '生产厂商',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      width: 120,
    },
    {
      title: '安装位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'IP地址',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'green';
        let text = '在线';
        if (status === 'offline') {
          color = 'red';
          text = '离线';
        } else if (status === 'maintenance') {
          color = 'orange';
          text = '维护中';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '最后在线时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Device) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" icon={<SyncOutlined />} onClick={() => handleSync(record.id)}>
            同步
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Device) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleSync = (id: string) => {
    message.loading('正在同步设备信息...');
    setTimeout(() => {
      message.success('设备信息同步成功');
    }, 2000);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个设备吗？此操作不可恢复。',
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
      <Card
        title="设备管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={deviceData}
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
        title={editingId ? '编辑设备' : '添加设备'}
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
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="设备编码"
            rules={[{ required: true, message: '请输入设备编码' }]}
          >
            <Input placeholder="请输入设备编码" />
          </Form.Item>
          <Form.Item
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              <Select.Option value="门禁设备">门禁设备</Select.Option>
              <Select.Option value="监控设备">监控设备</Select.Option>
              <Select.Option value="访客设备">访客设备</Select.Option>
              <Select.Option value="停车场设备">停车场设备</Select.Option>
              <Select.Option value="安防设备">安防设备</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="model"
            label="设备型号"
            rules={[{ required: true, message: '请输入设备型号' }]}
          >
            <Input placeholder="请输入设备型号" />
          </Form.Item>
          <Form.Item
            name="manufacturer"
            label="生产厂商"
            rules={[{ required: true, message: '请选择生产厂商' }]}
          >
            <Select placeholder="请选择生产厂商">
              <Select.Option value="海康威视">海康威视</Select.Option>
              <Select.Option value="大华技术">大华技术</Select.Option>
              <Select.Option value="中控智慧">中控智慧</Select.Option>
              <Select.Option value="旷视科技">旷视科技</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="安装位置"
            rules={[{ required: true, message: '请输入安装位置' }]}
          >
            <Input placeholder="请输入安装位置" />
          </Form.Item>
          <Form.Item
            name="ipAddress"
            label="IP地址"
            rules={[
              { required: true, message: '请输入IP地址' },
              { pattern: /^(\d{1,3}\.){3}\d{1,3}$/, message: '请输入有效的IP地址' }
            ]}
          >
            <Input placeholder="请输入IP地址" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="online">在线</Select.Option>
              <Select.Option value="offline">离线</Select.Option>
              <Select.Option value="maintenance">维护中</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Device; 