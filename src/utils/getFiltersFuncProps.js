import React, { useState, useRef } from 'react';
import { Input, Button, Icon } from 'antd';

const FloatSearchBar = React.forwardRef(
  ({ setSelectedKeys, confirm, clearFilters, dataIndex }, ref) => {
    const [searchText, setSearchText] = useState('');

    const handleChange = e => {
      setSearchText(e.target.value);
      setSelectedKeys(e.target.value ? [e.target.value] : []);
    };

    const handleSearch = () => {
      confirm();
    };

    const onReset = () => {
      setSearchText('');
      clearFilters();
    };

    return (
      <div style={{ padding: 8 }}>
        <Input
          ref={ref}
          value={searchText}
          placeholder={`Search ${dataIndex}`}
          onChange={handleChange}
          onPressEnter={handleSearch}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={onReset} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    );
  }
);

export default dataIndex => {
  const searchBarRef = useRef(null);
  return {
    filterDropdown: props => (
      <FloatSearchBar ref={searchBarRef} dataIndex={dataIndex} {...props} />
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchBarRef.current.select());
      }
    }
  };
};
