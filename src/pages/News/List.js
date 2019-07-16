import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table, Divider, Button, Popconfirm, notification } from 'antd';
import _ from 'lodash';

import { getAll, remove } from '../../apis/firebaseApis';

export default () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAll('/news');
        setList(_.values(data));
        // console.log(_.values(data))
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onRemove = async uuid => {
    setIsLoading(true);
    try {
      await remove('/news', uuid);
      setList(preList => preList.filter(elem => elem.uuid !== uuid));
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
  };

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
        <Link to={`/news/${record.uuid}/edit`}>Edit</Link>
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
    []
  );

  return (
    <>
      <Link to="/news/create">
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
      <Table dataSource={list} loading={isLoading}>
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column
          title="Date"
          dataIndex="date"
          key="date"
          sorter={(a, b) => moment(a.date).unix() - moment(b.date).unix()}
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
