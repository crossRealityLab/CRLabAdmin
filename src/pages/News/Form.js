import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon, notification } from 'antd';
import styled from 'styled-components';

import { InputItem, TextArea, Field } from '../../components/Input';

import useFormData from '../../hooks/useFormData';
import useBinderInitializer from '../../hooks/useBinderInitializer';

import { dataBindingConfs, dataBindingKeys } from '../../configs/news';
import { prepareData, uploadData } from '../../utils/uploadDataHelpers';

const LoadingIcon = styled(Icon).attrs(() => ({
  type: 'loading',
  spin: true
}))`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 24;
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin: 40px 0 0 40px;

  > * {
    margin: 0 5px;
  }
`;

const MemberForm = ({ form, match, history }) => {
  const { validateFields } = form;
  const { data = {}, isLoading = true } = useFormData('/news', match.params.uuid);
  useBinderInitializer({ ...form, data, dataBindingConfs });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          try {
            const preparedData = prepareData(data, dataBindingConfs);
            await uploadData(preparedData, '/news', match.params.uuid);

            notification.success({
              message: `Create/Edit ${data.title} complete!`,
              duration: 4
            });
            history.push(`/news/list`);
          } catch (e) {
            notification.error({
              message: `Upload ${data.title} error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('NEWS ON SUBMIT ERROR:', err);
        }
      });
    },
    [validateFields, match.params.uuid, history]
  );

  if (isLoading) {
    return <Spin indicator={<LoadingIcon />} />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      <Form.Item label="UUID">
        {data.uuid ? <strong>{data.uuid}</strong> : ''}
      </Form.Item>
      <InputItem label="Title">
        <Field
          dataKey={dataBindingKeys.title}
          validationRules={[
            {
              required: true,
              message:
                'Please set the title of this news.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Description">
        <TextArea
          dataKey={dataBindingKeys.description}
          {...form}
        />
      </InputItem>
      <InputItem label="Date">
        <Field
          dataKey={dataBindingKeys.date}
          validationRules={[
            {
              validator: (rule, value) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value),
              message:
                'Input must be format as YYYY-MM-DD.'
            },
            {
              required: true,
              message:
                'Please set the date of this news(YYYY-MM-DD).'
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

export default Form.create()(MemberForm);
