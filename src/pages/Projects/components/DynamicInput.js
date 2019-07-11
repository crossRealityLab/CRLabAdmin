import React, { useRef } from 'react';
import { Form, Input, Button, Icon } from 'antd';

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  validationRules = [],
  isTextArea = false
}) => {
  getFieldDecorator(`${dataKey}-idx`, { initialValue: [0] });
  const keys = getFieldValue(`${dataKey}-idx`);
  const currentId = useRef(keys.length);

  const remove = k => {
    // can use data-binding to get
    const keys = getFieldValue(`${dataKey}-idx`);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    setFieldsValue({
      [`${dataKey}-idx`]: keys.filter(key => key !== k)
    });
  };

  const add = () => {
    const keys = getFieldValue(`${dataKey}-idx`);
    setFieldsValue({
      [`${dataKey}-idx`]: [...keys, currentId.current]
    });

    currentId.current = currentId.current + 1;
  };

  return (
    <React.Fragment>
      {keys.map(k => (
        <Form.Item
          style={{ width: '150%', marginBottom: '-20px' }}
          required={false}
          key={k}
          wrapperCol={{ span: 20 }}
        >
          {getFieldDecorator(`${dataKey}[${k}]`, {
            rules: validationRules
          })(
            isTextArea ? (
              <Input.TextArea style={{ width: '80%' }} autosize />
            ) : (
              <Input style={{ width: '80%' }} />
            )
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => remove(k)}
              style={{ marginLeft: '10px' }}
            />
          ) : null}
        </Form.Item>
      ))}
      <Form.Item wrapperCol={{ span: 12, offset: 2 }} style={{ marginBottom: 'unset' }}>
        <Button type="dashed" onClick={add} style={{ width: '60%'}}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
    </React.Fragment>
  );
};
