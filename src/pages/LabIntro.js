import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, notification } from 'antd';
import styled from 'styled-components';

import { InputItem, Field } from '../components/Input';
import DynamicInput from '../components/DynamicInput';
import Loading from '../components/Loading';

import useFormData from '../hooks/useFormData';
import useBinderInitializer from '../hooks/useBinderInitializer';

import { dataBindingConfs, dataBindingKeys } from '../configs/labIntro';
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
  const { data = {}, isLoading = true } = useFormData('/labIntro');
  useBinderInitializer({ ...form, data, dataBindingConfs });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          try {
            const preparedData = prepareData(data, dataBindingConfs);
            await uploadPlainData(preparedData, '/labIntro');

            notification.success({
              message: `Create/Edit Lab Introduction complete!`,
              duration: 4
            });
          } catch (e) {
            notification.error({
              message: `Upload Lab Introduction error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('LabIntro ON SUBMIT ERROR:', err);
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
      <InputItem label="Title">
        <Field
          dataKey={dataBindingKeys.title}
          validationRules={[
            {
              required: true,
              message: 'Please set the title.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="subTitle">
        <Field dataKey={dataBindingKeys.subTitle} {...form} />
      </InputItem>
      <Form.Item label="Visions">
        <DynamicInput dataKey={dataBindingKeys.visions} {...form} />
      </Form.Item>
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
