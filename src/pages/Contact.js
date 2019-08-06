import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, notification } from 'antd';
import styled from 'styled-components';

import { InputItem, Field } from '../components/Input';
import Loading from '../components/Loading';

import useFormData from '../hooks/useFormData';
import useBinderInitializer from '../hooks/useBinderInitializer';

import { dataBindingConfs, dataBindingKeys } from '../configs/contact';
import { prepareData, uploadPlainData } from '../utils/uploadDataHelpers';

const ButtonWrapper = styled.div`
  display: flex;
  margin: 40px 0 0 40px;

  > * {
    margin: 0 5px;
  }
`;

const LabIntoForm = ({ form }) => {
  const { validateFields } = form;
  const { data = {}, isLoading = true } = useFormData('/contact');
  useBinderInitializer({ ...form, data, dataBindingConfs });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          try {
            const preparedData = prepareData(data, dataBindingConfs);
            await uploadPlainData(preparedData, '/contact');

            notification.success({
              message: `Create/Edit Contact complete!`,
              duration: 4
            });
          } catch (e) {
            notification.error({
              message: `Upload Contact error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('Contact ON SUBMIT ERROR:', err);
        }
      });
    },
    [validateFields]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      <InputItem label="Name">
        <Field
          dataKey={dataBindingKeys.name}
          validationRules={[
            {
              required: true,
              message: 'Please set the name.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Email">
        <Field
          dataKey={dataBindingKeys.email}
          validationRules={[
            {
              type: 'email',
              message: 'The input must be an email.'
            },
            {
              required: true,
              message: 'Please set the email.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Office">
        <Field
          dataKey={dataBindingKeys.office}
          validationRules={[
            {
              required: true,
              message: 'Please set the office.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Office hours">
        <Field dataKey={dataBindingKeys.officeHours} {...form} />
      </InputItem>
      <InputItem label="Lab">
        <Field
          dataKey={dataBindingKeys.lab}
          validationRules={[
            {
              required: true,
              message: 'Please set the lab location.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Description">
        <Field dataKey={dataBindingKeys.description} {...form} />
      </InputItem>
      <InputItem label="Banner link">
        <Field
          dataKey={dataBindingKeys.banner}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be an url.'
            }
          ]}
          {...form}
        />
      </InputItem>

      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/news/list">
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default Form.create()(LabIntoForm);
