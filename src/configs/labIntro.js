import { InputType } from '../constants';
import LabIntro from '../pages/LabIntro';

export const basic = {
  name: 'Lab Introduction',
  path: '/labIntro',
  iconType: 'crown',
  page: LabIntro,
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
    key: 'subTitle',
    defaultValue: '',
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'visions',
    defaultValue: [],
    defaultKeys: [],
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
