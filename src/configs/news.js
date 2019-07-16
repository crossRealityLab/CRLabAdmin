/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    key: 'title',
    defaultValue: ''
  },
  {
    key: 'date',
    defaultValue: '',
  },
  {
    key: 'description',
    defaultValue: ''
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
