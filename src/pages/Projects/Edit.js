import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin, Icon } from "antd";

import DynamicInput from "./components/DynamicInput";
import ImgUploader from "./components/ImgUploader";

import { getMockProjects } from "../../mockdata";

const fakeAPI = () => {
  const mockdata = getMockProjects(1)[0];
  return new Promise(resolve => {
    setTimeout(() => resolve(mockdata), 2000);
  });
};

const ProjectForm = ({ form, match }) => {
  const { validateFields, getFieldDecorator } = form;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  console.log(match);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fakeAPI();
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  if (isLoading)
    return (
      <Spin
        indicator={
          <Icon
            type="loading"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              fontSize: 24
            }}
            spin
          />
        }
      />
    );

  return (
    <Form
      onSubmit={handleSubmit}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      <Form.Item label="PID" />
      <Form.Item label="Show title">
        {getFieldDecorator("showTitle", {
          rules: [
            {
              required: true,
              message:
                "Please set the show title which will show on the enter image of this project."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Title">
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              message: "Please set the title of this project."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Year">
        {getFieldDecorator("year", {
          rules: [
            {
              validator: (_rule, value) => !isNaN(value),
              message: "The input must be a number."
            },
            {
              required: true,
              message: "Please set the starting year of this project."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <DynamicInput
        title="Authors"
        validationRules={[
          {
            required: true,
            message:
              "Please set at least one author of this project, and remove unuse feild."
          }
        ]}
        {...form}
      />
      <ImgUploader title="Cover" {...form} isSingleImg />
      <ImgUploader title="Imgs" {...form} />
      <DynamicInput
        title="Video links"
        validationRules={[
          {
            type: "url",
            message: "Input must be a link."
          }
        ]}
        {...form}
      />
      <Form.Item label="Abstract">
        {getFieldDecorator("abstract", {
          rules: [
            {
              required: true,
              message: "Please set the abstract of this project."
            }
          ]
        })(<Input.TextArea autosize />)}
      </Form.Item>
      <DynamicInput
        title="Descriptions"
        validationRules={[
          {
            required: true,
            message:
              "Please set at least one description section of this project, and remove unuse feild."
          }
        ]}
        isTextArea
        {...form}
      />
      <DynamicInput title="Tags" {...form} />
      <Form.Item label="Publication on">
        {getFieldDecorator("publicationOn")(<Input />)}
      </Form.Item>
      <Form.Item label="Accepted year">
        {getFieldDecorator("acceptedYear", {
          rules: [
            {
              type: "number",
              message: "Input must be a number."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="PDF link">
        {getFieldDecorator("pdf", {
          rules: [
            {
              type: "url",
              message: "Input must be a link."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="DOI link">
        {getFieldDecorator("doiLink", {
          rules: [
            {
              type: "url",
              message: "Input must be a link."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Form.create()(ProjectForm);
