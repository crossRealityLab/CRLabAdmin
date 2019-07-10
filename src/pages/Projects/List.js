import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Divider, Tag } from 'antd';
import _ from 'lodash';

import { getAll, remove } from '../../apis/projects';
import { getMockProjects } from '../../mockdata';

const data = getMockProjects(20);

export default () => {

  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAll();
      // console.log(_.values(data))
      setList(_.values(data));
    };

    fetchData();
  }, []);

  const onRemove = async uuid => {
    console.log(remove);
    try {
      await remove(uuid);
      setList(preList => preList.filter(elem => elem.uuid !== uuid));
    } catch (e) {

    }
  };

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
        <Link to={`/0/${record.uuid}/edit`}>Edit</Link>
        <Divider type="vertical" />
        <div onClick={() => onRemove(record.uuid)}>Delete</div>
      </span>
    ),
    []
  );

  return (
    <Table dataSource={list}>
      <Table.Column title="Title" dataIndex="title" key="title" />
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
  );
};
