import React, { useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form as AForm, Button, notification } from 'antd';
import styled from 'styled-components';

import DynamicInput from '../components/DynamicInput';
import DynamicMutiInput from '../components/DynamicMutiInput';
import ImgUploader from '../components/ImgUploader';
import { InputItem, TextArea, Field } from '../components/Input';
import Loading from '../components/Loading';

import useFormData from '../hooks/useFormData';
import useBinderInitializer from '../hooks/useBinderInitializer';

import { InputType } from '../constants';
import { prepareData, uploadData } from '../utils/uploadDataHelpers';

const ButtonWrapper = styled.div`
  display: flex;
  margin: 40px 0 0 40px;

  > * {
    margin: 0 5px;
  }
`;

const getInputWrapper = inputType => {
  if (inputType === InputType.FIELD) {
    return InputItem;
  }
  return AForm.Item;
};

const getInputField = inputType => {
  if (inputType === InputType.FIELD) {
    return Field;
  }
  if (inputType === InputType.TEXTAREA) {
    return TextArea;
  }
  if (
    inputType === InputType.IMG ||
    inputType === InputType.IMGS_WITH_CAPTION
  ) {
    return ImgUploader;
  }

  if (inputType === InputType.MULTI_FIELDS) {
    return DynamicInput;
  }

  if (inputType === InputType.MULTI_FIELDS_OF_FIELDS) {
    return DynamicMutiInput;
  }
};

const Form = ({
  form,
  match,
  history,
  formFields, 
  withUUID,
  routePath,
  endpoint
}) => {
  const { validateFields } = form;
  const { data = {}, isLoading = true } = useFormData(
    endpoint,
    match.params.uuid
  );
  useBinderInitializer({ ...form, data, formFields });

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          try {
            const preparedData = prepareData(data, formFields);
            await uploadData(preparedData, endpoint, match.params.uuid);

            notification.success({
              message: `Create/Edit ${data.title} complete!`,
              duration: 4
            });

            history.push(`${routePath}/list`);
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
    [
      validateFields,
      match.params.uuid,
      history,
      formFields,
      routePath,
      endpoint
    ]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AForm
      onSubmit={handleSubmit}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      {withUUID && (
        <AForm.Item label="UUID">
          {data.uuid ? <strong>{data.uuid}</strong> : ''}
        </AForm.Item>
      )}
      {formFields.map((field, idx) => {
        const Wrapper = getInputWrapper(field.inputType);
        const InputField = getInputField(field.inputType);
        return (
          <Wrapper key={idx} label={field.label}>
            <InputField {...field.inputProps} {...form} />
          </Wrapper>
        );
      })}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to={`${routePath}/list`}>
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </AForm>
  );
};

export default AForm.create()(withRouter(Form));
