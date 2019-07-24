import React, { useCallback } from 'react';
import styled from 'styled-components';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';

import firebase from '../firebase';
import Logo from '../components/Logo';
import { pagesConfig } from '../configs/share';

const { Header, Content, Footer, Sider } = Layout;

const Link = styled(NavLink)`
  &.active > span {
    color: #fff;
  }
`;

const StyledLayout = styled(Layout)`
  min-width: 100vw;
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 20px;
  text-align: end; 
`;

const StyledContent = styled(Content)`
  margin: 24px 16px 0;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

export default () => {
  const signOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <StyledLayout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Logo>Cross Reality Lab</Logo>
        <Menu theme="dark" mode="inline" selectedKeys={[]}>
          {pagesConfig.map(({ name, path, iconType }) => (
            <Menu.Item key={name}>
              <Link to={path} activeClassName="active">
                <Icon type={iconType} />
                <span>{name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <StyledHeader>
          <Button type="danger" onClick={signOut}>
            Sign out
          </Button>
        </StyledHeader>
        <StyledContent>
          <Switch>
            {pagesConfig.map(({ path, page }) => (
              <Route key={path} path={path} component={page} />
            ))}
            <Redirect to="/projects" />
          </Switch>
        </StyledContent>
        <StyledFooter>
          Cross Reality Lab Admin ©2019
        </StyledFooter>
      </Layout>
    </StyledLayout>
  );
};
