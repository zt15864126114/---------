import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, Tag, message, Row, Col, Statistic, DatePicker, Drawer } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ExportOutlined, DownloadOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import * as XLSX from 'xlsx';

interface AccessRecord {
  id: string;
  deviceName: string;
  deviceCode: string;
  location: string;
  userName: string;
  department: string;
  accessType: string;
  accessTime: string;
  accessResult: string;
  createTime: string;
}

const AccessRecords: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<AccessRecord[]>([]);

  // 模拟开门记录数据
  const accessRecordData: AccessRecord[] = [
    {
      id: '1',
      deviceName: '主入口门禁',
      deviceCode: 'AC-MAIN-001',
      location: '园区主入口',
      userName: '张伟',
      department: '信息技术部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 08:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 08:30:00',
    },
    {
      id: '2',
      deviceName: 'A栋大厅门禁',
      deviceCode: 'AC-A-001',
      location: 'A栋一层大厅',
      userName: '李强',
      department: '安保部',
      accessType: '刷卡',
      accessTime: '2025-03-20 08:35:00',
      accessResult: 'success',
      createTime: '2025-03-20 08:35:00',
    },
    {
      id: '3',
      deviceName: 'B栋闸机',
      deviceCode: 'AC-B-001',
      location: 'B栋一层大厅',
      userName: '王霞',
      department: '前台',
      accessType: '人脸识别',
      accessTime: '2025-03-20 08:40:00',
      accessResult: 'success',
      createTime: '2025-03-20 08:40:00',
    },
    {
      id: '4',
      deviceName: 'C栋会议室',
      deviceCode: 'AC-C-001',
      location: 'C栋二层会议室',
      userName: '刘燕',
      department: '人力资源部',
      accessType: '密码',
      accessTime: '2025-03-20 08:45:00',
      accessResult: 'success',
      createTime: '2025-03-20 08:45:00',
    },
    {
      id: '5',
      deviceName: '食堂入口',
      deviceCode: 'AC-CANT-001',
      location: '员工食堂入口',
      userName: '陈刚',
      department: '设备部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 08:50:00',
      accessResult: 'success',
      createTime: '2025-03-20 08:50:00',
    },
    {
      id: '6',
      deviceName: '档案室门禁',
      deviceCode: 'AC-FILE-001',
      location: 'A栋三层档案室',
      userName: '赵明',
      department: '研发部',
      accessType: '指纹',
      accessTime: '2025-03-20 09:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 09:00:00',
    },
    {
      id: '7',
      deviceName: '机房门禁',
      deviceCode: 'AC-SERVER-001',
      location: 'B栋负一层机房',
      userName: '王静',
      department: '研发部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 09:15:00',
      accessResult: 'success',
      createTime: '2025-03-20 09:15:00',
    },
    {
      id: '8',
      deviceName: '后勤仓库',
      deviceCode: 'AC-STORE-001',
      location: 'C栋负一层仓库',
      userName: '李红',
      department: '安保部',
      accessType: '刷卡',
      accessTime: '2025-03-20 09:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 09:30:00',
    },
    {
      id: '9',
      deviceName: '消防通道',
      deviceCode: 'AC-FIRE-001',
      location: 'A栋安全通道',
      userName: '张敏',
      department: '市场部',
      accessType: '刷卡',
      accessTime: '2025-03-20 09:45:00',
      accessResult: 'success',
      createTime: '2025-03-20 09:45:00',
    },
    {
      id: '10',
      deviceName: '员工通道',
      deviceCode: 'AC-STAFF-001',
      location: '园区侧门',
      userName: '王飞',
      department: '财务部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 10:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 10:00:00',
    },
    {
      id: '11',
      deviceName: '主入口门禁',
      deviceCode: 'AC-MAIN-001',
      location: '园区主入口',
      userName: '刘伟',
      department: '设备部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 10:15:00',
      accessResult: 'failed',
      createTime: '2025-03-20 10:15:00',
    },
    {
      id: '12',
      deviceName: 'A栋大厅门禁',
      deviceCode: 'AC-A-001',
      location: 'A栋一层大厅',
      userName: '陈新',
      department: '安保部',
      accessType: '刷卡',
      accessTime: '2025-03-20 10:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 10:30:00',
    },
    {
      id: '13',
      deviceName: 'B栋闸机',
      deviceCode: 'AC-B-001',
      location: 'B栋一层大厅',
      userName: '张丽',
      department: '前台',
      accessType: '人脸识别',
      accessTime: '2025-03-20 10:45:00',
      accessResult: 'success',
      createTime: '2025-03-20 10:45:00',
    },
    {
      id: '14',
      deviceName: 'C栋会议室',
      deviceCode: 'AC-C-001',
      location: 'C栋二层会议室',
      userName: '王平',
      department: '人力资源部',
      accessType: '密码',
      accessTime: '2025-03-20 11:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 11:00:00',
    },
    {
      id: '15',
      deviceName: '食堂入口',
      deviceCode: 'AC-CANT-001',
      location: '员工食堂入口',
      userName: '李强',
      department: '安保部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 11:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 11:30:00',
    },
    {
      id: '16',
      deviceName: '档案室门禁',
      deviceCode: 'AC-FILE-001',
      location: 'A栋三层档案室',
      userName: '王霞',
      department: '前台',
      accessType: '指纹',
      accessTime: '2025-03-20 12:00:00',
      accessResult: 'failed',
      createTime: '2025-03-20 12:00:00',
    },
    {
      id: '17',
      deviceName: '机房门禁',
      deviceCode: 'AC-SERVER-001',
      location: 'B栋负一层机房',
      userName: '刘燕',
      department: '人力资源部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 13:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 13:00:00',
    },
    {
      id: '18',
      deviceName: '后勤仓库',
      deviceCode: 'AC-STORE-001',
      location: 'C栋负一层仓库',
      userName: '陈刚',
      department: '设备部',
      accessType: '刷卡',
      accessTime: '2025-03-20 13:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 13:30:00',
    },
    {
      id: '19',
      deviceName: '消防通道',
      deviceCode: 'AC-FIRE-001',
      location: 'A栋安全通道',
      userName: '赵明',
      department: '研发部',
      accessType: '刷卡',
      accessTime: '2025-03-20 14:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 14:00:00',
    },
    {
      id: '20',
      deviceName: '员工通道',
      deviceCode: 'AC-STAFF-001',
      location: '园区侧门',
      userName: '王静',
      department: '研发部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 14:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 14:30:00',
    },
    {
      id: '21',
      deviceName: '主入口门禁',
      deviceCode: 'AC-MAIN-001',
      location: '园区主入口',
      userName: '李红',
      department: '安保部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 15:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 15:00:00',
    },
    {
      id: '22',
      deviceName: 'A栋大厅门禁',
      deviceCode: 'AC-A-001',
      location: 'A栋一层大厅',
      userName: '张敏',
      department: '市场部',
      accessType: '刷卡',
      accessTime: '2025-03-20 15:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 15:30:00',
    },
    {
      id: '23',
      deviceName: 'B栋闸机',
      deviceCode: 'AC-B-001',
      location: 'B栋一层大厅',
      userName: '王飞',
      department: '财务部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 16:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 16:00:00',
    },
    {
      id: '24',
      deviceName: 'C栋会议室',
      deviceCode: 'AC-C-001',
      location: 'C栋二层会议室',
      userName: '刘伟',
      department: '设备部',
      accessType: '密码',
      accessTime: '2025-03-20 16:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 16:30:00',
    },
    {
      id: '25',
      deviceName: '食堂入口',
      deviceCode: 'AC-CANT-001',
      location: '员工食堂入口',
      userName: '陈新',
      department: '安保部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 17:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 17:00:00',
    },
    {
      id: '26',
      deviceName: '档案室门禁',
      deviceCode: 'AC-FILE-001',
      location: 'A栋三层档案室',
      userName: '张丽',
      department: '前台',
      accessType: '指纹',
      accessTime: '2025-03-20 17:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 17:30:00',
    },
    {
      id: '27',
      deviceName: '机房门禁',
      deviceCode: 'AC-SERVER-001',
      location: 'B栋负一层机房',
      userName: '王平',
      department: '人力资源部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 18:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 18:00:00',
    },
    {
      id: '28',
      deviceName: '后勤仓库',
      deviceCode: 'AC-STORE-001',
      location: 'C栋负一层仓库',
      userName: '李强',
      department: '安保部',
      accessType: '刷卡',
      accessTime: '2025-03-20 18:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 18:30:00',
    },
    {
      id: '29',
      deviceName: '消防通道',
      deviceCode: 'AC-FIRE-001',
      location: 'A栋安全通道',
      userName: '王霞',
      department: '前台',
      accessType: '刷卡',
      accessTime: '2025-03-20 19:00:00',
      accessResult: 'success',
      createTime: '2025-03-20 19:00:00',
    },
    {
      id: '30',
      deviceName: '员工通道',
      deviceCode: 'AC-STAFF-001',
      location: '园区侧门',
      userName: '刘燕',
      department: '人力资源部',
      accessType: '人脸识别',
      accessTime: '2025-03-20 19:30:00',
      accessResult: 'success',
      createTime: '2025-03-20 19:30:00',
    }
  ];

  const columns = [
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
      title: '用户姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '开门方式',
      dataIndex: 'accessType',
      key: 'accessType',
      width: 100,
    },
    {
      title: '开门时间',
      dataIndex: 'accessTime',
      key: 'accessTime',
      width: 180,
    },
    {
      title: '开门结果',
      dataIndex: 'accessResult',
      key: 'accessResult',
      width: 100,
      render: (result: string) => (
        <Tag color={result === 'success' ? 'success' : 'error'}>
          {result === 'success' ? '成功' : '失败'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: AccessRecord) => (
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

  const handleEdit = (record: AccessRecord) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条开门记录吗？此操作不可恢复。',
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

  // 搜索处理函数
  const handleSearch = (values: any) => {
    let filtered = [...accessRecordData];
    
    // 根据搜索条件过滤数据
    if (values.deviceName) {
      filtered = filtered.filter(item => 
        item.deviceName.includes(values.deviceName)
      );
    }
    if (values.deviceCode) {
      filtered = filtered.filter(item => 
        item.deviceCode.includes(values.deviceCode)
      );
    }
    if (values.userName) {
      filtered = filtered.filter(item => 
        item.userName.includes(values.userName)
      );
    }
    if (values.department) {
      filtered = filtered.filter(item => 
        item.department === values.department
      );
    }
    if (values.accessType) {
      filtered = filtered.filter(item => 
        item.accessType === values.accessType
      );
    }
    if (values.accessResult) {
      filtered = filtered.filter(item => 
        item.accessResult === values.accessResult
      );
    }
    if (values.dateRange) {
      const [startDate, endDate] = values.dateRange;
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.accessTime);
        return itemDate >= startDate.toDate() && itemDate <= endDate.toDate();
      });
    }

    setFilteredData(filtered);
    setIsSearchVisible(false);
    message.success('搜索完成');
  };

  // 导出Excel处理函数
  const handleExport = () => {
    // 准备导出数据
    const exportData = filteredData.length > 0 ? filteredData : accessRecordData;
    const excelData = exportData.map(item => ({
      '设备名称': item.deviceName,
      '设备编号': item.deviceCode,
      '位置': item.location,
      '用户姓名': item.userName,
      '部门': item.department,
      '开门方式': item.accessType,
      '开门时间': item.accessTime,
      '开门结果': item.accessResult === 'success' ? '成功' : '失败',
      '创建时间': item.createTime
    }));

    // 创建工作簿
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // 设置列宽
    const colWidths = [
      { wch: 15 }, // 设备名称
      { wch: 12 }, // 设备编号
      { wch: 15 }, // 位置
      { wch: 10 }, // 用户姓名
      { wch: 12 }, // 部门
      { wch: 10 }, // 开门方式
      { wch: 20 }, // 开门时间
      { wch: 10 }, // 开门结果
      { wch: 20 }, // 创建时间
    ];
    ws['!cols'] = colWidths;

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, '开门记录');

    // 导出文件
    XLSX.writeFile(wb, `开门记录_${new Date().toLocaleDateString()}.xlsx`);
    message.success('导出成功');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日开门次数"
              value={accessRecordData.length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="开门成功"
              value={accessRecordData.filter(item => item.accessResult === 'success').length}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="开门失败"
              value={accessRecordData.filter(item => item.accessResult === 'failed').length}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="人脸识别"
              value={accessRecordData.filter(item => item.accessType === '人脸识别').length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="开门记录"
        extra={
          <Space>
            <Button icon={<SearchOutlined />} onClick={() => setIsSearchVisible(true)}>搜索</Button>
            <Button icon={<ExportOutlined />} onClick={handleExport}>导出</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              添加记录
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={filteredData.length > 0 ? filteredData : accessRecordData}
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

      {/* 搜索抽屉 */}
      <Drawer
        title="搜索条件"
        placement="right"
        onClose={() => setIsSearchVisible(false)}
        open={isSearchVisible}
        width={400}
      >
        <Form
          form={searchForm}
          layout="vertical"
          onFinish={handleSearch}
        >
          <Form.Item
            name="deviceName"
            label="设备名称"
          >
            <Input placeholder="请输入设备名称" allowClear />
          </Form.Item>
          <Form.Item
            name="deviceCode"
            label="设备编号"
          >
            <Input placeholder="请输入设备编号" allowClear />
          </Form.Item>
          <Form.Item
            name="userName"
            label="用户姓名"
          >
            <Input placeholder="请输入用户姓名" allowClear />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
          >
            <Select placeholder="请选择部门" allowClear>
              <Select.Option value="信息技术部">信息技术部</Select.Option>
              <Select.Option value="人力资源部">人力资源部</Select.Option>
              <Select.Option value="财务部">财务部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="设备部">设备部</Select.Option>
              <Select.Option value="安保部">安保部</Select.Option>
              <Select.Option value="前台">前台</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="accessType"
            label="开门方式"
          >
            <Select placeholder="请选择开门方式" allowClear>
              <Select.Option value="人脸识别">人脸识别</Select.Option>
              <Select.Option value="刷卡">刷卡</Select.Option>
              <Select.Option value="密码">密码</Select.Option>
              <Select.Option value="指纹">指纹</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="accessResult"
            label="开门结果"
          >
            <Select placeholder="请选择开门结果" allowClear>
              <Select.Option value="success">成功</Select.Option>
              <Select.Option value="failed">失败</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="时间范围"
          >
            <DatePicker.RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button onClick={() => {
                searchForm.resetFields();
                setFilteredData([]);
              }}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title={editingId ? '编辑开门记录' : '添加开门记录'}
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
            name="userName"
            label="用户姓名"
            rules={[{ required: true, message: '请输入用户姓名' }]}
          >
            <Input placeholder="请输入用户姓名" />
          </Form.Item>
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="信息技术部">信息技术部</Select.Option>
              <Select.Option value="人力资源部">人力资源部</Select.Option>
              <Select.Option value="财务部">财务部</Select.Option>
              <Select.Option value="市场部">市场部</Select.Option>
              <Select.Option value="研发部">研发部</Select.Option>
              <Select.Option value="设备部">设备部</Select.Option>
              <Select.Option value="安保部">安保部</Select.Option>
              <Select.Option value="前台">前台</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="accessType"
            label="开门方式"
            rules={[{ required: true, message: '请选择开门方式' }]}
          >
            <Select placeholder="请选择开门方式">
              <Select.Option value="人脸识别">人脸识别</Select.Option>
              <Select.Option value="刷卡">刷卡</Select.Option>
              <Select.Option value="密码">密码</Select.Option>
              <Select.Option value="指纹">指纹</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="accessTime"
            label="开门时间"
            rules={[{ required: true, message: '请选择开门时间' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="accessResult"
            label="开门结果"
            rules={[{ required: true, message: '请选择开门结果' }]}
          >
            <Select placeholder="请选择开门结果">
              <Select.Option value="success">成功</Select.Option>
              <Select.Option value="failed">失败</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccessRecords; 