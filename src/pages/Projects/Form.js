import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spin, Icon, notification } from 'antd';
import styled from 'styled-components';
import _ from 'loadsh';
import uuidV4 from 'uuid/v4';

import DynamicInput from './components/DynamicInput';
import ImgUploader from './components/ImgUploader';
import Input from './components/Input';
import TextArea from './components/TextArea';

import { dataBindingConfs, dataBindingKeys } from '../../configs/projects';
import { create, get, update } from '../../apis/projects';

import { getMockProjects } from '../../mockdata';

const fakeAPI = () => {
  const mockdata = getMockProjects(2)[1];
  return new Promise(resolve => {
    setTimeout(() => resolve(mockdata), 2000);
  });
};

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

// Local data spec.
const DATAKEYS = {
  SHOW_TITLE: 'showTitle',
  TITLE: 'title',
  YEAR: 'year',
  AUTHORS: 'authors',
  AUTHORS_KEYS: 'authors-keys',
  ABSTRACT: 'abstract',
  COVER: 'cover',
  IMGS: 'imgs',
  VIDEOS: 'videos',
  VIDEOS_KEYS: 'videos-keys',
  DESCRIPTIONS: 'descriptions',
  DESCRIPTIONS_KEYS: 'descriptions-keys',
  TAGS: 'tags',
  TAGS_KEYS: 'tags-keys',
  PUBLICATIONON: 'publicationOn',
  ACCEPTED_YEAR: 'acceptedYear',
  PDF_LINK: 'pdf',
  DOI_LINK: 'doi'
};

const uploadData = async (data, uuid = '') => {
  const result = _.omit(data, [
    DATAKEYS.AUTHORS_KEYS,
    DATAKEYS.VIDEOS_KEYS,
    DATAKEYS.DESCRIPTIONS_KEYS,
    DATAKEYS.TAGS_KEYS,
    DATAKEYS.AUTHORS,
    DATAKEYS.VIDEOS,
    DATAKEYS.DESCRIPTIONS,
    DATAKEYS.TAGS,
    DATAKEYS.IMGS,
    DATAKEYS.COVER
  ]);

  result.imgs = data[DATAKEYS.IMGS].map(elem => ({
    name: elem.file.name,
    url: elem.file.url,
    caption: elem.caption
  }));

  result.cover = data[DATAKEYS.COVER].map(elem => ({
    name: elem.file.name,
    url: elem.file.url
  }));

  result[DATAKEYS.AUTHORS] = data[DATAKEYS.AUTHORS].filter(elem => !!elem);
  result[DATAKEYS.VIDEOS] = data[DATAKEYS.VIDEOS].filter(elem => !!elem);
  result[DATAKEYS.DESCRIPTIONS] = data[DATAKEYS.DESCRIPTIONS].filter(
    elem => !!elem
  );
  result[DATAKEYS.TAGS] = data[DATAKEYS.TAGS].filter(elem => !!elem);

  try {
    if (uuid) {
      result.uuid = uuid;
      result.timestamp = Date.now();
      await update(uuid, result);
    } else {
      result.uuid = uuidV4();
      result.createdTimestamp = Date.now();
      result.timestamp = result.createdTimestamp;
      await create(result.uuid, result);
    }
  } catch (e) {
    throw e;
  }
};

const ProjectForm = ({ form, match, history }) => {
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
                uuid: imgInfo.uuid,
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
        } else if (key === 'cover') {
          const value = data[key]
            ? [
                {
                  file: {
                    uid: 'cover',
                    name: data.cover[0].name,
                    status: 'done',
                    url: data.cover[0].url
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
            await uploadData(data, match.params.uuid);
            notification.success({
              message: `Create/Edit ${data.title} complete!`,
              duration: 4
            });
            history.push(`/0/list`);
          } catch (e) {
            notification.error({
              message: `Create ${data.title} error!`,
              duration: 2
            });
          }
        }
        console.log('PROJECT ON SUBMIT ERROR:', err);
      });
    },
    [validateFields, match.params.uuid, history]
  );

  useEffect(() => {
    const fetchData = async uuid => {
      setIsLoading(true);
      const data = await fakeAPI();
      // const data = await get(uuid);
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
      <Form.Item label="Show title">
        <Input
          dataKey={dataBindingKeys.showTitle}
          validationRules={[
            {
              required: true,
              message:
                'Please set the show title which will show on the enter image of this project.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Title">
        <Input
          dataKey={dataBindingKeys.title}
          validationRules={[
            {
              required: true,
              message: 'Please set the title of this project.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Year">
        <Input
          dataKey={dataBindingKeys.year}
          validationRules={[
            {
              validator: (_rule, value) => !isNaN(value),
              message: 'The input must be a number.'
            },
            {
              required: true,
              message: 'Please set the starting year of this project.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Authors">
        <DynamicInput
          dataKey={dataBindingKeys.authors}
          validationRules={[
            {
              required: true,
              message:
                'Please set at least one author of this project, and remove unuse feild.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Cover">
        <ImgUploader
          title="Cover"
          dataKey={dataBindingKeys.cover}
          isSingleImg
          {...form}
        />
      </Form.Item>
      <Form.Item label="Images">
        <ImgUploader dataKey={dataBindingKeys.imgs} withCaption {...form} />
      </Form.Item>
      <Form.Item label="Video links">
        <DynamicInput
          dataKey={dataBindingKeys.videos}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Abstract">
        <TextArea
          dataKey={dataBindingKeys.abstract}
          validationRules={[
            {
              required: true,
              message: 'Please set the abstract of this project.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="Descriptions">
        <DynamicInput
          dataKey={dataBindingKeys.descriptions}
          validationRules={[
            {
              required: true,
              message:
                'Please set at least one description section of this project, and remove unuse feild.'
            }
          ]}
          isTextArea
          {...form}
        />
      </Form.Item>
      <Form.Item label="Tags">
        <DynamicInput dataKey={dataBindingKeys.tags} {...form} />
      </Form.Item>
      <Form.Item label="Publication on">
        <Input dataKey={dataBindingKeys.publicationOn} {...form} />
      </Form.Item>
      <Form.Item label="Accepted year">
        <Input
          dataKey={dataBindingKeys.acceptedYear}
          validationRules={[
            {
              validator: (_rule, value) => !isNaN(value),
              message: 'Input must be a number.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="PDF link">
        <Input
          dataKey={dataBindingKeys.pdf}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <Form.Item label="DOI link">
        <Input
          dataKey={dataBindingKeys.doi}
          validationRules={[
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]}
          {...form}
        />
      </Form.Item>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/0/list">
          <Button type="danger">Back</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

export default Form.create()(ProjectForm);
