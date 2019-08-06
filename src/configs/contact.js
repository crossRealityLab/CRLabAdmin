import { InputType } from '../constants';
import Contact from '../pages/Contact';

export const basic = {
  name: 'Contact',
  path: '/contact',
  iconType: 'contacts',
  page: Contact,
};

/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    type: InputType.FIELD,
    key: 'name',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'email',
    defaultValue: '',
  },
  {
    type: InputType.FIELD,
    key: 'office',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'officeHours',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'lab',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'description',
    defaultValue: ''
  },
  {
    type: InputType.IMG,
    key: 'banner',
    defaultValue: [],
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
