import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  username: string;
  password: string;
  captcha: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginForm) => {
    // 模拟登录验证
    if (values.username === 'admin' && values.password === 'admin123') {
      message.success('登录成功');
      navigate('/');
    } else {
      message.error('用户名或密码错误');
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card
        title="智慧园区管理系统"
        style={{ width: 400 }}
        headStyle={{ textAlign: 'center' }}
      >
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input placeholder="验证码" size="large" />
              <div style={{
                width: 100,
                height: 32,
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                1234
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 