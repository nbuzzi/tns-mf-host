import { useCallback, useState } from "react";
import { TNSOSearchProps } from "./search-component.model";
import { ConfigProvider, Flex, Input, Space } from "antd";
import { dark, light } from "./search-grid-theme";
import { Variants } from "../button-component/button-component.model";
import TNSOButton from "../button-component/button-component";
import "./search-grid-component.scss";
import { useTheme } from "../../hooks/useTheme";

export function TNSOSearchGrid(props: TNSOSearchProps): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const { onReset, onSearch } = props;
  const theme = useTheme(dark, light, props.themeSelected);

  const resetSearch = useCallback(() => {
    setSearchValue("");
    onReset();
  }, [onReset]);

  return (
    <ConfigProvider theme={theme}>
      <Flex gap="middle" vertical className="search-filter-grid" onKeyDown={(e) => e.stopPropagation()}>
        <Input placeholder="Search" className="search-box" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
        <Space className="search-buttons">
          <TNSOButton variant={Variants.Link} onClick={resetSearch}>
            Reset
          </TNSOButton>
          <TNSOButton variant={Variants.Primary} onClick={() => onSearch(searchValue, props.keyFilter)}>
            Search
          </TNSOButton>
        </Space>
      </Flex>
    </ConfigProvider>
  );
}

export default TNSOSearchGrid;
