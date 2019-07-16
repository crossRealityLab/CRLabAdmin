import React, { useRef } from 'react';
import { Form, Input, Button, Icon } from 'antd';

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  fields = [],
}) => {
  getFieldDecorator(`${dataKey}-idx`, { initialValue: [0] });
  const keys = getFieldValue(`${dataKey}-idx`);
  getFieldDecorator(dataKey, { initialValue: [] });
  const data = getFieldValue(dataKey);

  const currentId = useRef(keys.length);

  const remove = k => () => {
    const keys = getFieldValue(`${dataKey}-idx`);
    if (keys.length === 1) {
      return;
    }

    const newData = [...data];
    newData[k] = undefined;

    setFieldsValue({
      [`${dataKey}-idx`]: keys.filter(key => key !== k),
      [dataKey]: newData
    });
  };

  const add = () => {
    const keys = getFieldValue(`${dataKey}-idx`);

    setFieldsValue({
      [`${dataKey}-idx`]: [...keys, currentId.current]
    });

    currentId.current = currentId.current + 1;
  };

  const handleFieldChange = (idx, key) => e => {
    const newData = [...data];

    if (!newData[idx]) {
      newData[idx] = fields.reduce((acc, current) => {
        if (current.key === key) {
          return {
            ...acc,
            [current.key]: e.target.value
          };
        }
        return {
          ...acc,
          [current.key]: ''
        };
      }, {});
    } else {
      newData[idx][key] = e.target.value;
    }

    setFieldsValue({
      [dataKey]: newData
    });
  };

  console.log(data);

  return (
    <React.Fragment>
      {keys.map(k => (
        <Form.Item
          style={{ width: '150%', marginBottom: '-20px' }}
          key={k}
          wrapperCol={{ span: 20 }}
        >
          {fields.map(({ key, validationRules, inputParams, isTextArea }) =>
            isTextArea ? (
              <Input.TextArea
                key={key}
                value={data[k] && data[k][key] ? data[k][key] : ''}
                onChange={handleFieldChange(k, key)}
                style={{ width: '80%' }}
                autosize
                {...inputParams}
              />
            ) : (
              <Input
                key={key}
                value={data[k] && data[k][key] ? data[k][key] : ''}
                onChange={handleFieldChange(k, key)}
                {...inputParams}
              />
            )
          )}

          {keys.length > 1 ? (
            <Icon
              type="minus-circle-o"
              onClick={remove(k)}
              style={{ marginLeft: '10px' }}
            />
          ) : null}
        </Form.Item>
      ))}
      <Form.Item
        wrapperCol={{ span: 12, offset: 2 }}
        style={{ marginBottom: 'unset' }}
      >
        <Button type="dashed" onClick={add} style={{ width: '60%' }}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
    </React.Fragment>
  );
};
