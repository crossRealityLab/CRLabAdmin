import React, { useRef, useState, useEffect } from 'react';
import { Form, Input, Button, Icon } from 'antd';

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  fields = []
}) => {
  const [hasInitLoad, setHasInitLoad] = useState(false);

  getFieldDecorator(`${dataKey}-idx`, { initialValue: [] });
  const keys = getFieldValue(`${dataKey}-idx`);
  getFieldDecorator(dataKey, { initialValue: [] });
  const data = getFieldValue(dataKey);

  const currentId = useRef(keys.length);

  const remove = k => () => {
    const keys = getFieldValue(`${dataKey}-idx`);

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

  useEffect(() => {
    if (!hasInitLoad && data.length > 0) {
      const set = data.reduce((acc, current, idx) => {
        const obj = Object.entries(current).reduce((_acc, [key, value]) => {
          return {
            ..._acc,
            [`${dataKey}-${key}-${idx}`]: value
          };
        }, {});
        return {
          ...acc,
          ...obj
        };
      }, {});
      setFieldsValue({ ...set });
      setHasInitLoad(true);
    }

    // When Create
    if(!hasInitLoad && keys.length < 1) {
      setHasInitLoad(true);
    }

  });

  return (
    <React.Fragment>
      {keys.map(k => (
        <Form.Item
          style={{ width: '150%', marginBottom: '-20px' }}
          key={k}
          wrapperCol={{ span: 20 }}
        >
          {fields.map(({ key, validationRules, inputParams, isTextArea }) => (
            <Form.Item key={key}>
              {isTextArea
                ? getFieldDecorator(`${dataKey}-${key}-${k}`, {
                    rules: validationRules
                  })(
                    <Input.TextArea
                      onChange={handleFieldChange(k, key)}
                      style={{ width: '80%' }}
                      autosize
                      {...inputParams}
                    />
                  )
                : getFieldDecorator(`${dataKey}-${key}-${k}`, {
                    rules: validationRules
                  })(
                    <Input
                      onChange={handleFieldChange(k, key)}
                      {...inputParams}
                    />
                  )}
            </Form.Item>
          ))}

          {keys.length > 0 ? (
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
