import Form from '../pages/Form';
import { InputType } from '../constants';

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
          message: 'Please set the title.'
        }
      ]
    }
  },
  {
    inputType: InputType.FIELD,
    label: 'SubTitle',
    defaultValue: '',
    inputProps: {
      dataKey: 'subTitle',
    }
  },
  {
    inputType: InputType.MULTI_FIELDS,
    label: 'Visions',
    defaultValue: [],
    defaultKeys: [],
    inputProps: {
      dataKey: 'visions',
      limitedFieldNums: 3,
    }
  },
];

export default {
  tabName: 'Lab Introduction',
  routePath: '/labIntro',
  endpoint: '/labIntro',
  iconType: 'crown',
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
