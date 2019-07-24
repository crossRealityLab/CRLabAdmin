import React from 'react';
import styled from 'styled-components';
import { Spin, Icon } from 'antd';

const LoadingIcon = styled(Icon).attrs(() => ({
  type: 'loading',
  spin: true
}))`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 24;
`;

export default () => <Spin indicator={<LoadingIcon />} />;