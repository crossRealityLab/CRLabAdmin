/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    key: 'courseID',
    defaultValue: ''
  },
  {
    key: 'name',
    defaultValue: ''
  },
  {
    key: 'credits',
    defaultValue: ''
  },
  {
    key: 'location',
    defaultValue: '',
  },
  {
    key: 'tas',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'office',
    defaultValue: ''
  },
  {
    key: 'officeHours',
    defaultValue: [],
  },
  {
    key: 'descriptions',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'link',
    defaultValue: '',
  },
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
