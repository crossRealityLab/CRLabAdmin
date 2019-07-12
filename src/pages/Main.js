import React, { useCallback } from 'react';
import styled from 'styled-components';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';

import firebase from '../firebase';
import Logo from '../components/Logo';
import Members from './Members';
import News from './News';
import Projects from './Projects';

const { Header, Content, Footer, Sider } = Layout;

const Link = styled(NavLink)`
  &.active > span {
    color: #fff;
  }
`;

export default () => {
  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <Layout style={{ minWidth: '100vw', minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Logo>Cross Reality Lab</Logo>
        <Menu theme="dark" mode="inline" selectedKeys={[]}>
          <Menu.Item key="1">
            <Link to="/projects" activeClassName="active">
              <Icon type="project" />
              <span>Projects</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/members" activeClassName="active">
              <Icon type="user" />
              <span>Members</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/news" activeClassName="active">
              <Icon type="alert" />
              <span>News</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 20px', textAlign: 'end' }}>
          <Button type="danger" onClick={signOut}>Sign out</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            <Route path="/projects" component={Projects} />
            <Route path="/members" component={Members} />
            <Route path="/news" component={News} />
            <Redirect to="/projects" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Cross Reality Lab Admin ©2019
        </Footer>
      </Layout>
    </Layout>
  );
};
