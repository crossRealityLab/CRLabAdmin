import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import Logo from "./components/Logo";
import Members from "./pages/Members";
import News from "./pages/News";
import Projects from "./pages/Projects";

const { Header, Content, Footer, Sider } = Layout;

const Link = styled(NavLink)`
  &.active > span {
    color: #fff;
  }
`;

function App() {
  return (
    <Layout style={{ minWidth: "100vw", minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Logo>Cross Reality Lab</Logo>
        <Menu theme="dark" mode="inline" selectedKeys={[]}>
          <Menu.Item key="1">
            <Link to="/0" activeClassName="active">
              <Icon type="user" />
              <span>Projects</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/1" activeClassName="active">
              <Icon type="video-camera" />
              <span>Members</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/2" activeClassName="active">
              <Icon type="upload" />
              <span>News</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <Switch>
            <Route path="/0" component={Projects} />
            <Route path="/1" component={Members} />
            <Route path="/2" component={News} />
            <Redirect to="/0" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Cross Reality Lab Admin ©2019 Created by
        </Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(App);
