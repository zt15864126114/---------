import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Space, message, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface Employee {
  id: string;
  name: string;
  employeeNo: string;
  gender: string;
  age: number;
  department: string;
  position: string;
  email: string;
  phone: string;
  status: string;
  entryDate: string;
  education: string;
  address: string;
}

const Employee: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  // 模拟员工数据
  const employeeData: Employee[] = [
    {
      id: '1',
      name: '刘明',
      employeeNo: 'EMP001',
      gender: '男',
      age: 35,
      department: '技术创新中心',
      position: '技术总监',
      email: 'liuming@example.com',
      phone: '13800138001',
      status: 'active',
      entryDate: '2025-03-10',
      education: '硕士',
      address: '山东省济南市历下区',
    },
    {
      id: '2',
      name: '张婷婷',
      employeeNo: 'EMP002',
      gender: '女',
      age: 32,
      department: '产品部',
      position: '产品经理',
      email: 'zhangtt@example.com',
      phone: '13800138002',
      status: 'active',
      entryDate: '2025-03-15',
      education: '本科',
      address: '山东省济南市市中区',
    },
    {
      id: '3',
      name: '王建华',
      employeeNo: 'EMP003',
      gender: '男',
      age: 38,
      department: '运营管理中心',
      position: '运营总监',
      email: 'wangjh@example.com',
      phone: '13800138003',
      status: 'active',
      entryDate: '2025-03-05',
      education: '硕士',
      address: '山东省济南市天桥区',
    },
    {
      id: '4',
      name: '李秀英',
      employeeNo: 'EMP004',
      gender: '女',
      age: 29,
      department: '人力资源部',
      position: 'HR主管',
      email: 'lixy@example.com',
      phone: '13800138004',
      status: 'active',
      entryDate: '2025-03-10',
      education: '本科',
      address: '山东省济南市槐荫区',
    },
    {
      id: '5',
      name: '陈志强',
      employeeNo: 'EMP005',
      gender: '男',
      age: 34,
      department: '研发部',
      position: '研发经理',
      email: 'chenzq@example.com',
      phone: '13800138005',
      status: 'active',
      entryDate: '2025-03-10',
      education: '硕士',
      address: '山东省济南市历城区',
    },
    {
      id: '6',
      name: '赵雪',
      employeeNo: 'EMP006',
      gender: '女',
      age: 27,
      department: '财务部',
      position: '财务主管',
      email: 'zhaox@example.com',
      phone: '13800138006',
      status: 'active',
      entryDate: '2025-03-15',
      education: '本科',
      address: '山东省济南市长清区',
    },
    {
      id: '7',
      name: '孙伟',
      employeeNo: 'EMP007',
      gender: '男',
      age: 31,
      department: '测试部',
      position: '测试经理',
      email: 'sunw@example.com',
      phone: '13800138007',
      status: 'active',
      entryDate: '2025-03-20',
      education: '本科',
      address: '山东省济南市历下区',
    },
    {
      id: '8',
      name: '周丽',
      employeeNo: 'EMP008',
      gender: '女',
      age: 28,
      department: '前端开发组',
      position: '前端开发工程师',
      email: 'zhoul@example.com',
      phone: '13800138008',
      status: 'active',
      entryDate: '2025-03-20',
      education: '本科',
      address: '山东省济南市市中区',
    },
    {
      id: '9',
      name: '吴强',
      employeeNo: 'EMP009',
      gender: '男',
      age: 33,
      department: '后端开发组',
      position: '后端开发工程师',
      email: 'wuq@example.com',
      phone: '13800138009',
      status: 'active',
      entryDate: '2025-03-25',
      education: '硕士',
      address: '山东省济南市天桥区',
    },
    {
      id: '10',
      name: '郑美玲',
      employeeNo: 'EMP010',
      gender: '女',
      age: 26,
      department: '功能测试组',
      position: '测试工程师',
      email: 'zhengml@example.com',
      phone: '13800138010',
      status: 'active',
      entryDate: '2025-03-25',
      education: '本科',
      address: '山东省济南市槐荫区',
    },
    {
      id: '11',
      name: '黄晓明',
      employeeNo: 'EMP011',
      gender: '男',
      age: 30,
      department: '自动化测试组',
      position: '自动化测试工程师',
      email: 'huangxm@example.com',
      phone: '13800138011',
      status: 'active',
      entryDate: '2025-03-10',
      education: '本科',
      address: '山东省济南市历城区',
    },
    {
      id: '12',
      name: '杨静',
      employeeNo: 'EMP012',
      gender: '女',
      age: 29,
      department: '运维部',
      position: '运维工程师',
      email: 'yangj@example.com',
      phone: '13800138012',
      status: 'active',
      entryDate: '2025-03-05',
      education: '本科',
      address: '山东省济南市长清区',
    },
    {
      id: '13',
      name: '徐涛',
      employeeNo: 'EMP013',
      gender: '男',
      age: 32,
      department: '产品部',
      position: 'UI设计师',
      email: 'xut@example.com',
      phone: '13800138013',
      status: 'active',
      entryDate: '2025-03-10',
      education: '本科',
      address: '山东省济南市历下区',
    },
    {
      id: '14',
      name: '马丽娜',
      employeeNo: 'EMP014',
      gender: '女',
      age: 27,
      department: '人力资源部',
      position: '招聘专员',
      email: 'maln@example.com',
      phone: '13800138014',
      status: 'active',
      entryDate: '2025-03-15',
      education: '本科',
      address: '山东省济南市市中区',
    },
    {
      id: '15',
      name: '胡明亮',
      employeeNo: 'EMP015',
      gender: '男',
      age: 35,
      department: '财务部',
      position: '会计',
      email: 'huml@example.com',
      phone: '13800138015',
      status: 'active',
      entryDate: '2025-03-20',
      education: '本科',
      address: '山东省济南市天桥区',
    }
  ];

  const columns = [
    {
      title: '工号',
      dataIndex: 'employeeNo',
      key: 'employeeNo',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 150,
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 150,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '入职日期',
      dataIndex: 'entryDate',
      key: 'entryDate',
      width: 120,
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <span style={{ color: status === 'active' ? '#52c41a' : '#ff4d4f' }}>
          {status === 'active' ? '在职' : '离职'}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Employee) => (
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

  const handleEdit = (record: Employee) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      entryDate: dayjs(record.entryDate)
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const formData = {
        ...values,
        entryDate: (values.entryDate as Dayjs).format('YYYY-MM-DD')
      };
      console.log('Success:', formData);
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
      message.success(editingId ? '更新成功' : '添加成功');
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="员工管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            添加员工
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={employeeData}
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
        title={editingId ? '编辑员工' : '添加员工'}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              name="employeeNo"
              label="工号"
              rules={[{ required: true, message: '请输入工号' }]}
            >
              <Input placeholder="请输入工号" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Select placeholder="请选择性别">
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[{ required: true, message: '请输入年龄' }]}
            >
              <Input type="number" placeholder="请输入年龄" />
            </Form.Item>
            <Form.Item
              name="department"
              label="部门"
              rules={[{ required: true, message: '请选择部门' }]}
            >
              <Select placeholder="请选择部门">
                <Select.Option value="技术创新中心">技术创新中心</Select.Option>
                <Select.Option value="运营管理中心">运营管理中心</Select.Option>
                <Select.Option value="研发部">研发部</Select.Option>
                <Select.Option value="测试部">测试部</Select.Option>
                <Select.Option value="产品部">产品部</Select.Option>
                <Select.Option value="运维部">运维部</Select.Option>
                <Select.Option value="人力资源部">人力资源部</Select.Option>
                <Select.Option value="财务部">财务部</Select.Option>
                <Select.Option value="前端开发组">前端开发组</Select.Option>
                <Select.Option value="后端开发组">后端开发组</Select.Option>
                <Select.Option value="功能测试组">功能测试组</Select.Option>
                <Select.Option value="自动化测试组">自动化测试组</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="position"
              label="职位"
              rules={[{ required: true, message: '请输入职位' }]}
            >
              <Input placeholder="请输入职位" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="entryDate"
              label="入职日期"
              rules={[{ required: true, message: '请选择入职日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="education"
              label="学历"
              rules={[{ required: true, message: '请选择学历' }]}
            >
              <Select placeholder="请选择学历">
                <Select.Option value="博士">博士</Select.Option>
                <Select.Option value="硕士">硕士</Select.Option>
                <Select.Option value="本科">本科</Select.Option>
                <Select.Option value="专科">专科</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Select.Option value="active">在职</Select.Option>
                <Select.Option value="inactive">离职</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea rows={2} placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Employee; 