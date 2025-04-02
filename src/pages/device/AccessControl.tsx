import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined, UnlockOutlined, LockOutlined } from '@ant-design/icons';

interface AccessControl {
  id: string;
  name: string;
  code: string;
  location: string;
  deviceType: string;
  deviceModel: string;
  openType: string[];
  status: string;
  lastOpenTime: string;
  lastOpenUser: string;
  createTime: string;
  updateTime: string;
}

const AccessControl: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟门禁数据
  const accessControlData: AccessControl[] = [
    {
      id: '1',
      name: '主入口门禁',
      code: 'AC-MAIN-001',
      location: '园区主入口',
      deviceType: '人脸识别一体机',
      deviceModel: 'DS-K5671-ZU',
      openType: ['人脸识别', '刷卡', '密码'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:55:00',
      lastOpenUser: '张经理',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '2',
      name: 'A栋大厅门禁',
      code: 'AC-A-001',
      location: 'A栋一层大厅',
      deviceType: '门禁控制器',
      deviceModel: 'DS-K2604',
      openType: ['刷卡', '密码'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:45:00',
      lastOpenUser: '李工程师',
      createTime: '2025-03-02 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '3',
      name: 'B栋闸机',
      code: 'AC-B-001',
      location: 'B栋一层大厅',
      deviceType: '智能闸机',
      deviceModel: 'ZK-FBL5000',
      openType: ['人脸识别', '刷卡'],
      status: 'fault',
      lastOpenTime: '2025-03-19 18:30:00',
      lastOpenUser: '王主管',
      createTime: '2025-03-03 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '4',
      name: 'C栋会议室',
      code: 'AC-C-001',
      location: 'C栋二层会议室',
      deviceType: '智能门锁',
      deviceModel: 'ZK-ML100',
      openType: ['密码', '指纹', '刷卡'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:30:00',
      lastOpenUser: '陈经理',
      createTime: '2025-03-04 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '5',
      name: '食堂入口',
      code: 'AC-CANT-001',
      location: '员工食堂入口',
      deviceType: '人脸识别一体机',
      deviceModel: 'DS-K5671-ZU',
      openType: ['人脸识别'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:20:00',
      lastOpenUser: '赵员工',
      createTime: '2025-03-05 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '6',
      name: '档案室门禁',
      code: 'AC-FILE-001',
      location: 'A栋三层档案室',
      deviceType: '指纹门禁',
      deviceModel: 'ZK-F18',
      openType: ['指纹', '密码'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:15:00',
      lastOpenUser: '吴档案员',
      createTime: '2025-03-06 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '7',
      name: '机房门禁',
      code: 'AC-SERVER-001',
      location: 'B栋负一层机房',
      deviceType: '多功能门禁',
      deviceModel: 'DS-K1T671M',
      openType: ['人脸识别', '密码', '刷卡'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:10:00',
      lastOpenUser: '郑工程师',
      createTime: '2025-03-07 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '8',
      name: '后勤仓库',
      code: 'AC-STORE-001',
      location: 'C栋负一层仓库',
      deviceType: '门禁控制器',
      deviceModel: 'DS-K2604',
      openType: ['刷卡', '密码'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:05:00',
      lastOpenUser: '孙仓管',
      createTime: '2025-03-20 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '9',
      name: '消防通道',
      code: 'AC-FIRE-001',
      location: 'A栋安全通道',
      deviceType: '紧急门禁',
      deviceModel: 'DS-K1T804MF',
      openType: ['刷卡', '应急按钮'],
      status: 'normal',
      lastOpenTime: '2025-03-20 09:00:00',
      lastOpenUser: '周安全员',
      createTime: '2025-03-09 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    },
    {
      id: '10',
      name: '员工通道',
      code: 'AC-STAFF-001',
      location: '园区侧门',
      deviceType: '人脸识别一体机',
      deviceModel: 'DS-K5671-ZU',
      openType: ['人脸识别', '刷卡'],
      status: 'normal',
      lastOpenTime: '2025-03-20 08:55:00',
      lastOpenUser: '钱员工',
      createTime: '2025-03-10 00:00:00',
      updateTime: '2025-03-20 10:00:00',
    }
  ];

  const columns = [
    {
      title: '门禁名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '门禁编号',
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
      title: '开门方式',
      dataIndex: 'openType',
      key: 'openType',
      width: 200,
      render: (openTypes: string[]) => (
        <Space size={[0, 8]} wrap>
          {openTypes.map((type) => (
            <Tag color="blue" key={type}>
              {type}
            </Tag>
          ))}
        </Space>
      ),
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
      title: '最后开门时间',
      dataIndex: 'lastOpenTime',
      key: 'lastOpenTime',
      width: 180,
    },
    {
      title: '最后开门人',
      dataIndex: 'lastOpenUser',
      key: 'lastOpenUser',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: AccessControl) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" icon={<UnlockOutlined />} onClick={() => handleRemoteOpen(record.id)}>
            远程开门
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: AccessControl) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleRemoteOpen = (id: string) => {
    Modal.confirm({
      title: '确认远程开门',
      content: '确定要远程开启该门禁吗？',
      onOk() {
        message.loading('正在开门...');
        setTimeout(() => {
          message.success('开门成功');
        }, 2000);
      },
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个门禁吗？此操作不可恢复。',
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
              title="在线门禁"
              value={accessControlData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="离线门禁"
              value={accessControlData.filter(item => item.status === 'fault').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="维护中门禁"
              value={accessControlData.filter(item => item.status === 'maintenance').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="开启状态门禁"
              value={accessControlData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="门禁管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加门禁
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={accessControlData}
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
        title={editingId ? '编辑门禁' : '添加门禁'}
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
            label="门禁名称"
            rules={[{ required: true, message: '请输入门禁名称' }]}
          >
            <Input placeholder="请输入门禁名称" />
          </Form.Item>
          <Form.Item
            name="code"
            label="门禁编号"
            rules={[{ required: true, message: '请输入门禁编号' }]}
          >
            <Input placeholder="请输入门禁编号" />
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
              <Select.Option value="门禁控制器">门禁控制器</Select.Option>
              <Select.Option value="智能闸机">智能闸机</Select.Option>
              <Select.Option value="智能门锁">智能门锁</Select.Option>
              <Select.Option value="指纹门禁">指纹门禁</Select.Option>
              <Select.Option value="多功能门禁">多功能门禁</Select.Option>
              <Select.Option value="紧急门禁">紧急门禁</Select.Option>
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
            name="openType"
            label="开门方式"
            rules={[{ required: true, message: '请选择开门方式' }]}
          >
            <Select mode="multiple" placeholder="请选择开门方式">
              <Select.Option value="人脸识别">人脸识别</Select.Option>
              <Select.Option value="刷卡">刷卡</Select.Option>
              <Select.Option value="密码">密码</Select.Option>
              <Select.Option value="指纹">指纹</Select.Option>
              <Select.Option value="应急按钮">应急按钮</Select.Option>
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

export default AccessControl; 