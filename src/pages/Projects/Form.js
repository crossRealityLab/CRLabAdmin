import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Spin, Icon } from 'antd';
import styled from 'styled-components';
import _ from 'loadsh';
import uuidV4 from 'uuid/v4';

import DynamicInput from './components/DynamicInput';
import ImgUploader from './components/ImgUploader';
import { create, get, update } from '../../apis/projects';

import { getMockProjects } from '../../mockdata';

const LoadingIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 24;
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

const fakeAPI = () => {
  const mockdata = getMockProjects(2)[1];
  return new Promise(resolve => {
    setTimeout(() => resolve(mockdata), 2000);
  });
};

const uploadData = (data, uuid = '') => {
  const result = _.omit(data, [
    DATAKEYS.AUTHORS_KEYS,
    DATAKEYS.VIDEOS_KEYS,
    DATAKEYS.DESCRIPTIONS_KEYS,
    DATAKEYS.TAGS_KEYS,
    // FOR TEST
    DATAKEYS.IMGS,
    DATAKEYS.COVER
  ]);

  if (uuid) {
    result.uuid = uuid;
    result.timestamp = Date.now();
    return update(uuid, result);
  }

  result.uuid = uuidV4();
  result.createdTimestamp = Date.now();
  create(result.uuid, result);
};

const ProjectForm = ({ form, match }) => {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const setInitFormValue = useCallback(
    data => {
      // ImageUploader's key and DyanmicInput keys need to be create and set first .
      getFieldDecorator(DATAKEYS.IMGS);
      getFieldDecorator(DATAKEYS.COVER);
      getFieldDecorator(DATAKEYS.AUTHORS_KEYS);
      getFieldDecorator(DATAKEYS.DESCRIPTIONS_KEYS);
      getFieldDecorator(DATAKEYS.VIDEOS_KEYS);
      getFieldDecorator(DATAKEYS.TAGS_KEYS);

      setFieldsValue({
        [DATAKEYS.IMGS]: data.imgs ? data.imgs.map((imgInfo, idx) => ({
          uuid: imgInfo.uuid,
          file: {
            uid: `img-${idx}`,
            name: `img-${idx}.png`,
            status: 'done',
            url: imgInfo.url
          },
          caption: imgInfo.caption
        })) : [],
        [DATAKEYS.COVER]: data.cover ? [
          {
            file: {
              uid: 'cover',
              name: 'cover.png',
              status: 'done',
              url: data.cover
            },
            caption: ''
          }
        ]: [],
        // Dynamic keys need to be set first, too.
        [DATAKEYS.AUTHORS_KEYS]: [...Array(data.authors.length)].map(
          (_elem, idx) => idx
        ),
        [DATAKEYS.VIDEOS_KEYS]: [...Array(data.videos.length)].map(
          (_elem, idx) => idx
        ),
        [DATAKEYS.DESCRIPTIONS_KEYS]: [...Array(data.descriptions.length)].map(
          (_elem, idx) => idx
        ),
        [DATAKEYS.TAGS_KEYS]: [...Array(data.tags.length)].map(
          (_elem, idx) => idx
        )
      });

      // Set after component create.
      setTimeout(() => {
        setFieldsValue({
          [DATAKEYS.SHOW_TITLE]: data.showTitle,
          [DATAKEYS.YEAR]: data.year,
          [DATAKEYS.TITLE]: data.title,
          [DATAKEYS.ABSTRACT]: data.abstract,
          [DATAKEYS.ACCEPTED_YEAR]: data.acceptedYear,
          [DATAKEYS.DOI_LINK]: data.doi,
          [DATAKEYS.PUBLICATIONON]: data.publicationOn,
          [DATAKEYS.PDF_LINK]: data.pdf,
          [DATAKEYS.AUTHORS]: data.authors,
          [DATAKEYS.DESCRIPTIONS]: data.descriptions,
          [DATAKEYS.TAGS]: data.tags,
          [DATAKEYS.VIDEOS]: data.videos,
        });
      }, 0);
    },
    [setFieldsValue, getFieldDecorator]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      validateFields((err, data) => {
        if (!err) {
          console.log('Received values of form: ', data);
          uploadData(data, match.params.uuid);
        } else console.log('PROJECT ON SUBMIT ERROR:', err);
      });
    },
    [validateFields, match.params.uuid]
  );

  useEffect(() => {
    const fetchData = async uuid => {
      setIsLoading(true);
      // const data = await fakeAPI();
      const data = await get(uuid);
      if (data) {
        setData(data);
        console.log(data);
        setInitFormValue(data);
      }
      setIsLoading(false);
    };

    if (match.params.uuid) {
      fetchData(match.params.uuid);
    } else {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    setData,
    setInitFormValue,
    getFieldDecorator,
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
        {getFieldDecorator(DATAKEYS.SHOW_TITLE, {
          rules: [
            {
              required: true,
              message:
                'Please set the show title which will show on the enter image of this project.'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Title">
        {getFieldDecorator(DATAKEYS.TITLE, {
          rules: [
            {
              required: true,
              message: 'Please set the title of this project.'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Year">
        {getFieldDecorator(DATAKEYS.YEAR, {
          rules: [
            {
              validator: (_rule, value) => !isNaN(value),
              message: 'The input must be a number.'
            },
            {
              required: true,
              message: 'Please set the starting year of this project.'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <DynamicInput
        title="Authors"
        dataKey={DATAKEYS.AUTHORS}
        validationRules={[
          {
            required: true,
            message:
              'Please set at least one author of this project, and remove unuse feild.'
          }
        ]}
        {...form}
      />
      <ImgUploader
        title="Cover"
        dataKey={DATAKEYS.COVER}
        isSingleImg
        {...form}
      />
      <ImgUploader title="Imgs" dataKey={DATAKEYS.IMGS} withCaption {...form} />
      <DynamicInput
        title="Videos"
        dataKey={DATAKEYS.VIDEOS}
        validationRules={[
          {
            type: 'url',
            message: 'Input must be a link.'
          }
        ]}
        {...form}
      />
      <Form.Item label="Abstract">
        {getFieldDecorator(DATAKEYS.ABSTRACT, {
          rules: [
            {
              required: true,
              message: 'Please set the abstract of this project.'
            }
          ]
        })(<Input.TextArea autosize />)}
      </Form.Item>
      <DynamicInput
        title="Descriptions"
        dataKey={DATAKEYS.DESCRIPTIONS}
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
      <DynamicInput title="Tags" dataKey={DATAKEYS.TAGS} {...form} />
      <Form.Item label="Publication on">
        {getFieldDecorator(DATAKEYS.PUBLICATIONON, {
          initialValue: ''
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Accepted year">
        {getFieldDecorator(DATAKEYS.ACCEPTED_YEAR, {
          initialValue: '',
          rules: [
            {
              validator: (_rule, value) => !isNaN(value),
              message: 'Input must be a number.'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="PDF link">
        {getFieldDecorator(DATAKEYS.PDF_LINK, {
          initialValue: '',
          rules: [
            {
              type: 'url',
              message: 'Input must be a link.'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="DOI link">
        {getFieldDecorator(DATAKEYS.DOI_LINK, {
          initialValue: '',
          rules: [
            {
              type: 'url',
              message: 'Input must be a link.'
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
