import { TNSOSelectorProps } from "./select-component.model";
import { ConfigProvider, Select } from "antd";
import "./select-component.scss";
import { dark, light } from "./select-theme";
import { useTheme } from "../../hooks/useTheme";

export function TNSOSelector(props: TNSOSelectorProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);

  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-select" data-testid="tnso-select" onKeyDown={(e) => e.stopPropagation()}>
        <Select {...props} />
      </div>
    </ConfigProvider>
  );
}

export default TNSOSelector;
