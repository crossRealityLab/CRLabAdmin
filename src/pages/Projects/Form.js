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

  const setInitFormValue = useCallback(
    data => {
      // ImageUploader's key and DyanmicInput keys need to be create and set first .
      getFieldDecorator(DATAKEYS.IMGS);
      getFieldDecorator(DATAKEYS.COVER);
      getFieldDecorator(DATAKEYS.AUTHORS_KEYS);
      getFieldDecorator(DATAKEYS.DESCRIPTIONS_KEYS);
      getFieldDecorator(DATAKEYS.VIDEOS_KEYS);
      getFieldDecorator(DATAKEYS.TAGS_KEYS);
      getFieldDecorator(DATAKEYS.SHOW_TITLE);
      getFieldDecorator(DATAKEYS.YEAR);
      getFieldDecorator(DATAKEYS.TITLE);
      getFieldDecorator(DATAKEYS.ABSTRACT);
      getFieldDecorator(DATAKEYS.ACCEPTED_YEAR);
      getFieldDecorator(DATAKEYS.DOI_LINK);
      getFieldDecorator(DATAKEYS.PDF_LINK);
      getFieldDecorator(DATAKEYS.PUBLICATIONON);

      setFieldsValue({
        [DATAKEYS.IMGS]: data.imgs
          ? data.imgs.map((imgInfo, idx) => ({
              uuid: imgInfo.uuid,
              file: {
                uid: `img-${idx}`,
                name: imgInfo.name,
                status: 'done',
                url: imgInfo.url
              },
              caption: imgInfo.caption
            }))
          : [],
        [DATAKEYS.COVER]: data.cover
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
          : [],
        // Dynamic keys need to be set first, too.
        [DATAKEYS.AUTHORS_KEYS]: data.authors
          ? [...Array(data.authors.length)].map((_elem, idx) => idx)
          : [0],
        [DATAKEYS.VIDEOS_KEYS]: data.videos
          ? [...Array(data.videos.length)].map((_elem, idx) => idx)
          : [0],
        [DATAKEYS.DESCRIPTIONS_KEYS]: data.descriptions
          ? [...Array(data.descriptions.length)].map((_elem, idx) => idx)
          : [0],
        [DATAKEYS.TAGS_KEYS]: data.tags
          ? [...Array(data.tags.length)].map((_elem, idx) => idx)
          : [0],
        [DATAKEYS.SHOW_TITLE]: data.showTitle,
        [DATAKEYS.YEAR]: data.year,
        [DATAKEYS.TITLE]: data.title,
        [DATAKEYS.ABSTRACT]: data.abstract,
        [DATAKEYS.ACCEPTED_YEAR]: data.acceptedYear,
        [DATAKEYS.DOI_LINK]: data.doi,
        [DATAKEYS.PUBLICATIONON]: data.publicationOn,
        [DATAKEYS.PDF_LINK]: data.pdf
      });

      // Set after component create.
      setTimeout(() => {
        setFieldsValue({
          [DATAKEYS.AUTHORS]: data.authors,
          [DATAKEYS.DESCRIPTIONS]: data.descriptions,
          [DATAKEYS.TAGS]: data.tags,
          [DATAKEYS.VIDEOS]: data.videos
        });
      }, 0);
    },
    [setFieldsValue, getFieldDecorator]
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
    [validateFields, match.params.uuid]
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
        <Input
          dataKey={DATAKEYS.SHOW_TITLE}
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
          dataKey={DATAKEYS.TITLE}
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
          dataKey={DATAKEYS.YEAR}
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
      </Form.Item>
      <Form.Item label="Cover">
        <ImgUploader
          title="Cover"
          dataKey={DATAKEYS.COVER}
          isSingleImg
          {...form}
        />
      </Form.Item>
      <Form.Item label="Images">
        <ImgUploader
          dataKey={DATAKEYS.IMGS}
          withCaption
          {...form}
        />
      </Form.Item>
      <Form.Item label="Videos">
        <DynamicInput
          dataKey={DATAKEYS.VIDEOS}
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
          dataKey={DATAKEYS.ABSTRACT}
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
      </Form.Item>
      <Form.Item label="Tags">
        <DynamicInput dataKey={DATAKEYS.TAGS} {...form} />
      </Form.Item>
      <Form.Item label="Publication on">
        <Input dataKey={DATAKEYS.PUBLICATIONON} {...form} />
      </Form.Item>
      <Form.Item label="Accepted year">
        <Input
          dataKey={DATAKEYS.ACCEPTED_YEAR}
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
          dataKey={DATAKEYS.PDF_LINK}
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
          dataKey={DATAKEYS.DOI_LINK}
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
