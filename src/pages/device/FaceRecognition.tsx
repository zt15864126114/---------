import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined, SettingOutlined } from '@ant-design/icons';

interface FaceDevice {
  id: string;
  name: string;
  code: string;
  location: string;
  deviceType: string;
  deviceModel: string;
  recognitionType: string[];
  accuracy: number;
  status: string;
  lastSync: string;
  createTime: string;
  updateTime: string;
}

const FaceRecognition: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟人脸识别设备数据
  const faceDeviceData: FaceDevice[] = [
    {
      id: '1',
      name: '主入口人脸识别',
      code: 'FACE-MAIN-001',
      location: '园区主入口',
      deviceType: '人脸识别一体机',
      deviceModel: 'DS-K5671-ZU',
      recognitionType: ['人脸', '身份证'],
      accuracy: 99.5,
      status: 'normal',
      lastSync: '2025-03-20 09:55:00',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '2',
      name: 'A栋大厅人脸识别',
      code: 'FACE-A-001',
      location: 'A栋一层大厅',
      deviceType: '人脸识别终端',
      deviceModel: 'DS-K1T671M',
      recognitionType: ['人脸'],
      accuracy: 99.0,
      status: 'normal',
      lastSync: '2025-03-20 09:45:00',
      createTime: '2025-03-02 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '3',
      name: 'B栋闸机人脸识别',
      code: 'FACE-B-001',
      location: 'B栋一层大厅',
      deviceType: '人证核验一体机',
      deviceModel: 'DS-K5671-Z',
      recognitionType: ['人脸', '身份证', '工卡'],
      accuracy: 99.8,
      status: 'fault',
      lastSync: '2025-03-19 18:30:00',
      createTime: '2025-03-03 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '4',
      name: '食堂人脸识别',
      code: 'FACE-CANT-001',
      location: '员工食堂入口',
      deviceType: '人脸识别终端',
      deviceModel: 'DS-K1T671M',
      recognitionType: ['人脸', '工卡'],
      accuracy: 99.0,
      status: 'normal',
      lastSync: '2025-03-20 09:30:00',
      createTime: '2025-03-04 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '5',
      name: '档案室人脸识别',
      code: 'FACE-FILE-001',
      location: 'A栋三层档案室',
      deviceType: '人证核验一体机',
      deviceModel: 'DS-K5671-Z',
      recognitionType: ['人脸', '身份证', '工卡'],
      accuracy: 99.8,
      status: 'normal',
      lastSync: '2025-03-20 09:20:00',
      createTime: '2025-03-05 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '6',
      name: '机房人脸识别',
      code: 'FACE-SERVER-001',
      location: 'B栋负一层机房',
      deviceType: '人证核验一体机',
      deviceModel: 'DS-K5671-Z',
      recognitionType: ['人脸', '身份证', '工卡'],
      accuracy: 99.8,
      status: 'normal',
      lastSync: '2025-03-20 09:15:00',
      createTime: '2025-03-06 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '7',
      name: '后勤仓库人脸识别',
      code: 'FACE-STORE-001',
      location: 'C栋负一层仓库',
      deviceType: '人脸识别终端',
      deviceModel: 'DS-K1T671M',
      recognitionType: ['人脸', '工卡'],
      accuracy: 99.0,
      status: 'maintenance',
      lastSync: '2025-03-20 09:10:00',
      createTime: '2025-03-07 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '8',
      name: '员工通道人脸识别',
      code: 'FACE-STAFF-001',
      location: '园区侧门',
      deviceType: '人脸识别一体机',
      deviceModel: 'DS-K5671-ZU',
      recognitionType: ['人脸', '身份证'],
      accuracy: 99.5,
      status: 'normal',
      lastSync: '2025-03-20 09:05:00',
      createTime: '2025-03-20 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    }
  ];

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '设备编号',
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
      width: 150,
    },
    {
      title: '设备型号',
      dataIndex: 'deviceModel',
      key: 'deviceModel',
      width: 120,
    },
    {
      title: '识别方式',
      dataIndex: 'recognitionType',
      key: 'recognitionType',
      width: 200,
      render: (types: string[]) => (
        <Space size={[0, 8]} wrap>
          {types.map((type) => (
            <Tag color="blue" key={type}>
              {type}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '识别准确率',
      dataIndex: 'accuracy',
      key: 'accuracy',
      width: 100,
      render: (accuracy: number) => `${accuracy}%`,
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
      title: '最后同步时间',
      dataIndex: 'lastSync',
      key: 'lastSync',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: FaceDevice) => (
        <Space size="middle">
          <Button type="link" icon={<SyncOutlined />} onClick={() => handleSync(record.id)}>
            同步
          </Button>
          <Button type="link" icon={<SettingOutlined />} onClick={() => handleConfig(record.id)}>
            配置
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

  const handleEdit = (record: FaceDevice) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleSync = (id: string) => {
    message.loading('正在同步数据...');
    setTimeout(() => {
      message.success('同步成功');
    }, 2000);
  };

  const handleConfig = (id: string) => {
    message.info('打开配置窗口');
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个人脸识别设备吗？此操作不可恢复。',
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
              title="在线设备"
              value={faceDeviceData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="故障设备"
              value={faceDeviceData.filter(item => item.status === 'fault').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="维护中设备"
              value={faceDeviceData.filter(item => item.status === 'maintenance').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总设备数"
              value={faceDeviceData.length}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="人脸识别设备管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加设备
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={faceDeviceData}
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
            name="deviceType"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              <Select.Option value="人脸识别一体机">人脸识别一体机</Select.Option>
              <Select.Option value="人脸识别终端">人脸识别终端</Select.Option>
              <Select.Option value="人证核验一体机">人证核验一体机</Select.Option>
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
            name="recognitionType"
            label="识别方式"
            rules={[{ required: true, message: '请选择识别方式' }]}
          >
            <Select mode="multiple" placeholder="请选择识别方式">
              <Select.Option value="人脸">人脸</Select.Option>
              <Select.Option value="身份证">身份证</Select.Option>
              <Select.Option value="工卡">工卡</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="accuracy"
            label="识别准确率"
            rules={[{ required: true, message: '请输入识别准确率' }]}
          >
            <Select placeholder="请选择识别准确率">
              <Select.Option value={99.0}>99.0%</Select.Option>
              <Select.Option value={99.5}>99.5%</Select.Option>
              <Select.Option value={99.8}>99.8%</Select.Option>
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

export default FaceRecognition; 