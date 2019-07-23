import { InputType } from '../constants';
/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    type: InputType.FIELD,
    key: 'fullName',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'title',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'email',
    defaultValue: '',
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'focusOn',
    defaultValue: [],
    defaultKeys: [],
  },
  {
    type: InputType.FIELD,
    key: 'website',
    defaultValue: ''
  },
  {
    type: InputType.IMG,
    key: 'avatar',
    defaultValue: [],
  },
  {
    type: InputType.FIELD,
    key: 'about',
    defaultValue: '',
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'publications',
    defaultValue: [],
    defaultKeys: [],
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'awards',
    defaultValue: [],
    defaultKeys: [],
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
