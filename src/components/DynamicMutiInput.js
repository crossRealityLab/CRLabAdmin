import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Form, Icon } from 'antd';

import {
  InputWrapper,
  AddButtonWrapper,
  TextArea,
  Field,
  RemoveIcon,
  AddButton
} from './DynamicInput';

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  fields = []
}) => {
  getFieldDecorator(`${dataKey}-idx`, { initialValue: [] });
  const keys = getFieldValue(`${dataKey}-idx`);
  getFieldDecorator(dataKey, { initialValue: [] });
  const data = getFieldValue(dataKey);

  const [hasInitLoad, setHasInitLoad] = useState(false);
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

  const add = useCallback(() => {
    const keys = getFieldValue(`${dataKey}-idx`);

    setFieldsValue({
      [`${dataKey}-idx`]: [...keys, currentId.current]
    });

    currentId.current = currentId.current + 1;
  }, [getFieldValue, setFieldsValue, dataKey]);

  // Control Input by ourself
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
      const setPairs = data.reduce((acc, current, idx) => {
        const obj = Object.entries(current).reduce(
          (_acc, [key, value]) => ({
            ..._acc,
            [`${dataKey}-${key}-${idx}`]: value
          }),
          {}
        );

        return {
          ...acc,
          ...obj
        };
      }, {});

      setFieldsValue(setPairs);
      setHasInitLoad(true);
    }

    // When Create
    if (!hasInitLoad && keys.length < 1) {
      setHasInitLoad(true);
    }
  }, [hasInitLoad, data, keys, dataKey, setFieldsValue, setHasInitLoad]);

  return (
    <>
      {keys.map(k => (
        <InputWrapper key={k}>
          {fields.map(({ key, validationRules, inputParams, isTextArea }) => (
            <Form.Item key={key}>
              {isTextArea
                ? getFieldDecorator(`${dataKey}-${key}-${k}`, {
                    rules: validationRules
                  })(
                    <TextArea
                      onChange={handleFieldChange(k, key)}
                      autosize
                      {...inputParams}
                    />
                  )
                : getFieldDecorator(`${dataKey}-${key}-${k}`, {
                    rules: validationRules
                  })(
                    <Field
                      onChange={handleFieldChange(k, key)}
                      {...inputParams}
                    />
                  )}
            </Form.Item>
          ))}
          {keys.length > 0 && <RemoveIcon onClick={remove(k)} />}
        </InputWrapper>
      ))}
      <AddButtonWrapper>
        <AddButton onClick={add}>
          <Icon type="plus" /> Add field
        </AddButton>
      </AddButtonWrapper>
    </>
  );
};
