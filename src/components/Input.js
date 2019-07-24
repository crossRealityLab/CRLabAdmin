import React from 'react';
import styled from 'styled-components';
import { Input, Form } from 'antd';

/**
 * Fucking antd, validating msg only show when input is the directive child of Form.Item,
 * so in normal Input, I mannually add Form.Item as wrapper.
 */
export const InputItem = styled(Form.Item)`
  margin-bottom: 0;
`;

export const TextArea = ({
  dataKey,
  validationRules = [],
  inputProps = {},
  getFieldDecorator
}) => (
  <Form.Item>
    {getFieldDecorator(dataKey, {
      rules: validationRules
    })(<Input.TextArea {...inputProps} autosize />)}
  </Form.Item>
);

export const Field = ({
  dataKey,
  validationRules = [],
  inputProps = {},
  getFieldDecorator
}) => (
  <Form.Item>
    {getFieldDecorator(dataKey, {
      rules: validationRules
    })(<Input {...inputProps} />)}
  </Form.Item>
);
