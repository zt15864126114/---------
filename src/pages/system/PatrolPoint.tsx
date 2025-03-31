import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface PatrolPoint {
  id: string;
  pointName: string;
  pointCode: string;
  location: string;
  type: string;
  status: string;
  lastCheckTime: string;
  nextCheckTime: string;
  maintainer: string;
  description: string;
}

interface PatrolRecord {
  id: string;
  pointName: string;
  pointCode: string;
  location: string;
  patrolTime: string;
  patrolUser: string;
  patrolResult: string;
  checkItems: string[];
  photos: string[];
  remarks: string;
  createTime: string;
}

const PatrolPoint: React.FC = () => {
  const [isPointModalVisible, setIsPointModalVisible] = useState(false);
  const [isRecordModalVisible, setIsRecordModalVisible] = useState(false);
  const [pointForm] = Form.useForm();
  const [recordForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟巡更点数据
  const pointData: PatrolPoint[] = [
    {
      id: '1',
      pointName: 'A栋一层大厅',
      pointCode: 'PT-LOB-001',
      location: 'A栋一层大厅',
      type: '室内巡更点',
      status: 'normal',
      lastCheckTime: '2025-03-20 09:00:00',
      nextCheckTime: '2025-04-20 09:00:00',
      maintainer: '张工',
      description: '大厅巡更点',
    },
    {
      id: '2',
      pointName: 'B栋二层走廊',
      pointCode: 'PT-COR-001',
      location: 'B栋二层走廊',
      type: '室内巡更点',
      status: 'warning',
      lastCheckTime: '2025-03-19 14:30:00',
      nextCheckTime: '2025-04-19 14:30:00',
      maintainer: '李工',
      description: '走廊巡更点',
    },
    {
      id: '3',
      pointName: '园区主入口',
      pointCode: 'PT-ENT-001',
      location: '园区主入口',
      type: '户外巡更点',
      status: 'normal',
      lastCheckTime: '2025-03-18 10:00:00',
      nextCheckTime: '2025-04-18 10:00:00',
      maintainer: '王工',
      description: '入口巡更点',
    },
  ];

  // 模拟巡更记录数据
  const recordData: PatrolRecord[] = [
    {
      id: '1',
      pointName: 'A栋一层大厅',
      pointCode: 'PT-LOB-001',
      location: 'A栋一层大厅',
      patrolTime: '2025-03-20 09:00:00',
      patrolUser: '保安小王',
      patrolResult: 'normal',
      checkItems: ['设备完好', '环境整洁', '照明正常'],
      photos: ['photo1.jpg', 'photo2.jpg'],
      remarks: '一切正常',
      createTime: '2025-03-20 09:05:00',
    },
    {
      id: '2',
      pointName: 'B栋二层走廊',
      pointCode: 'PT-COR-001',
      location: 'B栋二层走廊',
      patrolTime: '2025-03-20 10:00:00',
      patrolUser: '保安小李',
      patrolResult: 'warning',
      checkItems: ['设备完好', '环境整洁', '照明异常'],
      photos: ['photo3.jpg', 'photo4.jpg'],
      remarks: '照明设备需要维修',
      createTime: '2025-03-20 10:05:00',
    },
    {
      id: '3',
      pointName: '园区主入口',
      pointCode: 'PT-ENT-001',
      location: '园区主入口',
      patrolTime: '2025-03-20 11:00:00',
      patrolUser: '保安小张',
      patrolResult: 'normal',
      checkItems: ['设备完好', '环境整洁', '照明正常'],
      photos: ['photo5.jpg', 'photo6.jpg'],
      remarks: '一切正常',
      createTime: '2025-03-20 11:05:00',
    },
  ];

  const pointColumns = [
    {
      title: '巡更点名称',
      dataIndex: 'pointName',
      key: 'pointName',
      width: 150,
    },
    {
      title: '巡更点编号',
      dataIndex: 'pointCode',
      key: 'pointCode',
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
      render: (_: any, record: PatrolPoint) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handlePointEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handlePointDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const recordColumns = [
    {
      title: '巡更点名称',
      dataIndex: 'pointName',
      key: 'pointName',
      width: 150,
    },
    {
      title: '巡更点编号',
      dataIndex: 'pointCode',
      key: 'pointCode',
      width: 120,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: '巡更时间',
      dataIndex: 'patrolTime',
      key: 'patrolTime',
      width: 180,
    },
    {
      title: '巡更人员',
      dataIndex: 'patrolUser',
      key: 'patrolUser',
      width: 120,
    },
    {
      title: '巡更结果',
      dataIndex: 'patrolResult',
      key: 'patrolResult',
      width: 100,
      render: (result: string) => (
        <Tag color={result === 'normal' ? 'success' : result === 'warning' ? 'warning' : 'error'}>
          {result === 'normal' ? '正常' : result === 'warning' ? '异常' : '故障'}
        </Tag>
      ),
    },
    {
      title: '检查项目',
      dataIndex: 'checkItems',
      key: 'checkItems',
      width: 200,
      render: (items: string[]) => items.join(', '),
    },
    {
      title: '照片',
      dataIndex: 'photos',
      key: 'photos',
      width: 100,
      render: (photos: string[]) => `${photos.length}张`,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 150,
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
      render: (_: any, record: PatrolRecord) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleRecordEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleRecordDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handlePointEdit = (record: PatrolPoint) => {
    setEditingId(record.id);
    pointForm.setFieldsValue(record);
    setIsPointModalVisible(true);
  };

  const handlePointDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条巡更点记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleRecordEdit = (record: PatrolRecord) => {
    setEditingId(record.id);
    recordForm.setFieldsValue(record);
    setIsRecordModalVisible(true);
  };

  const handleRecordDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条巡更记录吗？此操作不可恢复。',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handlePointModalOk = () => {
    pointForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsPointModalVisible(false);
      pointForm.resetFields();
      setEditingId(null);
      message.success(editingId ? '更新成功' : '添加成功');
    });
  };

  const handleRecordModalOk = () => {
    recordForm.validateFields().then(values => {
      console.log('Success:', values);
      setIsRecordModalVisible(false);
      recordForm.resetFields();
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
              title="巡更点总数"
              value={pointData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常巡更点"
              value={pointData.filter(item => item.status === 'normal').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日巡更记录"
              value={recordData.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="异常记录"
              value={recordData.filter(item => item.patrolResult !== 'normal').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="巡更点管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsPointModalVisible(true)}>
            添加巡更点
          </Button>
        }
        style={{ marginBottom: 16 }}
      >
        <Table 
          columns={pointColumns} 
          dataSource={pointData}
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
        title="巡更记录管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsRecordModalVisible(true)}>
            添加记录
          </Button>
        }
      >
        <Table 
          columns={recordColumns} 
          dataSource={recordData}
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
        title={editingId ? '编辑巡更点' : '添加巡更点'}
        open={isPointModalVisible}
        onOk={handlePointModalOk}
        onCancel={() => {
          setIsPointModalVisible(false);
          pointForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={pointForm}
          layout="vertical"
        >
          <Form.Item
            name="pointName"
            label="巡更点名称"
            rules={[{ required: true, message: '请输入巡更点名称' }]}
          >
            <Input placeholder="请输入巡更点名称" />
          </Form.Item>
          <Form.Item
            name="pointCode"
            label="巡更点编号"
            rules={[{ required: true, message: '请输入巡更点编号' }]}
          >
            <Input placeholder="请输入巡更点编号" />
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
              <Select.Option value="室内巡更点">室内巡更点</Select.Option>
              <Select.Option value="户外巡更点">户外巡更点</Select.Option>
              <Select.Option value="特殊巡更点">特殊巡更点</Select.Option>
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
        title={editingId ? '编辑巡更记录' : '添加巡更记录'}
        open={isRecordModalVisible}
        onOk={handleRecordModalOk}
        onCancel={() => {
          setIsRecordModalVisible(false);
          recordForm.resetFields();
          setEditingId(null);
        }}
        width={800}
      >
        <Form
          form={recordForm}
          layout="vertical"
        >
          <Form.Item
            name="pointName"
            label="巡更点名称"
            rules={[{ required: true, message: '请选择巡更点' }]}
          >
            <Select placeholder="请选择巡更点">
              {pointData.map(point => (
                <Select.Option key={point.id} value={point.pointName}>
                  {point.pointName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="patrolTime"
            label="巡更时间"
            rules={[{ required: true, message: '请选择巡更时间' }]}
          >
            <Input placeholder="请输入巡更时间" />
          </Form.Item>
          <Form.Item
            name="patrolUser"
            label="巡更人员"
            rules={[{ required: true, message: '请输入巡更人员' }]}
          >
            <Input placeholder="请输入巡更人员" />
          </Form.Item>
          <Form.Item
            name="patrolResult"
            label="巡更结果"
            rules={[{ required: true, message: '请选择巡更结果' }]}
          >
            <Select placeholder="请选择巡更结果">
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="warning">异常</Select.Option>
              <Select.Option value="error">故障</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="checkItems"
            label="检查项目"
            rules={[{ required: true, message: '请选择检查项目' }]}
          >
            <Select mode="multiple" placeholder="请选择检查项目">
              <Select.Option value="设备完好">设备完好</Select.Option>
              <Select.Option value="环境整洁">环境整洁</Select.Option>
              <Select.Option value="照明正常">照明正常</Select.Option>
              <Select.Option value="消防设施">消防设施</Select.Option>
              <Select.Option value="安全出口">安全出口</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="photos"
            label="照片"
          >
            <Input placeholder="请输入照片路径" />
          </Form.Item>
          <Form.Item
            name="remarks"
            label="备注"
          >
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PatrolPoint; 