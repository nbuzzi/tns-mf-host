import React, { useCallback, useState } from 'react';
import { Flex, Input, Space } from 'antd';
import './SearchFilter.scss';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';

export interface TNSOSearchProps {
  themeSelected: 'dark' | 'light';
  keyFilter: string;
  defaultValue?: string;
  onReset: () => void;
  onSearch: (value: string | number | boolean, keyFilter: string) => void;
}

export function TNSOSearchGrid(props: TNSOSearchProps): JSX.Element {
  const [searchValue, setSearchValue] = useState(props.defaultValue ?? '');
  const { onReset, onSearch } = props;

  const resetSearch = useCallback(() => {
    setSearchValue('');
    onReset();
  }, [onReset]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        onSearch(searchValue, props.keyFilter);
        const dropdown = document.querySelector('.ant-dropdown');
        if (dropdown) {
          dropdown.classList.add('ant-dropdown-hidden');
        }
      }
    },
    [onSearch, searchValue, props.keyFilter]
  );

  const handleClick = useCallback(
    (searchValue: string, keyFilter: string): void => {
      onSearch(searchValue, keyFilter);
      const dropdown = document.querySelector('.ant-dropdown');
      if (dropdown) {
        dropdown.classList.add('ant-dropdown-hidden');
      }
    },
    [onSearch, searchValue, props.keyFilter]
  );

  return (
    // eslint-disable-next-line
    <Flex
      gap="middle"
      vertical
      className="search-filter-grid"
      onKeyDown={(e) => e.stopPropagation()}
      data-testid="search-filter"
    >
      {/* eslint-disable-next-line */}
      <Input
        placeholder="Search"
        className="search-box"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onKeyPress={handleKeyPress}
      />
      <Space className="search-buttons">
        <button className="btn-reset" onClick={resetSearch}>
          Reset
        </button>
        {/* eslint-disable-next-line */}
        <TNSOButton
          variant={Variants.Primary}
          onClick={() => handleClick(searchValue, props.keyFilter)}
        >
          Ok
        </TNSOButton>
      </Space>
    </Flex>
  );
}
