import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Select, InputNumber, message, Tabs, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface SystemSettingsData {
  // 基本设置
  systemName: string;
  systemLogo: string;
  systemDescription: string;
  systemVersion: string;
  systemLanguage: string;
  systemTheme: string;
  
  // 安全设置
  passwordMinLength: number;
  passwordComplexity: string;
  loginAttempts: number;
  sessionTimeout: number;
  enableTwoFactor: boolean;
  enableCaptcha: boolean;
  
  // 通知设置
  enableEmailNotification: boolean;
  enableSMSNotification: boolean;
  enableSystemNotification: boolean;
  notificationEmail: string;
  notificationPhone: string;
  
  // 备份设置
  enableAutoBackup: boolean;
  backupFrequency: string;
  backupTime: string;
  backupRetention: number;
  backupPath: string;
}

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 模拟系统设置数据
  const initialValues: SystemSettingsData = {
    // 基本设置
    systemName: '智慧园区管理系统',
    systemLogo: '/logo.png',
    systemDescription: '智慧园区综合管理平台',
    systemVersion: 'v1.0.0',
    systemLanguage: 'zh_CN',
    systemTheme: 'light',
    
    // 安全设置
    passwordMinLength: 8,
    passwordComplexity: 'medium',
    loginAttempts: 5,
    sessionTimeout: 30,
    enableTwoFactor: false,
    enableCaptcha: true,
    
    // 通知设置
    enableEmailNotification: true,
    enableSMSNotification: true,
    enableSystemNotification: true,
    notificationEmail: 'admin@example.com',
    notificationPhone: '13800138000',
    
    // 备份设置
    enableAutoBackup: true,
    backupFrequency: 'daily',
    backupTime: '00:00',
    backupRetention: 30,
    backupPath: '/backup',
  };

  const handleSubmit = async (values: SystemSettingsData) => {
    setLoading(true);
    try {
      // 模拟保存设置
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Success:', values);
      message.success('设置保存成功');
    } catch (error) {
      message.error('设置保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="系统设置">
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Tabs defaultActiveKey="basic">
            <TabPane tab="基本设置" key="basic">
              <Form.Item
                name="systemName"
                label="系统名称"
                rules={[{ required: true, message: '请输入系统名称' }]}
              >
                <Input placeholder="请输入系统名称" />
              </Form.Item>
              <Form.Item
                name="systemLogo"
                label="系统Logo"
              >
                <Input placeholder="请输入系统Logo路径" />
              </Form.Item>
              <Form.Item
                name="systemDescription"
                label="系统描述"
              >
                <Input.TextArea placeholder="请输入系统描述" />
              </Form.Item>
              <Form.Item
                name="systemVersion"
                label="系统版本"
              >
                <Input placeholder="请输入系统版本" />
              </Form.Item>
              <Form.Item
                name="systemLanguage"
                label="系统语言"
              >
                <Select placeholder="请选择系统语言">
                  <Select.Option value="zh_CN">简体中文</Select.Option>
                  <Select.Option value="en_US">English</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="systemTheme"
                label="系统主题"
              >
                <Select placeholder="请选择系统主题">
                  <Select.Option value="light">浅色</Select.Option>
                  <Select.Option value="dark">深色</Select.Option>
                </Select>
              </Form.Item>
            </TabPane>

            <TabPane tab="安全设置" key="security">
              <Form.Item
                name="passwordMinLength"
                label="密码最小长度"
                rules={[{ required: true, message: '请输入密码最小长度' }]}
              >
                <InputNumber min={6} max={20} />
              </Form.Item>
              <Form.Item
                name="passwordComplexity"
                label="密码复杂度"
                rules={[{ required: true, message: '请选择密码复杂度' }]}
              >
                <Select placeholder="请选择密码复杂度">
                  <Select.Option value="low">低</Select.Option>
                  <Select.Option value="medium">中</Select.Option>
                  <Select.Option value="high">高</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="loginAttempts"
                label="登录尝试次数"
                rules={[{ required: true, message: '请输入登录尝试次数' }]}
              >
                <InputNumber min={1} max={10} />
              </Form.Item>
              <Form.Item
                name="sessionTimeout"
                label="会话超时时间(分钟)"
                rules={[{ required: true, message: '请输入会话超时时间' }]}
              >
                <InputNumber min={5} max={120} />
              </Form.Item>
              <Form.Item
                name="enableTwoFactor"
                label="启用双因素认证"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="enableCaptcha"
                label="启用验证码"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </TabPane>

            <TabPane tab="通知设置" key="notification">
              <Form.Item
                name="enableEmailNotification"
                label="启用邮件通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="enableSMSNotification"
                label="启用短信通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="enableSystemNotification"
                label="启用系统通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="notificationEmail"
                label="通知邮箱"
                rules={[
                  { required: true, message: '请输入通知邮箱' },
                  { type: 'email', message: '请输入正确的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入通知邮箱" />
              </Form.Item>
              <Form.Item
                name="notificationPhone"
                label="通知手机号"
                rules={[
                  { required: true, message: '请输入通知手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                ]}
              >
                <Input placeholder="请输入通知手机号" />
              </Form.Item>
            </TabPane>

            <TabPane tab="备份设置" key="backup">
              <Form.Item
                name="enableAutoBackup"
                label="启用自动备份"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="backupFrequency"
                label="备份频率"
                rules={[{ required: true, message: '请选择备份频率' }]}
              >
                <Select placeholder="请选择备份频率">
                  <Select.Option value="daily">每天</Select.Option>
                  <Select.Option value="weekly">每周</Select.Option>
                  <Select.Option value="monthly">每月</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="backupTime"
                label="备份时间"
                rules={[{ required: true, message: '请选择备份时间' }]}
              >
                <Input type="time" />
              </Form.Item>
              <Form.Item
                name="backupRetention"
                label="备份保留天数"
                rules={[{ required: true, message: '请输入备份保留天数' }]}
              >
                <InputNumber min={1} max={365} />
              </Form.Item>
              <Form.Item
                name="backupPath"
                label="备份路径"
                rules={[{ required: true, message: '请输入备份路径' }]}
              >
                <Input placeholder="请输入备份路径" />
              </Form.Item>
            </TabPane>
          </Tabs>

          <Divider />

          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={loading}>
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SystemSettings; 