import { useMemo } from "react";
import { MenuProps, Dropdown as AntdDropdown, Spin, ConfigProvider, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TNSOButtonProps } from "../button-component/button-component.model";
import { dark, light } from "./dropdown-theme";
import { useTheme } from "../../hooks/useTheme";

export interface TNSODropdownProps extends TNSOButtonProps {}

export function TNSODropdown(props: TNSODropdownProps): JSX.Element {
  const { variant, children, disabled = false, isLoading = false, options = [] } = props;

  const menuOptions: MenuProps = useMemo(
    () => ({
      items: options.map((option) => ({
        key: option.label,
        label: option.label,
        onClick: option.onClick
      })),
      mode: "vertical"
    }),
    [options]
  );

  const theme = useTheme(dark, light, props.theme);

  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-button-wrapper">
        <AntdDropdown menu={menuOptions} trigger={["click"]} disabled={disabled}>
          <Button className={`tnso-button ${variant}`} type={props.variant} >
            {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : children}
          </Button>
        </AntdDropdown>
      </div>
    </ConfigProvider>
  );
}

export default TNSODropdown;
