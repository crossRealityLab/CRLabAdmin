import React, { useCallback } from 'react';
import moment from 'moment';
import { Table, Divider, Tag } from 'antd';

import { getMockProjects } from '../../mockdata';

const data = getMockProjects(20);

export default () => {
  const renderTags = useCallback(
    tags => (
      <span>
        {tags.map(tag => {
          let color = 'green';
          if (tag === 'CHI') {
            color = 'volcano';
          } else if (tag === 'UIST') {
            color = 'geekblue';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
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
        <a href="javascript:;">Edit</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
    []
  );

  return (
    <Table dataSource={data}>
      <Table.Column title="Title" dataIndex="title" key="title" />
      <Table.Column
        title="Year"
        dataIndex="year"
        key="year"
        sorter={(a, b) => a.year - b.year}
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
  );
};
