import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Popconfirm, notification } from 'antd';

import useListData from '../hooks/useListData';
import { remove } from '../apis/firebaseApis';

export default ({
  listColumns, 
  withActionColumn,
  endpoint,
  routePath
}) => {
  const { data, setData, isLoading, setIsLoading } = useListData(endpoint);

  const onRemove = useCallback(
    async uuid => {
      setIsLoading(true);
      try {
        await remove(endpoint, uuid);
        setData(preList => preList.filter(elem => elem.uuid !== uuid));
        notification.success({
          message: `Remove Complete!`,
          duration: 4
        });
      } catch (e) {
        notification.error({
          message: `Remove Error!`,
          description: `${e}`,
          duration: 4
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setData, endpoint]
  );

  const renderAction = useCallback(
    (text, record) => (
      <span>
        <Link to={`${routePath}/${record.uuid}/edit`}>Edit</Link>
        <Divider type="vertical" />
        <Popconfirm
          title="Are you sure to delete ?"
          onConfirm={() => onRemove(record.uuid)}
          okText="Yes"
          cancelText="No"
        >
          <a href="javascript:;">Delete</a>
        </Popconfirm>
      </span>
    ),
    [onRemove, routePath]
  );

  return (
    <>
      <Link to={`${routePath}/create`}>
        <Button
          type="primary"
          style={{
            marginLeft: '15px',
            marginBottom: '15px'
          }}
        >
          Create
        </Button>
      </Link>
      <Table
        dataSource={data}
        loading={isLoading}
        rowKey={record => record.uuid}
      >
        {listColumns.map(({ title, dataIndex, key, options }) => (
          <Table.Column
            key={key}
            title={title}
            dataIndex={dataIndex}
            {...options}
          />
        ))}
        {withActionColumn && (
          <Table.Column title="Action" key="action" render={renderAction} />
        )}
      </Table>
    </>
  );
};
