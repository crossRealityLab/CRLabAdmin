import Form from '../pages/Form';
import { InputType } from '../constants';

const formFields = [
  {
    inputType: InputType.FIELD,
    label: 'Name',
    defaultValue: '',
    inputProps: {
      dataKey: 'name',
      validationRules: [
        {
          required: true,
          message: 'Please set the name.'
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
          message: 'Please set the email.'
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
          message: 'Please set the office.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Office hours',
    defaultValue: '',
    inputProps: {
      dataKey: 'officeHours'
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'Lab',
    defaultValue: '',
    inputProps: {
      dataKey: 'lab',
      validationRules: [
        {
          required: true,
          message: 'Please set the lab location.'
        }
      ]
    }
  },
  {
    inputType: InputType.TEXTAREA,
    label: 'Description',
    defaultValue: '',
    inputProps: {
      dataKey: 'description'
    }
  },
  {
    inputType: InputType.IMG,
    label: 'banner',
    defaultValue: [],
    inputProps: {
      dataKey: 'banner',
      isSingleImg: true,
      endpoint: '/contact'
    }
  }
];

export default {
  tabName: 'Contact',
  routePath: '/contact',
  endpoint: '/contact',
  iconType: 'contacts',
  routes: [
    {
      path: '/',
      routeOptions: {},
      component: Form,
      props: {
        formFields,
      }
    }
  ]
};
