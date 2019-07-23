import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon, notification } from 'antd';
import styled from 'styled-components';

import DynamicInput from '../../components/DynamicInput';
import ImgUploader from '../../components/ImgUploader';
import DynamicMutiInput from '../../components/DynamicMutiInput';
import { InputItem, TextArea, Field } from '../../components/Input';

import useFormData from '../../hooks/useFormData';
import useBinderInitializer from '../../hooks/useBinderInitializer';

import { dataBindingConfs, dataBindingKeys } from '../../configs/members';
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
  const { data = {}, isLoading = true } = useFormData('/members', match.params.uuid);
  useBinderInitializer({ ...form, data, dataBindingConfs });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          console.log('Received values of form: ', data);
          try {
            const preparedData = prepareData(data, dataBindingConfs);
            await uploadData(preparedData, '/members', match.params.uuid);

            notification.success({
              message: `Create/Edit ${data.title} complete!`,
              duration: 4
            });
            history.push(`/members/list`);
          } catch (e) {
            console.error(e);
            notification.error({
              message: `Create ${data.title} error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('MEMBER ON SUBMIT ERROR:', err);
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
      <InputItem label="Full name">
        <Field
          dataKey={dataBindingKeys.fullName}
          validationRules={[
            {
              required: true,
              message: 'Please set the full name of this memeber.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <Form.Item label="Avatar">
        <ImgUploader
          dataKey={dataBindingKeys.avatar}
          isSingleImg
          endpoint="/members"
          {...form}
        />
      </Form.Item>
      <InputItem label="Title">
        <Field
          dataKey={dataBindingKeys.title}
          validationRules={[
            {
              required: true,
              message:
                'Please set the title of this member(e.g. professor, PhD, Master).'
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
              message: 'Please set the email of this member.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <Form.Item label="Focus on">
        <DynamicInput dataKey={dataBindingKeys.focusOn} {...form} />
      </Form.Item>
      <InputItem label="Personal website">
        <Field
          dataKey={dataBindingKeys.website}
          validationRules={[
            {
              type: 'url',
              message: 'The input must be an url.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="About">
        <TextArea dataKey={dataBindingKeys.about} {...form} />
      </InputItem>
      <Form.Item label="Publications">
        <DynamicMutiInput
          dataKey={dataBindingKeys.publications}
          fields={[
            {
              key: 'title',
              inputParams: {
                placeholder: 'title'
              },
              validationRules: [
                {
                  required: true,
                  message: "Publication's title is required."
                }
              ]
            },
            {
              key: 'conference',
              inputParams: {
                placeholder: 'conference'
              }
            },
            {
              key: 'year',
              inputParams: {
                placeholder: 'year'
              },
              validationRules: [
                {
                  validator: (rule, value) => !isNaN(value),
                  message: 'Input must be a number.'
                }
              ]
            },
            {
              key: 'link',
              inputParams: {
                placeholder: 'link'
              },
              validationRules: [
                {
                  type: 'url',
                  message: 'Input must be an url.'
                }
              ]
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Awards">
        <DynamicMutiInput
          dataKey={dataBindingKeys.awards}
          fields={[
            {
              key: 'title',
              inputParams: {
                placeholder: 'title'
              }
            },
            {
              key: 'year',
              inputParams: {
                placeholder: 'year'
              }
            }
          ]}
          {...form}
        />
      </Form.Item>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/members/list">
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default Form.create()(MemberForm);
