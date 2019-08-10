import { InputType } from '../constants';
import Courses from '../pages/Courses';

export const basic = {
  name: 'Courses',
  path: '/courses',
  iconType: 'book',
  page: Courses,
};

/**
 * In order to work with antd Form data binding
 */
export const dataBindingConfs = [
  {
    type: InputType.FIELD,
    key: 'courseID',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'name',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'credits',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'email',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'termAndYear',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'location',
    defaultValue: '',
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'tas',
    defaultValue: [],
    defaultKeys: [0],
  },
  {
    type: InputType.FIELD,
    key: 'office',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'officeHours',
    defaultValue: '',
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'descriptions',
    defaultValue: [],
    defaultKeys: [0],
  },
  {
    type: InputType.FIELD,
    key: 'link',
    defaultValue: '',
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
