import { InputType } from '../constants';
import News from '../pages/News';

export const basic = {
  name: 'News',
  path: '/news',
  iconType: 'alert',
  page: News,
};

/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    type: InputType.FIELD,
    key: 'title',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'date',
    defaultValue: '',
  },
  {
    type: InputType.FIELD,
    key: 'description',
    defaultValue: ''
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
