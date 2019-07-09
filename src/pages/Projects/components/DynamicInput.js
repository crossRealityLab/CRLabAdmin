import React from "react";
import { Form, Input, Button, Icon } from "antd";

export default ({
  title,
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  validationRules = [],
  isTextArea = false
}) => {
  const remove = k => {
    // can use data-binding to get
    const keys = getFieldValue(`${dataKey}-keys`);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    setFieldsValue({
      [`${dataKey}-keys`]: keys.filter(key => key !== k)
    });
  };

  const add = () => {
    const keys = getFieldValue(`${dataKey}-keys`);
    setFieldsValue({
      [`${dataKey}-keys`]: [...keys, keys.length]
    });
  };

  getFieldDecorator(`${dataKey}-keys`, { initialValue: [0] });
  const keys = getFieldValue(`${dataKey}-keys`);

  return (
    <React.Fragment>
      {keys.map((k, index) => (
        <Form.Item
          label={index === 0 ? `${title}` : ""}
          required={false}
          key={k}
          wrapperCol={
            index > 0 ? { span: 12, offset: 4 } : { span: 12, offset: 1 }
          }
        >
          {getFieldDecorator(`${dataKey}[${k}]`, {
            rules: validationRules,
          })(
            isTextArea ? (
              <Input.TextArea style={{ width: "80%" }} autosize />
            ) : (
              <Input style={{ width: "80%" }} />
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
      <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
        <Button type="dashed" onClick={add} style={{ width: "60%" }}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
    </React.Fragment>
  );
};