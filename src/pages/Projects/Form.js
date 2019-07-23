import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon, notification } from 'antd';
import styled from 'styled-components';

import DynamicInput from '../../components/DynamicInput';
import ImgUploader from '../../components/ImgUploader';
import { InputItem, TextArea, Field } from '../../components/Input';

import useFormData from '../../hooks/useFormData';
import useBinderInitializer from '../../hooks/useBinderInitializer';

import { dataBindingConfs, dataBindingKeys } from '../../configs/projects';
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

const ProjectForm = ({ form, match, history }) => {
  const { validateFields } = form;
  const { data = {}, isLoading = true } = useFormData('/projects', match.params.uuid);
  useBinderInitializer({ ...form, data, dataBindingConfs });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          try {
            const preparedData = prepareData(data, dataBindingConfs);
            await uploadData(preparedData, '/projects', match.params.uuid);

            notification.success({
              message: `Create/Edit ${data.title} complete!`,
              duration: 4
            });

            history.push(`/projects/list`);
          } catch (e) {
            notification.error({
              message: `Upload ${data.title} error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('PROJECT ON SUBMIT ERROR:', err);
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
      <InputItem label="Show title">
        <Field
          dataKey={dataBindingKeys.showTitle}
          validationRules={[
            {
              required: true,
              message:
                'Please set the show title which will show on the enter image of this project.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Title">
        <Field
          dataKey={dataBindingKeys.title}
          validationRules={[
            {
              required: true,
              message: 'Please set the title of this project.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Year">
        <Field
          dataKey={dataBindingKeys.year}
          validationRules={[
            {
              validator: (rule, value) => !isNaN(value),
              message: 'The input must be a number.'
            },
            {
              required: true,
              message: 'Please set the starting year of this project.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <Form.Item label="Authors">
        <DynamicInput
          dataKey={dataBindingKeys.authors}
          validationRules={[
            {
              required: true,
              message:
                'Please set at least one author of this project, and remove unuse feild.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Cover">
        <ImgUploader
          title="Cover"
          dataKey={dataBindingKeys.cover}
          isSingleImg
          endpoint="/projects"
          {...form}
        />
      </Form.Item>
      <Form.Item label="Images">
        <ImgUploader dataKey={dataBindingKeys.imgs} withCaption {...form} />
      </Form.Item>
      <Form.Item label="Video links">
        <DynamicInput
          dataKey={dataBindingKeys.videos}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <InputItem label="Abstract">
        <TextArea
          dataKey={dataBindingKeys.abstract}
          validationRules={[
            {
              required: true,
              message: 'Please set the abstract of this project.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <Form.Item label="Descriptions">
        <DynamicInput
          dataKey={dataBindingKeys.descriptions}
          validationRules={[
            {
              required: true,
              message:
                'Please set at least one description section of this project, and remove unuse feild.'
            }
          ]}
          isTextArea
          {...form}
        />
      </Form.Item>
      <Form.Item label="Tags">
        <DynamicInput dataKey={dataBindingKeys.tags} {...form} />
      </Form.Item>
      <InputItem label="Publication on">
        <Field dataKey={dataBindingKeys.publicationOn} {...form} />
      </InputItem>
      <InputItem label="Accepted year">
        <Field
          dataKey={dataBindingKeys.acceptedYear}
          validationRules={[
            {
              validator: (rule, value) => value === undefined || !isNaN(value),
              message: 'Input must be a number.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="PDF link">
        <Field
          dataKey={dataBindingKeys.pdf}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="DOI link">
        <Field
          dataKey={dataBindingKeys.doi}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/projects/list">
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default Form.create()(ProjectForm);
