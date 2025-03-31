import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface DeviceType {
  id: string;
  name: string;
  code: string;
  category: string;
  manufacturer: string;
  description: string;
  status: string;
  createTime: string;
  updateTime: string;
}

const DeviceType: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟设备类型数据
  const deviceTypeData: DeviceType[] = [
    {
      id: '1',
      name: '人脸识别一体机',
      code: 'FACE-RECOG-001',
      category: '门禁设备',
      manufacturer: '海康威视',
      description: '支持人脸识别、身份证读取、活体检测的门禁一体机',
      status: 'active',
      createTime: '2024-01-01 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '2',
      name: '高清监控摄像头',
      code: 'CAM-HD-001',
      category: '监控设备',
      manufacturer: '大华技术',
      description: '200万像素高清网络摄像机，支持夜视和移动侦测',
      status: 'active',
      createTime: '2024-01-02 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '3',
      name: '智能门禁控制器',
      code: 'ACCESS-CTRL-001',
      category: '门禁设备',
      manufacturer: '海康威视',
      description: '支持多种开门方式，可联网管理的门禁控制器',
      status: 'active',
      createTime: '2024-01-03 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '4',
      name: '访客登记一体机',
      code: 'VISITOR-REG-001',
      category: '访客设备',
      manufacturer: '旷视科技',
      description: '支持人证核验、访客登记、健康码识别的访客管理设备',
      status: 'active',
      createTime: '2024-01-04 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '5',
      name: '车牌识别摄像机',
      code: 'LPR-CAM-001',
      category: '停车场设备',
      manufacturer: '大华技术',
      description: '支持车牌自动识别、车辆抓拍的专业摄像机',
      status: 'active',
      createTime: '2024-01-05 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '6',
      name: '智能闸机',
      code: 'GATE-001',
      category: '门禁设备',
      manufacturer: '中控智慧',
      description: '支持人脸识别、二维码扫描的智能通道闸',
      status: 'active',
      createTime: '2024-01-06 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '7',
      name: '红外热成像仪',
      code: 'THERM-CAM-001',
      category: '监控设备',
      manufacturer: '海康威视',
      description: '支持体温检测、人流量统计的热成像摄像机',
      status: 'active',
      createTime: '2024-01-07 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '8',
      name: '智能巡更终端',
      code: 'PATROL-001',
      category: '安防设备',
      manufacturer: '中控智慧',
      description: '支持NFC打卡、实时定位的智能巡更设备',
      status: 'active',
      createTime: '2024-01-08 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '9',
      name: '可视对讲门禁',
      code: 'VIDEO-INT-001',
      category: '门禁设备',
      manufacturer: '大华技术',
      description: '支持可视对讲、远程开门的智能门禁设备',
      status: 'active',
      createTime: '2024-01-09 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '10',
      name: '停车场道闸',
      code: 'PARK-GATE-001',
      category: '停车场设备',
      manufacturer: '中控智慧',
      description: '支持自动抬杆、防砸车的智能道闸',
      status: 'active',
      createTime: '2024-01-10 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '11',
      name: '全景摄像机',
      code: 'CAM-PANO-001',
      category: '监控设备',
      manufacturer: '海康威视',
      description: '360度无死角监控，支持电子云台',
      status: 'active',
      createTime: '2024-01-11 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    },
    {
      id: '12',
      name: '智能门锁',
      code: 'SMART-LOCK-001',
      category: '门禁设备',
      manufacturer: '中控智慧',
      description: '支持指纹、密码、刷卡等多种开门方式',
      status: 'active',
      createTime: '2024-01-12 00:00:00',
      updateTime: '2024-03-20 10:00:00',
    }
  ];

  const columns = [
    {
      title: '设备类型名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '类型编码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
    },
    {
      title: '设备类别',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '生产厂商',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      width: 120,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? '启用' : '禁用'}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: DeviceType) => (
        <Space size="middle">
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

  const handleEdit = (record: DeviceType) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个设备类型吗？此操作不可恢复。',
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
        title="设备类型管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备类型
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={deviceTypeData}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      <Modal
        title={editingId ? '编辑设备类型' : '添加设备类型'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="设备类型名称"
            rules={[{ required: true, message: '请输入设备类型名称' }]}
          >
            <Input placeholder="请输入设备类型名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="类型编码"
            rules={[{ required: true, message: '请输入类型编码' }]}
          >
            <Input placeholder="请输入类型编码" />
          </Form.Item>
          <Form.Item
            name="category"
            label="设备类别"
            rules={[{ required: true, message: '请选择设备类别' }]}
          >
            <Select placeholder="请选择设备类别">
              <Select.Option value="门禁设备">门禁设备</Select.Option>
              <Select.Option value="监控设备">监控设备</Select.Option>
              <Select.Option value="访客设备">访客设备</Select.Option>
              <Select.Option value="停车场设备">停车场设备</Select.Option>
              <Select.Option value="安防设备">安防设备</Select.Option>
            </Select>
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
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceType; 