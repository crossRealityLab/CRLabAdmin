import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Spin, Icon } from 'antd';

import DynamicInput from './components/DynamicInput';
import ImgUploader from './components/ImgUploader';

import { getMockProjects } from '../../mockdata';

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
  const mockdata = getMockProjects(1)[0];
  return new Promise(resolve => {
    setTimeout(() => resolve(mockdata), 2000);
  });
};

const ProjectForm = ({ form, match }) => {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const setInitFormValue = useCallback(
    data => {
      // Set key first, delay calling after feild key created .

      setFieldsValue({
        imgs: data.imgs.map((imgInfo, idx) => ({
          uuid: imgInfo.uuid,
          file: {
            uid: `img-${idx}`,
            name: `img-${idx}.png`,
            status: 'done',
            url: imgInfo.url
          },
          caption: imgInfo.caption
        })),
        cover: [
          {
            file: {
              uid: 'cover',
              name: 'cover.png',
              status: 'done',
              url: data.cover
            },
            caption: ''
          }
        ],
      });

      setTimeout(() => {
        setFieldsValue({
          'videos-keys': [...Array(data.videos.length)].map(
            (_elem, idx) => idx
          ),
          'authors-keys': [...Array(data.authors.length)].map(
            (_elem, idx) => idx
          ),
          'descriptions-keys': [...Array(data.descriptions.length)].map(
            (_elem, idx) => idx
          ),
          'tags-keys': [...Array(data.tags.length)].map((_elem, idx) => idx),
        });
      }, 0);

      setTimeout(() => {
        setFieldsValue({
          [DATAKEYS.SHOW_TITLE]: data.showTitle,
          [DATAKEYS.YEAR]: data.year,
          [DATAKEYS.TITLE]: data.title,
          [DATAKEYS.AUTHORS]: data.authors,
          [DATAKEYS.ABSTRACT]: data.abstract,
          [DATAKEYS.DESCRIPTIONS]: data.descriptions,
          [DATAKEYS.TAGS]: data.tags,
          [DATAKEYS.ACCEPTED_YEAR]: data.acceptedYear,
          [DATAKEYS.DOI_LINK]: data.doi,
          [DATAKEYS.PUBLICATIONON]: data.publicationOn,
          [DATAKEYS.PDF_LINK]: data.pdf,
          videos: data.videos.map(elem => elem.url)
        })
      }, 0);
    },
    [setFieldsValue]
  );

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fakeAPI();
      setData(data);
      setInitFormValue(data);
      setIsLoading(false);
    };

    const initBindingData = () => {
      getFieldDecorator(DATAKEYS.IMGS);
      getFieldDecorator(DATAKEYS.COVER);
    };

    initBindingData();

    if (match.params.pid) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    setData,
    setInitFormValue,
    getFieldDecorator,
    match.params.pid
  ]);

  if (isLoading) {
    return (
      <Spin
        indicator={
          <Icon
            type="loading"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              fontSize: 24
            }}
            spin
          />
        }
      />
    );
  }

  return (
    <Form
      onSubmit={handleSubmit}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      <Form.Item label="PID">
        {data.pid ? <strong>{data.pid}</strong> : ''}
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
      <ImgUploader
        title="Imgs"
        dataKey={DATAKEYS.IMGS} 
        withCaption
        {...form}
      />
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
        {getFieldDecorator(DATAKEYS.PUBLICATIONON)(<Input />)}
      </Form.Item>
      <Form.Item label="Accepted year">
        {getFieldDecorator(DATAKEYS.ACCEPTED_YEAR, {
          rules: [
            {
              type: 'number',
              message: 'Input must be a number.'
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="PDF link">
        {getFieldDecorator(DATAKEYS.PDF_LINK, {
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
