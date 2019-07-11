import React, { useState } from 'react';
import { Icon, Upload, Modal, Input, message } from 'antd';
import uuidV4 from 'uuid/v4';
import { uploadImg, removeImg } from '../../../apis/projects';

export default ({
  dataKey,
  getFieldDecorator,
  getFieldValue,
  setFieldsValue,
  isSingleImg = false,
  withCaption = false
}) => {
  const [previewStatus, setPreviewStatus] = useState({
    previewVisible: false,
    previewImage: ''
  });

  const customUpload = async ({ onError, onSuccess, file }) => {
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
  };

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCancel = () =>
    setPreviewStatus(pre => ({ ...pre, previewVisible: false }));

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewStatus({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Drag or Click to upload</div>
    </div>
  );

  /**
   *  type Data = {
   *    uuid: string;
   *    file: file elem from fileList;
   *    caption: string;
   *  }[];
   */
  getFieldDecorator(dataKey, { initialValue: [] });

  const handleImgUpload = file => {
    const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImg) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    return true;
  };

  const handleCaptionInput = uuid => e => {
    // Find uuid
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
    // set it's caption
    setFieldsValue({
      [dataKey]: newData
    });
  };

  const handleImgRemove = file => {
    const preData = getFieldValue(dataKey);
    const newData = preData.filter(elem => !(elem.file.uid === file.uid));

    setFieldsValue({
      [dataKey]: newData
    });

    // remove from server if it's on server.
    // * 討論後決定不刪除，由於可能被其他文章 reference, 不隨意刪除 DB 上的圖片資料較為保險
    // removeImg(file.name);
  };

  const getImgList = () => {
    const data = getFieldValue(dataKey);
    return data.reduce((acc, current) => [...acc, current.file], []);
  };

  return (
    <>
      <Upload
        name="files"
        listType="picture-card"
        defaultFileList={getImgList()}
        customRequest={customUpload}
        onPreview={handlePreview}
        onRemove={handleImgRemove}
        beforeUpload={handleImgUpload} // Use this hook due to onChange will trigger twice.
      >
        {isSingleImg &&
        getFieldValue(dataKey) &&
        getFieldValue(dataKey).length >= 1
          ? null
          : uploadButton}
      </Upload>
      {withCaption &&
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
