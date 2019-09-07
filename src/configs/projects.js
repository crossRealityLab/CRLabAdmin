import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';

import Form from '../pages/Form';
import List from '../pages/List';
import { InputType } from '../constants';
import getFiltersFuncProps from '../utils/getFiltersFuncProps';

const renderTags = tags =>
  tags && (
    <span>
      {tags.map(tag => (
        <Tag color="volcano" key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ))}
    </span>
  );

const renderLastEditTime = timestamp =>
  moment(timestamp)
    .local()
    .format('YYYY/MM/DD HH:mm:ss');

const formFields = [
  {
    inputType: InputType.FIELD,
    label: 'Show title',
    defaultValue: '',
    inputProps: {
      dataKey: 'showTitle',
      validationRules: [
        {
          required: true,
          message:
            'Please set the show title which will show on the enter image of this project.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Title',
    defaultValue: '',
    inputProps: {
      dataKey: 'title',
      validationRules: [
        {
          required: true,
          message: 'Please set the title of this project.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Year',
    defaultValue: '',
    inputProps: {
      dataKey: 'year',
      validationRules: [
        {
          validator: (rule, value) => !isNaN(value),
          message: 'The input must be a number.'
        },
        {
          required: true,
          message: 'Please set the starting year of this project.'
        }
      ]
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Authors',
    defaultValue: [],
    defaultKeys: [0],
    inputProps: {
      dataKey: 'authors',
      validationRules: [
        {
          required: true,
          message:
            'Please set at least one author of this project, and remove unuse feild.'
        }
      ]
    }
  },
  {
    inputType: InputType.IMG,
    label: 'Cover',
    defaultValue: [],
    inputProps: {
      dataKey: 'cover',
      title: 'Cover',
      isSingleImg: true,
      endpoint: '/projects'
    }
  },
  {
    inputType: InputType.IMGS_WITH_CAPTION,
    label: 'Images',
    defaultValue: [],
    inputProps: {
      dataKey: 'imgs',
      withCaption: true,
      endpoint: '/projects'
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Video links',
    defaultValue: [],
    defaultKeys: [],
    inputProps: {
      dataKey: 'videos',
      validationRules: [
        {
          type: 'url',
          message: 'Input must be a link.'
        }
      ]
    }
  },
  {
    inputType: InputType.TEXTAREA,
    label: 'Abstract',
    defaultValue: '',
    inputProps: {
      dataKey: 'abstract',
      validationRules: [
        {
          required: true,
          message: 'Please set the abstract of this project.'
        }
      ]
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Descriptions',
    defaultValue: [],
    defaultKeys: [0],
    inputProps: {
      dataKey: 'descriptions',
      validationRules: [
        {
          required: true,
          message:
            'Please set at least one description section of this project, and remove unuse feild.'
        }
      ],
      isTextArea: true
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Tags',
    defaultValue: [],
    defaultKeys: [],
    inputProps: {
      dataKey: 'tags'
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Publication on',
    defaultValue: '',
    inputProps: {
      dataKey: 'publicationOn'
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Accepted year',
    defaultValue: '',
    inputProps: {
      dataKey: 'acceptedYear',
      validationRules: [
        {
          validator: (rule, value) => value === undefined || !isNaN(value),
          message: 'Input must be a number.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'PDF link',
    defaultValue: '',
    inputProps: {
      dataKey: 'pdf',
      validationRules: [
        {
          type: 'url',
          message: 'Input must be a link.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'DOI link',
    defaultValue: '',
    inputProps: {
      dataKey: 'doi',
      validationRules: [
        {
          type: 'url',
          message: 'Input must be a link.'
        }
      ]
    }
  }
];

export default {
  tabName: 'Projects',
  routePath: '/projects',
  endpoint: '/projects',
  iconType: 'project',
  routes: [
    {
      path: '/list',
      routeOptions: {
        exact: true
      },
      component: List,
      props: {
        listColumns: [
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            options: { ...getFiltersFuncProps('title') }
          },
          {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            options: { sorter: (a, b) => parseInt(a.year) - parseInt(b.year) }
          },
          {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            options: {
              render: renderTags
            }
          },
          {
            title: 'Last edit',
            dataIndex: 'timestamp',
            key: 'timestamp',
            options: {
              render: renderLastEditTime
            }
          }
        ],
        withActionColumn: true
      }
    },
    {
      path: '/:uuid/edit',
      routeOptions: {},
      component: Form,
      props: {
        formFields,
        withUUID: true
      }
    },
    {
      path: '/create',
      routeOptions: {},
      component: Form,
      props: {
        formFields
      }
    }
  ]
};
