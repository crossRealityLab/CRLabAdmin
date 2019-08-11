import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Icon } from 'antd';

export const InputWrapper = styled(Form.Item).attrs(() => ({
  wrapperCol: { span: 20 }
}))`
  width: 150%;
  margin-bottom: -20px;
  z-index: 1;
`;

export const AddButtonWrapper = styled(Form.Item).attrs(() => ({
  wrapperCol: { span: 12, offset: 2 }
}))`
  margin-bottom: unset;
`;

export const TextArea = styled(Input.TextArea)`
  width: 80%;
`;

export const Field = styled(Input)`
  width: 80%;
`;

export const RemoveIcon = styled(Icon).attrs(() => ({
  type: 'minus-circle-o'
}))`
  margin-left: 10px;
`;

export const AddButton = styled(Button).attrs(() => ({
  type: 'dashed'
}))`
  width: 60%;
`;

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  validationRules = [],
  isTextArea = false,
  limitedFieldNums
}) => {
  getFieldDecorator(`${dataKey}-idx`, { initialValue: [0] });
  const keys = getFieldValue(`${dataKey}-idx`);

  const currentId = useRef(keys.length);

  const remove = k => () => {
    const keys = getFieldValue(`${dataKey}-idx`);
    if (keys.length === 1) {
      return;
    }

    setFieldsValue({
      [`${dataKey}-idx`]: keys.filter(key => key !== k)
    });
  };

  const add = useCallback(() => {
    const keys = getFieldValue(`${dataKey}-idx`);
    setFieldsValue({
      [`${dataKey}-idx`]: [...keys, currentId.current]
    });

    currentId.current = currentId.current + 1;
  }, [getFieldValue, setFieldsValue, dataKey]);

  return (
    <React.Fragment>
      {keys.map(k => (
        <InputWrapper key={k}>
          {getFieldDecorator(`${dataKey}[${k}]`, {
            rules: validationRules
          })(isTextArea ? <TextArea autosize /> : <Field />)}
          {keys.length > 1 && <RemoveIcon onClick={remove(k)} />}
        </InputWrapper>
      ))}
      {!(limitedFieldNums && keys.length >= limitedFieldNums) && (
        <AddButtonWrapper>
          <AddButton onClick={add}>
            <Icon type="plus" /> Add field
          </AddButton>
        </AddButtonWrapper>
      )}
    </React.Fragment>
  );
};
