import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Divider, Tag, Button, Popconfirm, notification } from 'antd';

import useListData from '../../hooks/useListData';
import getFiltersFuncProps from '../../utils/getFiltersFuncProps';
import { remove } from '../../apis/firebaseApis';

export default () => {
  const { data, setData, isLoading, setIsLoading } = useListData('/projects');

  const onRemove = useCallback(
    async uuid => {
      setIsLoading(true);
      try {
        await remove('/projects', uuid);
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

  const renderTags = useCallback(
    tags =>
      tags && (
        <span>
          {tags.map(tag => (
            <Tag color="volcano" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </span>
      ),
    []
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
        <Link to={`/projects/${record.uuid}/edit`}>Edit</Link>
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
      <Link to="/projects/create">
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
          title="Title"
          dataIndex="title"
          key="title"
          {...getFiltersFuncProps('title')}
        />
        <Table.Column
          title="Year"
          dataIndex="year"
          key="year"
          sorter={(a, b) => parseInt(a.year) - parseInt(b.year)}
        />
        <Table.Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={renderTags}
        />
        <Table.Column
          title="Last edit"
          dataIndex="timestamp"
          key="timestamp"
          render={renderLastEditTime}
        />
        <Table.Column title="Action" key="action" render={renderAction} />
      </Table>
    </>
  );
};
