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
    label: 'Date',
    defaultValue: '',
    inputProps: {
      dataKey: 'date',
      validationRules: [
        {
          validator: (rule, value) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value),
          message:
            'Input must be format as YYYY-MM-DD.'
        },
        {
          required: true,
          message:
            'Please set the date of this news(YYYY-MM-DD).'
        }
      ]
    }
  },
];

export default {
  tabName: 'News',
  routePath: '/news',
  endpoint: '/news',
  iconType: 'alert',
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
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            options: { sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix() }
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