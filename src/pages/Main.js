import React, { useCallback } from 'react';
import styled from 'styled-components';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';

import firebase from '../firebase';
import Logo from '../components/Logo';
import { pagesConfig } from '../configs';
import RouteEntry from './routeEntry';

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
          {pagesConfig.map(({ tabName, routePath, iconType }) => (
            <Menu.Item key={tabName}>
              <Link to={routePath} activeClassName="active">
                <Icon type={iconType} />
                <span>{tabName}</span>
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
            {pagesConfig.map(({ tabName, routePath, endpoint, routes }) => (
              <Route
                key={tabName}
                path={routePath}
                render={() => (
                  <RouteEntry
                    routePath={routePath}
                    endpoint={endpoint}
                    routes={routes}
                  />
                )}
              />
            ))}
            <Redirect to="/projects" />
          </Switch>
        </StyledContent>
        <StyledFooter>Cross Reality Lab Admin ©2019</StyledFooter>
      </Layout>
    </StyledLayout>
  );
};
