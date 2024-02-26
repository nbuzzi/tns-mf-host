import { ConfigProvider, Input } from "antd";
import { TNSOSearchProps } from "./search-component.model";
import { dark, light } from "./search-theme";
import { useTheme } from "../../hooks/useTheme";

const { Search } = Input;

export function TNSOSearch(props: TNSOSearchProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);
  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-search" onKeyDown={(e) => e.stopPropagation()}>
        <Search {...props} />
      </div>
    </ConfigProvider>
  );
}

export default TNSOSearch;
