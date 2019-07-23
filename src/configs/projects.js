import { InputType } from '../constants';

/**
 * In order to work with antd Form data binding
 */

export const dataBindingConfs = [
  {
    type: InputType.FIELD,
    key: 'showTitle',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'title',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'year',
    defaultValue: ''
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'authors',
    defaultValue: [],
    defaultKeys: [0],
  },
  {
    type: InputType.FIELD,
    key: 'abstract',
    defaultValue: ''
  },
  {
    type: InputType.IMG,
    key: 'cover',
    defaultValue: []
  },
  {
    type: InputType.IMGS_WITH_CAPTION,
    key: 'imgs',
    defaultValue: []
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'videos',
    defaultValue: [],
    defaultKeys: [],
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'descriptions',
    defaultValue: [],
    defaultKeys: [0],
  },
  {
    type: InputType.MULTI_FIELDS,
    key: 'tags',
    defaultValue: [],
    defaultKeys: [],
  },
  {
    type: InputType.FIELD,
    key: 'acceptedYear',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'publicationOn',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'pdf',
    defaultValue: ''
  },
  {
    type: InputType.FIELD,
    key: 'doi',
    defaultValue: ''
  }
];

export const dataBindingKeys = dataBindingConfs.reduce(
  (acc, current) => ({ ...acc, [current.key]: current.key }),
  {}
);
