import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const menu: MenuProps['items'] = [
    {
        key: '/',
        icon: <></>,
        label: '首页'
    },
    {
        key: 'components',
        icon: <></>,
        label: '组件',
        children: [
            {
                key: 'at-input',
                label: '@输入框'
            },
            {
                key: 'poker',
                label: '吊皮儿'
            }
        ]
    }
];

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();
    const route = useNavigate();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <h2 className=" text-white text-2xl">技术锋</h2>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        items={menu}
                        onSelect={({ key }) => {
                            route(key);
                        }}
                    />
                </Sider>
                <Layout className="p-4">
                    <Content
                        style={{
                            // overflowY: 'auto',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
