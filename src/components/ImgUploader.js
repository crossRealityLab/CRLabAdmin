import React, { useState, useCallback } from 'react';
import { Icon, Upload, Modal, Input, notification } from 'antd';
import uuidV4 from 'uuid/v4';
import { uploadImg } from '../apis/projects';

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div>Drag or Click to upload</div>
  </div>
);

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  isSingleImg = false,
  withCaption = false
}) => {
  /**
   *  type Data = {
   *    uuid: string;
   *    file: file elem from fileList;
   *    caption: string;
   *  }[];
   */
  getFieldDecorator(dataKey, { initialValue: [] });

  const [previewStatus, setPreviewStatus] = useState({
    previewVisible: false,
    previewImage: ''
  });

  const customUpload = useCallback(
    async ({ onError, onSuccess, file }) => {
      try {
        const fileName = file.name;
        // 拖曳後即上傳，即使沒有 submit 出去。
        const { image, imageURL } = await uploadImg(fileName, file);
        /**
         * Why ...file will miss file.name ???
         */
        const newEntry = {
          uuid: uuidV4(),
          file: {
            ...file,
            name: fileName,
            url: imageURL
          },
          caption: ''
        };

        const preData = getFieldValue(dataKey);

        setFieldsValue({
          [dataKey]: [...preData, newEntry]
        });

        onSuccess(null, image);
      } catch (e) {
        onError(e);
      }
    },
    [getFieldValue, setFieldsValue, dataKey]
  );

  const handleCancel = useCallback(
    () => setPreviewStatus(pre => ({ ...pre, previewVisible: false })),
    [setPreviewStatus]
  );

  const handlePreview = useCallback(
    async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewStatus({
        previewImage: file.url || file.preview,
        previewVisible: true
      });
    },
    [setPreviewStatus]
  );

  const handleImgUpload = useCallback(file => {
    const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImg) {
      notification.error({
        message: `You can only upload png or jpg file.`,
        duration: 2
      });
      return false;
    }
    return true;
  }, []);

  const handleCaptionInput = uuid => e => {
    const preData = getFieldValue(dataKey);
    const newData = preData.map(elem => {
      if (elem.uuid === uuid) {
        return {
          uuid,
          file: elem.file,
          caption: e.target.value
        };
      }
      return elem;
    });

    setFieldsValue({
      [dataKey]: newData
    });
  };

  /**
   * We dont remove image on DB, maybe it is referenced from others ...
   */
  const handleImgRemove = useCallback(
    file => {
      const preData = getFieldValue(dataKey);
      const newData = preData.filter(elem => !(elem.file.uid === file.uid));

      setFieldsValue({
        [dataKey]: newData
      });
    },
    [getFieldValue, setFieldsValue, dataKey]
  );

  const getImgList = useCallback(() => {
    const data = getFieldValue(dataKey);
    return data
      ? data.reduce((acc, current) => [...acc, current.file], [])
      : [];
  }, [getFieldValue, dataKey]);

  return (
    <>
      <Upload
        name="files"
        listType="picture-card"
        defaultFileList={getImgList()}
        customRequest={customUpload}
        onPreview={handlePreview}
        onRemove={handleImgRemove}
        beforeUpload={handleImgUpload}
      >
        {isSingleImg &&
        getFieldValue(dataKey) &&
        getFieldValue(dataKey).length >= 1
          ? null
          : uploadButton}
      </Upload>
      {withCaption &&
        getFieldValue(dataKey) &&
        getFieldValue(dataKey).map((elem, idx) => (
          <Input
            key={`${elem.file.name}-${idx}`}
            value={elem.caption}
            onChange={handleCaptionInput(elem.uuid)}
          />
        ))}
      <Modal
        visible={previewStatus.previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: '100%' }}
          src={previewStatus.previewImage}
        />
      </Modal>
    </>
  );
};
