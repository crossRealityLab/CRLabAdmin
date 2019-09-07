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
    label: 'Course ID',
    defaultValue: '',
    inputProps: {
      dataKey: 'courseID',
      validationRules: [
        {
          required: true,
          message: 'Please set the course id of this course.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Name',
    defaultValue: '',
    inputProps: {
      dataKey: 'name',
      validationRules: [
        {
          required: true,
          message: 'Please set the name of this course.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Credits',
    defaultValue: '',
    inputProps: {
      dataKey: 'credits',
      validationRules: [
        {
          validator: (rule, value) => !isNaN(value),
          message: 'The input must be an number.'
        },
        {
          required: true,
          message: 'Please set the credits of this course.'
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
          message: 'Input must be email.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Term And Year',
    defaultValue: '',
    inputProps: {
      dataKey: 'termAndYear',
      validationRules: [
        {
          required: true,
          message:
            'Please set the term and year of this course. e.g. 2019 Fall, Monday 3pm – 5:50pm'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Location',
    defaultValue: '',
    inputProps: {
      dataKey: 'location',
      validationRules: [
        {
          required: true,
          message: 'Please set the location of this course.'
        }
      ]
    }
  },
  {
    inputType: InputType.MULTI_FIELDS_OF_FIELDS,
    label: 'TAs',
    defaultValue: [],
    defaultKeys: [0],
    inputProps: {
      dataKey: 'tas',
      fields: [
        {
          key: 'name',
          inputParams: {
            placeholder: "TA's name"
          },
          validationRules: [
            {
              required: true,
              message: "TA's name is required."
            }
          ]
        },
        {
          key: 'email',
          inputParams: {
            placeholder: "TA's email"
          },
          validationRules: [
            {
              required: true,
              message: "TA's email is required."
            },
            {
              type: 'email',
              message: 'Input must be email.'
            }
          ]
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Office',
    defaultValue: '',
    inputProps: {
      dataKey: 'office',
      validationRules: [
        {
          required: true,
          message: 'Please set the professor\'s office.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Office hours',
    defaultValue: '',
    inputProps: {
      dataKey: 'officeHours',
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Descriptions',
    defaultValue: [],
    defaultKeys: [0],
    inputProps: {
      dataKey: 'descriptions',
      isTextArea: true,
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Information link',
    defaultValue: '',
    inputProps: {
      dataKey: 'link',
      validationRules: [
        {
          required: true,
          message: 'Please set the link to the nctu course information page.'
        },
        {
          type: 'url',
          message: 'Input must be a link.'
        }
      ]
    }
  },
];

export default {
  tabName: 'Courses',
  routePath: '/courses',
  endpoint: '/courses',
  iconType: 'book',
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
            title: 'Course ID',
            dataIndex: 'courseID',
            key: 'courseID',
            options: { ...getFiltersFuncProps('courseID') }
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            options: { ...getFiltersFuncProps('name') }
          },
          {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            options: {}
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
