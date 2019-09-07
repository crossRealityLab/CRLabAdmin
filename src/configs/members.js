import moment from 'moment';

import Form from '../pages/Form';
import List from '../pages/List';
import { InputType } from '../constants';
import getFiltersFuncProps from '../utils/getFiltersFuncProps';

const renderLastEditTime = timestamp =>
  moment(timestamp)
    .local()
    .format('YYYY/MM/DD HH:mm:ss');

const formFields = [
  {
    inputType: InputType.FIELD,
    label: 'Full name',
    defaultValue: '',
    inputProps: {
      dataKey: 'fullName',
      validationRules: [
        {
          required: true,
          message: 'Please set the full name of this memeber.'
        }
      ]
    }
  },
  {
    inputType: InputType.IMG,
    label: 'Avatar',
    defaultValue: '',
    inputProps: {
      dataKey: 'avatar',
      isSingleImg: true,
      endpoint: "/members",
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
          message:
            'Please set the title of this member(e.g. professor, PhD, Master).'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Email',
    defaultValue: '',
    inputProps: {
      dataKey: 'email',
      validationRules: [
        {
          type: 'email',
          message: 'The input must be an email.'
        },
        {
          required: true,
          message: 'Please set the email of this member.'
        }
      ]
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Focus on',
    defaultValue: [],
    defaultKeys: [],
    inputProps: {
      dataKey: 'focusOn',
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Personal website',
    defaultValue: '',
    inputProps: {
      dataKey: 'website',
      validationRules: [
        {
          type: 'url',
          message: 'The input must be an url.'
        }
      ]
    }
  },
  {
    inputType: InputType.TEXTAREA,
    label: 'About',
    defaultValue: '',
    inputProps: {
      dataKey: 'about',
      isTextArea: true,
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Graduate year',
    defaultValue: '',
    inputProps: {
      dataKey: 'graduateYear',
      validationRules: [
        {
          validator: (rule, value) => !isNaN(value),
          message:
            'Input must be a number'
        }
      ]
    }
  },
  {
    inputType: InputType.MULTI_FIELDS_OF_FIELDS,
    label: 'Publications',
    defaultValue: [],
    defaultKeys: [],
    inputProps: {
      dataKey: 'publications',
      fields: [
        {
          key: 'title',
          inputParams: {
            placeholder: 'title'
          },
          validationRules: [
            {
              required: true,
              message: "Publication's title is required."
            }
          ]
        },
        {
          key: 'conference',
          inputParams: {
            placeholder: 'conference'
          }
        },
        {
          key: 'year',
          inputParams: {
            placeholder: 'year'
          },
          validationRules: [
            {
              validator: (rule, value) => !isNaN(value),
              message: 'Input must be a number.'
            }
          ]
        },
        {
          key: 'link',
          inputParams: {
            placeholder: 'link'
          },
          validationRules: [
            {
              type: 'url',
              message: 'Input must be an url.'
            }
          ]
        }
      ]
    }
  },
  {
    inputType: InputType.MULTI_FIELDS_OF_FIELDS,
    label: 'Awards',
    defaultValue: [],
    defaultKeys: [],
    inputProps: {
      dataKey: 'awards',
      fields: [
        {
          key: 'title',
          inputParams: {
            placeholder: 'title'
          }
        },
        {
          key: 'year',
          inputParams: {
            placeholder: 'year'
          }
        }
      ]
    }
  },
];

export default {
  tabName: 'Members',
  routePath: '/members',
  endpoint: '/members',
  iconType: 'user',

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
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            options: { ...getFiltersFuncProps('fullName') }
          },
          {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            options: { ...getFiltersFuncProps('title') }
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






