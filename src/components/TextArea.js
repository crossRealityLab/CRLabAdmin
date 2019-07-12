import React from 'react';
import { Input, Form } from 'antd';

export default ({ dataKey, validationRules = [], getFieldDecorator }) => (
  <Form.Item>
    {getFieldDecorator(dataKey, {
      rules: validationRules
    })(<Input.TextArea autosize />)}
  </Form.Item>
);
