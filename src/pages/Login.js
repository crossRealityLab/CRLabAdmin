import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { Form, Icon, Button, notification } from 'antd';

import firebase from '../firebase';
import { AuthContext } from '../providers/Auth';
import { InputItem, Field } from '../components/Input';

const MiddlizeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #eee;
`;

const Login = ({ history, form }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          const { account, password } = values;
          try {
            await firebase.auth().signInWithEmailAndPassword(account, password);
            history.push('/');
          } catch (error) {
            notification.error({
              message: `Auth to server error`,
              description: `${error}`,
              duration: 2
            });
          }
        }
      });
    },
    [history, form]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <MiddlizeWrapper>
      <h1>CR Lab</h1>
      <Form onSubmit={handleLogin}>
        <InputItem>
          <Field
            dataKey="account"
            validationRules={[
              { required: true, message: 'Please input your account.' },
              { type: 'email', message: 'Account should be an email.' }
            ]}
            inputProps={{
              prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />,
              placeholder: 'Account'
            }}
            {...form}
          />
        </InputItem>
        <InputItem>
          <Field
            dataKey="password"
            validationRules={[
              { required: true, message: 'Please input your password.' }
            ]}
            inputProps={{
              prefix: <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />,
              type: 'password',
              placeholder: 'Password'
            }}
            {...form}
          />
        </InputItem>
        <Button htmlType="submit" style={{ float: 'right' }}>
          Log in
        </Button>
      </Form>
    </MiddlizeWrapper>
  );
};

export default Form.create()(Login);
