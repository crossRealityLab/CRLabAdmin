/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    key: 'showTitle',
    defaultValue: ''
  },
  {
    key: 'title',
    defaultValue: ''
  },
  {
    key: 'year',
    defaultValue: 0
  },
  {
    key: 'authors',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'abstract',
    defaultValue: ''
  },
  {
    key: 'cover',
    defaultValue: [],
  },
  {
    key: 'imgs',
    defaultValue: []
  },
  {
    key: 'videos',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'descriptions',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'tags',
    defaultValue: [],
    withLocalKey: true
  },
  {
    key: 'acceptedYear',
    defaultValue: 0
  },
  {
    key: 'publicationOn',
    defaultValue: ''
  },
  {
    key: 'pdf',
    defaultValue: ''
  },
  {
    key: 'doi',
    defaultValue: ''
  }
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
