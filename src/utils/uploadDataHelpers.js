import uuidV4 from 'uuid/v4';

import { InputType } from '../constants';
import { create, update } from '../apis/firebaseApis';

export const prepareData = (data, dataBindingConfs = []) => {
  const result = {};
  dataBindingConfs.forEach(({ inputType, inputProps: { dataKey } }) => {
    if (inputType === InputType.IMGS_WITH_CAPTION) {
      result[dataKey] = data[dataKey].map(elem => ({
        name: elem.file.name,
        url: elem.file.url,
        caption: elem.caption
      }));
    } else if (inputType === InputType.IMG) {
      result[dataKey] = data[dataKey].map(elem => ({
        name: elem.file.name,
        url: elem.file.url
      }));
    } else if (inputType === InputType.MULTI_FIELDS) {
      result[dataKey] = data[dataKey] ? data[dataKey].filter(elem => !!elem) : [];
    } else {
      result[dataKey] = data[dataKey] ? data[dataKey] : '';
    }
  });

  return result;
};

export const uploadData = async (data, endpoint, uuid = '') => {
  try {
    if (uuid) {
      data.uuid = uuid;
      data.timestamp = Date.now();
      await update(endpoint, data, uuid);
    } else {
      data.uuid = uuidV4();
      data.createdTimestamp = Date.now();
      data.timestamp = data.createdTimestamp;
      await create(endpoint, data.uuid, data);
    }
  } catch (e) {
    console.log('e:', e);
    throw e;
  }
};

export const uploadPlainData = async (data, endpoint) => {
  try {
    data.createdTimestamp = Date.now();
    data.timestamp = data.createdTimestamp;
    await update(endpoint, data);
  } catch (e) {
    throw e;
  }
};
