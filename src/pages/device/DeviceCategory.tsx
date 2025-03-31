import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message, Row, Col, Statistic, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';

interface CategoryData {
  id: string;
  categoryName: string;
  categoryCode: string;
  parentCategory: string;
  description: string;
  deviceCount: number;
  status: string;
  createTime: string;
  updateTime: string;
}

const DeviceCategory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟分类数据
  const data: CategoryData[] = [
    {
      id: '1',
      categoryName: '视频监控',
      categoryCode: 'VIDEO',
      parentCategory: '安防设备',
      description: '包括摄像头、录像机等视频监控设备',
      deviceCount: 10,
      status: 'active',
      createTime: '2025-01-01 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '2',
      categoryName: '门禁控制',
      categoryCode: 'ACCESS',
      parentCategory: '安防设备',
      description: '包括门禁读卡器、控制器等门禁设备',
      deviceCount: 5,
      status: 'active',
      createTime: '2025-01-01 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
    {
      id: '3',
      categoryName: '环境监测',
      categoryCode: 'ENV',
      parentCategory: '监测设备',
      description: '包括温湿度传感器、空气质量监测等设备',
      deviceCount: 8,
      status: 'inactive',
      createTime: '2025-01-01 09:00:00',
      updateTime: '2025-03-20 09:00:00',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
    },
    {
      title: '分类编号',
      dataIndex: 'categoryCode',
      key: 'categoryCode',
      width: 120,
    },
    {
      title: '父级分类',
      dataIndex: 'parentCategory',
      key: 'parentCategory',
      width: 120,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '设备数量',
      dataIndex: 'deviceCount',
      key: 'deviceCount',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status === 'active' ? '启用' : '禁用'}
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
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: CategoryData) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: CategoryData) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: CategoryData) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除分类 ${record.categoryName} 吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      // 模拟保存
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        message.success(editingId ? '更新成功' : '添加成功');
      }, 1000);
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="分类总数"
              value={data.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="启用分类"
              value={data.filter(item => item.status === 'active').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="禁用分类"
              value={data.filter(item => item.status === 'inactive').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备总数"
              value={data.reduce((sum, item) => sum + item.deviceCount, 0)}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="设备分类"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加分类
            </Button>
            <Button icon={<ReloadOutlined />}>
              刷新
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={data}
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
        title={editingId ? '编辑分类' : '添加分类'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="categoryName"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryCode"
            label="分类编号"
            rules={[{ required: true, message: '请输入分类编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="parentCategory"
            label="父级分类"
            rules={[{ required: true, message: '请选择父级分类' }]}
          >
            <Select>
              <Select.Option value="安防设备">安防设备</Select.Option>
              <Select.Option value="监测设备">监测设备</Select.Option>
              <Select.Option value="网络设备">网络设备</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="分类描述"
            rules={[{ required: true, message: '请输入分类描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceCategory; 