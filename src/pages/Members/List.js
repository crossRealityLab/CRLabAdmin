import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Divider, Button, Popconfirm, notification } from 'antd';

import useListData from '../../hooks/useListData';
import getFiltersFuncProps from '../../utils/getFiltersFuncProps';
import { remove } from '../../apis/firebaseApis';

export default () => {
  const { data, setData, isLoading, setIsLoading } = useListData('/members');

  const onRemove = useCallback(
    async uuid => {
      setIsLoading(true);
      try {
        await remove('/members', uuid);
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
    [setIsLoading, setData]
  );

  const renderLastEditTime = useCallback(
    timestamp =>
      moment(timestamp)
        .local()
        .format('YYYY/MM/DD HH:mm:ss'),
    []
  );

  const renderAction = useCallback(
    (text, record) => (
      <span>
        <Link to={`/members/${record.uuid}/edit`}>Edit</Link>
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
    [onRemove]
  );

  return (
    <>
      <Link to="/members/create">
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
        <Table.Column
          title="Name"
          dataIndex="fullName"
          key="fullName"
          {...getFiltersFuncProps('fullName')}
        />
        <Table.Column
          title="Title"
          dataIndex="title"
          key="title"
          {...getFiltersFuncProps('title')}
        />
        <Table.Column
          title="Last edit"
          dataIndex="timestamp"
          key="timestamp"
          render={renderLastEditTime}
          sorter={(a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)}
        />
        <Table.Column title="Action" key="action" render={renderAction} />
      </Table>
    </>
  );
};
