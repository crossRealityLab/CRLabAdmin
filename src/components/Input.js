import React from 'react';
import { Input, Form } from 'antd';

export default ({
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
