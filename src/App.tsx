import React from 'react';
import { Layout, Menu } from 'antd';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  DesktopOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
  ApiOutlined,
  WifiOutlined,
  VideoCameraOutlined,
  SoundOutlined,
  CheckCircleOutlined,
  TeamOutlined as TeamOutlinedIcon,
  BellOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ToolOutlined,
  TagsOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

// 导入基础信息管理页面
import BasicInfo from './pages/basic/BasicInfo';
import BuildingInfo from './pages/basic/BuildingInfo';
import DepartmentInfo from './pages/basic/DepartmentInfo';
import EmployeeInfo from './pages/basic/EmployeeInfo';

// 导入角色和账号管理页面
import RoleManagement from './pages/system/RoleManagement';
import AccountManagement from './pages/system/AccountManagement';

// 导入系统管理页面
import SystemSettings from './pages/system/SystemSettings';
import LogManagement from './pages/system/LogManagement';

// 导入设备管理页面
import WiringSystem from './pages/device/WiringSystem';
import WirelessNetwork from './pages/device/WirelessNetwork';
import VideoSurveillance from './pages/device/VideoSurveillance';
import AccessControl from './pages/device/AccessControl';
import PublicBroadcast from './pages/device/PublicBroadcast';
import PatrolPoint from './pages/device/PatrolPoint';
import SmartMeeting from './pages/device/SmartMeeting';
import DeviceList from './pages/device/DeviceList';
import DeviceCategory from './pages/device/DeviceCategory';
import DeviceMaintenance from './pages/device/DeviceMaintenance';

// 导入访客管理页面
import VisitorSystem from './pages/visitor/VisitorSystem';
import VisitorList from './pages/visitor/VisitorList';
import VisitorRecords from './pages/visitor/VisitorRecords';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: 'basic',
    icon: <HomeOutlined />,
    label: '基础信息管理',
    children: [
      {
        key: 'basic-info',
        label: <Link to="/basic/info">基础信息</Link>,
      },
      {
        key: 'building-info',
        label: <Link to="/basic/building">楼宇信息</Link>,
      },
      {
        key: 'department-info',
        label: <Link to="/basic/department">部门信息</Link>,
      },
      {
        key: 'employee-info',
        label: <Link to="/basic/employee">员工信息</Link>,
      },
    ],
  },
  {
    key: 'role',
    icon: <UserOutlined />,
    label: '角色和账号管理',
    children: [
      {
        key: 'role-management',
        label: <Link to="/role/management">角色管理</Link>,
      },
      {
        key: 'account-management',
        label: <Link to="/role/account">账号管理</Link>,
      },
    ],
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: 'system-settings',
        label: <Link to="/system/settings">系统设置</Link>,
      },
      {
        key: 'log-management',
        label: <Link to="/system/log">日志管理</Link>,
      },
    ],
  },
  {
    key: 'device',
    icon: <DesktopOutlined />,
    label: '设备管理',
    children: [
      {
        key: 'wiring-system',
        label: <Link to="/device/wiring">布线系统</Link>,
      },
      {
        key: 'wireless-network',
        label: <Link to="/device/wireless">无线网络</Link>,
      },
      {
        key: 'video-surveillance',
        label: <Link to="/device/video">视频监控</Link>,
      },
      {
        key: 'access-control',
        label: <Link to="/device/access">门禁系统</Link>,
      },
      {
        key: 'public-broadcast',
        label: <Link to="/device/broadcast">公共广播</Link>,
      },
      {
        key: 'patrol-point',
        label: <Link to="/device/patrol">巡更点位</Link>,
      },
      {
        key: 'smart-meeting',
        label: <Link to="/device/meeting">智能会议</Link>,
      },
      {
        key: 'device-list',
        label: <Link to="/device/list">设备列表</Link>,
      },
      {
        key: 'device-category',
        label: <Link to="/device/category">设备分类</Link>,
      },
      {
        key: 'device-maintenance',
        label: <Link to="/device/maintenance">设备维护</Link>,
      },
    ],
  },
  {
    key: 'visitor',
    icon: <TeamOutlined />,
    label: '访客管理',
    children: [
      {
        key: 'visitor-system',
        label: <Link to="/visitor/system">访客系统</Link>,
      },
      {
        key: 'visitor-list',
        label: <Link to="/visitor/list">访客列表</Link>,
      },
      {
        key: 'visitor-records',
        label: <Link to="/visitor/records">访客记录</Link>,
      },
    ],
  },
];

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} theme="dark">
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['basic-info']}
            defaultOpenKeys={['basic']}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }} />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Routes>
              {/* 基础信息管理路由 */}
              <Route path="/basic/info" element={<BasicInfo />} />
              <Route path="/basic/building" element={<BuildingInfo />} />
              <Route path="/basic/department" element={<DepartmentInfo />} />
              <Route path="/basic/employee" element={<EmployeeInfo />} />

              {/* 角色和账号管理路由 */}
              <Route path="/role/management" element={<RoleManagement />} />
              <Route path="/role/account" element={<AccountManagement />} />

              {/* 系统管理路由 */}
              <Route path="/system/settings" element={<SystemSettings />} />
              <Route path="/system/log" element={<LogManagement />} />

              {/* 设备管理路由 */}
              <Route path="/device/wiring" element={<WiringSystem />} />
              <Route path="/device/wireless" element={<WirelessNetwork />} />
              <Route path="/device/video" element={<VideoSurveillance />} />
              <Route path="/device/access" element={<AccessControl />} />
              <Route path="/device/broadcast" element={<PublicBroadcast />} />
              <Route path="/device/patrol" element={<PatrolPoint />} />
              <Route path="/device/meeting" element={<SmartMeeting />} />
              <Route path="/device/list" element={<DeviceList />} />
              <Route path="/device/category" element={<DeviceCategory />} />
              <Route path="/device/maintenance" element={<DeviceMaintenance />} />

              {/* 访客管理路由 */}
              <Route path="/visitor/system" element={<VisitorSystem />} />
              <Route path="/visitor/list" element={<VisitorList />} />
              <Route path="/visitor/records" element={<VisitorRecords />} />

              {/* 默认路由 */}
              <Route path="/" element={<Navigate to="/basic/info" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App; 