import { useEffect, useCallback } from 'react';

import { InputType } from '../constants';

export default ({ data, dataBindingConfs, getFieldDecorator, setFieldsValue }) => {

  const createDataBinder = useCallback(() => {
    dataBindingConfs.forEach(({ type, key }) => {
      if (type === InputType.MULTI_FIELDS) {
        // Create ''only'' local key binder first when it's dynamic input, otherwise it will crash .
        getFieldDecorator(`${key}-idx`);
      } else {
        getFieldDecorator(key);
      }
    });
  }, [dataBindingConfs, getFieldDecorator]);

  const setInitFormValue = useCallback(
    data => {
      const setPair = {};
      const delaySetPair = {}; // dynamic input data need to set ''after'' its component created.

      dataBindingConfs.forEach(({ key, type, defaultValue, defaultKeys }) => {
        if (type === InputType.IMGS_WITH_CAPTION) {
          const value = data[key]
            ? data[key].map((imgInfo, idx) => ({
                file: {
                  uid: `img-${idx}`,
                  name: imgInfo.name,
                  status: 'done',
                  url: imgInfo.url
                },
                caption: imgInfo.caption
              }))
            : defaultValue;
          setPair[key] = value;
        } else if (type === InputType.IMG) {
          const value = data[key]
            ? [
                {
                  file: {
                    uid: 'singleImg',
                    name: data[key][0].name,
                    status: 'done',
                    url: data[key][0].url
                  },
                  caption: ''
                }
              ]
            : defaultValue;
          setPair[key] = value;
        } else if (type === InputType.MULTI_FIELDS) {
          const idxValue = data[key]
            ? [...Array(data[key].length)].map((elem, idx) => idx)
            : defaultKeys;

          setPair[`${key}-idx`] = idxValue;
          delaySetPair[key] = data[key] ? data[key] : defaultValue;
        } else {
          setPair[key] = data[key] ? data[key] : defaultValue;
        }
      });

      setFieldsValue(setPair);
      setTimeout(() => setFieldsValue(delaySetPair), 0);
    },
    [dataBindingConfs, setFieldsValue]
  );

  useEffect(() => {
    createDataBinder();
  }, [createDataBinder]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setInitFormValue(data);
    }
  }, [data, setInitFormValue]);
};

