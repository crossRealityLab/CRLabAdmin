import React from 'react';
import { Input } from 'antd';

export default ({ dataKey, validationRules = [], getFieldDecorator }) =>
  getFieldDecorator(dataKey, {
    rules: validationRules,
    validateTrigger: ['onBlur', 'onChange'],
  })(<Input />);
