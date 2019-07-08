import React, { useState } from "react";
import { Form, Icon, Upload, Modal } from "antd";

export default ({
  title,
  getFieldDecorator,
  getFieldValue,
  isSingleImg = false
}) => {
  const [previewStatus, setPreviewStatus] = useState({
    previewVisible: false,
    previewImage: ""
  });

  /**
   * To prevent realtime upload image to server
   * ref: https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
   */
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
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

  const normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form.Item label={title}>
      {getFieldDecorator(title, {
        valuePropName: "fileList",
        getValueFromEvent: normFile
      })(
        <Upload
          name="files"
          listType="picture-card"
          customRequest={dummyRequest}
          onPreview={handlePreview}
        >
          {isSingleImg &&
          getFieldValue(title) &&
          getFieldValue(title).length >= 1
            ? null
            : uploadButton}
        </Upload>
      )}
      <Modal
        visible={previewStatus.previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={previewStatus.previewImage}
        />
      </Modal>
    </Form.Item>
  );
};