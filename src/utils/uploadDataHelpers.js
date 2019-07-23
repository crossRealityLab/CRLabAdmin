import uuidV4 from 'uuid/v4';

import { InputType } from '../constants';
import { create, update } from '../apis/firebaseApis';

export const prepareData = (data, dataBindingConfs = []) => {
  const result = {};
  dataBindingConfs.forEach(({ type, key }) => {
    if (type === InputType.IMGS_WITH_CAPTION) {
      result[key] = data[key].map(elem => ({
        name: elem.file.name,
        url: elem.file.url,
        caption: elem.caption
      }));
    } else if (type === InputType.IMG) {
      result[key] = data[key].map(elem => ({
        name: elem.file.name,
        url: elem.file.url
      }));
    } else if (type === InputType.MULTI_FIELDS) {
      result[key] = data[key].filter(elem => !!elem);
    } else {
      result[key] = data[key] ? data[key] : '';
    }
  });

  return result;
};

export const uploadData = async (data, endpoint, uuid = '') => {
  try {
    if (uuid) {
      data.uuid = uuid;
      data.timestamp = Date.now();
      await update(endpoint, uuid, data);
    } else {
      data.uuid = uuidV4();
      data.createdTimestamp = Date.now();
      data.timestamp = data.createdTimestamp;
      await create(endpoint, data.uuid, data);
    }
  } catch (e) {
    throw e;
  }
};