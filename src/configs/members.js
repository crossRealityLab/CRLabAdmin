/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    key: 'fullName',
    defaultValue: ''
  },
  {
    key: 'title',
    defaultValue: ''
  },
  {
    key: 'email',
    defaultValue: '',
  },
  {
    key: 'focusOn',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'website',
    defaultValue: ''
  },
  {
    key: 'avatar',
    defaultValue: [],
  },
  {
    key: 'about',
    defaultValue: '',
  },
  {
    key: 'publications',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'awards',
    defaultValue: [],
    withLocalKey: true
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
