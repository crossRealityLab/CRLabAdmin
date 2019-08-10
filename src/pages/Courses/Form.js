import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, notification } from 'antd';
import styled from 'styled-components';

import DynamicInput from '../../components/DynamicInput';
import DynamicMutiInput from '../../components/DynamicMutiInput';
import { InputItem, Field } from '../../components/Input';
import Loading from '../../components/Loading';

import useFormData from '../../hooks/useFormData';
import useBinderInitializer from '../../hooks/useBinderInitializer';

import { dataBindingConfs, dataBindingKeys } from '../../configs/courses';
import { prepareData, uploadData } from '../../utils/uploadDataHelpers';

const ButtonWrapper = styled.div`
  display: flex;
  margin: 40px 0 0 40px;

  > * {
    margin: 0 5px;
  }
`;

const MemberForm = ({ form, match, history }) => {
  const { validateFields } = form;
  const { data = {}, isLoading = true } = useFormData('/courses', match.params.uuid);
  useBinderInitializer({ ...form, data, dataBindingConfs });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          console.log('Received values of form: ', data);
          try {
            const preparedData = prepareData(data, dataBindingConfs);
            await uploadData(preparedData, '/courses', match.params.uuid);

            notification.success({
              message: `Create/Edit ${data.name} complete!`,
              duration: 4
            });

            history.push(`/courses/list`);
          } catch (e) {
            notification.error({
              message: `Upload ${data.name} error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('COURSE ON SUBMIT ERROR:', err);
        }
      });
    },
    [validateFields, match.params.uuid, history]
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
      <Form.Item label="UUID">
        {data.uuid ? <strong>{data.uuid}</strong> : ''}
      </Form.Item>
      <InputItem label="Course ID">
        <Field
          dataKey={dataBindingKeys.courseID}
          validationRules={[
            {
              required: true,
              message: 'Please set the course id of this course.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Name">
        <Field
          dataKey={dataBindingKeys.name}
          validationRules={[
            {
              required: true,
              message:
                'Please set the name of this course.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Credits">
        <Field
          dataKey={dataBindingKeys.credits}
          validationRules={[
            {
              validator: (rule, value) => !isNaN(value),
              message: 'The input must be an number.'
            },
            {
              required: true,
              message: 'Please set the credits of this course.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Term And Year">
        <Field
          dataKey={dataBindingKeys.termAndYear}
          validationRules={[
            {
              required: true,
              message: 'Please set the term and year of this course. e.g. 2019 Fall, Monday 3pm – 5:50pm'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Location">
        <Field
          dataKey={dataBindingKeys.location}
          validationRules={[
            {
              required: true,
              message: 'Please set the location of this course.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <Form.Item label="TAs">
        <DynamicMutiInput
          dataKey={dataBindingKeys.tas}
          fields={[
            {
              key: 'name',
              inputParams: {
                placeholder: 'TA\'s name',
              },
              validationRules: [
                {
                  required: true,
                  message: "TA's name is required."
                }
              ]
            },
            {
              key: 'email',
              inputParams: {
                placeholder: 'TA\'s email'
              },
              validationRules: [
                {
                  required: true,
                  message: "TA's email is required."
                },
                {
                  type: 'email',
                  message: "Input must be email."
                },
              ]
            },
          ]}
          {...form}
        />
      </Form.Item>
      <InputItem label="Office">
        <Field
          dataKey={dataBindingKeys.office}
          validationRules={[
            {
              required: true,
              message: 'Please set the professor\'s office.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Office hours">
        <Field
          dataKey={dataBindingKeys.officeHours}
          {...form}
        />
      </InputItem>
      <InputItem label="Email">
        <Field
          dataKey={dataBindingKeys.email}
          validationRules={[
            {
              type: 'email',
              message: "Input must be email."
            }
          ]}
          {...form}
        />
      </InputItem>
      <Form.Item label="Descriptions">
        <DynamicInput dataKey={dataBindingKeys.descriptions} {...form} />
      </Form.Item>
      <InputItem label="Information link">
        <Field
          dataKey={dataBindingKeys.link}
          validationRules={[
            {
              required: true,
              message: 'Please set the link to the nctu course information page.'
            },
            {
              type: 'url',
              message: 'The input must be an url.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/courses/list">
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default Form.create()(MemberForm);
