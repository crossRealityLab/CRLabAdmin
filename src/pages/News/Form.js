import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon, notification } from 'antd';
import styled from 'styled-components';
import uuidV4 from 'uuid/v4';

import { InputItem, TextArea, Field } from '../../components/Input';

import { dataBindingConfs, dataBindingKeys } from '../../configs/news';
import { create, get, update } from '../../apis/firebaseApis';

const LoadingIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 24;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 40px 0 0 40px;

  > * {
    margin: 0 5px;
  }
`;

const prepareUploadedData = data => {
  const result = {};

  dataBindingConfs.forEach(({ key, withLocalKey }) => {
    if (key === 'imgs') {
      result[key] = data[key].map(elem => ({
        name: elem.file.name,
        url: elem.file.url,
        caption: elem.caption
      }));
    } else if (key === 'avatar') {
      result[key] = data[key].map(elem => ({
        name: elem.file.name,
        url: elem.file.url
      }));
    } else if (withLocalKey) {
      result[key] = data[key].filter(elem => !!elem);
    } else {
      result[key] = data[key] ? data[key] : '';
    }
  });

  return result;
};

const uploadData = async (data, uuid = '') => {
  try {
    if (uuid) {
      data.uuid = uuid;
      data.timestamp = Date.now();
      await update('/news', uuid, data);
    } else {
      data.uuid = uuidV4();
      data.createdTimestamp = Date.now();
      data.timestamp = data.createdTimestamp;
      await create('/news', data.uuid, data);
    }
  } catch (e) {
    throw e;
  }
};

const MemberForm = ({ form, match, history }) => {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const createDataBinder = useCallback(() => {
    dataBindingConfs.forEach(elem => {
      if (elem.withLocalKey) {
        // Create ''only'' local key binder first when it's dynamic input, otherwise it will crash .
        getFieldDecorator(`${elem.key}-idx`);
      } else {
        getFieldDecorator(elem.key);
      }
    });
  }, [getFieldDecorator]);

  const setInitFormValue = useCallback(
    data => {
      const setPair = {};
      const delaySetPair = {}; // dynamic input data need to set ''after'' its component created.

      dataBindingConfs.forEach(({ key, withLocalKey, defaultValue }) => {
        if (key === 'imgs') {
          const value = data[key]
            ? data[key].map((imgInfo, idx) => ({
                file: {
                  uid: `img-${idx}`,
                  name: imgInfo.name,
                  status: 'done',
                  url: imgInfo.url
                },
                caption: imgInfo.caption
              }))
            : defaultValue;
          setPair[key] = value;
        } else if (key === 'avatar') {
          const value = data[key]
            ? [
                {
                  file: {
                    uid: 'avatar',
                    name: data.avatar[0].name,
                    status: 'done',
                    url: data.avatar[0].url
                  },
                  caption: ''
                }
              ]
            : defaultValue;
          setPair[key] = value;
        } else if (withLocalKey) {
          const idxValue = data[key]
            ? [...Array(data[key].length)].map((elem, idx) => idx)
            : [0];

          setPair[`${key}-idx`] = idxValue;
          delaySetPair[key] = data[key] ? data[key] : defaultValue;
        } else {
          setPair[key] = data[key] ? data[key] : defaultValue;
        }
      });

      setFieldsValue(setPair);
      setTimeout(() => setFieldsValue(delaySetPair), 0);
    },
    [setFieldsValue]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (err, data) => {
        if (!err) {
          console.log('Received values of form: ', data);
          try {
            const preparedData = prepareUploadedData(data);
            await uploadData(preparedData, match.params.uuid);

            notification.success({
              message: `Create/Edit ${data.title} complete!`,
              duration: 4
            });
            history.push(`/news/list`);
          } catch (e) {
            console.error(e);
            notification.error({
              message: `Create ${data.title} error!`,
              description: `${e}`,
              duration: 2
            });
          }
        } else {
          console.log('NEWS ON SUBMIT ERROR:', err);
        }
      });
    },
    [validateFields, match.params.uuid, history]
  );

  useEffect(() => {
    const fetchData = async uuid => {
      setIsLoading(true);
      // const data = await fakeAPI();
      const data = await get('/news', uuid);
      if (data) {
        setData(data);
        setInitFormValue(data);
      }
      setIsLoading(false);
    };

    createDataBinder();

    if (match.params.uuid) {
      fetchData(match.params.uuid);
    } else {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    setData,
    setInitFormValue,
    createDataBinder,
    match.params.uuid
  ]);

  if (isLoading) {
    return <Spin indicator={<LoadingIcon type="loading" spin />} />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      <Form.Item label="UUID">
        {data.uuid ? <strong>{data.uuid}</strong> : ''}
      </Form.Item>
      <InputItem label="Title">
        <Field
          dataKey={dataBindingKeys.title}
          validationRules={[
            {
              required: true,
              message:
                'Please set the title of this news.'
            }
          ]}
          {...form}
        />
      </InputItem>
      <InputItem label="Description">
        <TextArea
          dataKey={dataBindingKeys.description}
          {...form}
        />
      </InputItem>
      <InputItem label="Date">
        <Field
          dataKey={dataBindingKeys.date}
          validationRules={[
            {
              required: true,
              message:
                'Please set the date of this news(YYYY/MM/DD).'
            }
          ]}
          {...form}
        />
      </InputItem>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/news/list">
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default Form.create()(MemberForm);
