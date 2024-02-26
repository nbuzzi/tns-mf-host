import React from "react";
import { useMemo } from "react";
import { MenuProps, Dropdown as AntdDropdown, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TNSOButtonProps } from "@tnso/ui-components/dist";

export function TNSODropdownComponent(props: TNSOButtonProps): JSX.Element {
  const { variant, children, disabled, isLoading, options = [] } = props;

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

  return (
    <div className="tnso-button-wrapper">
      <AntdDropdown menu={menuOptions} trigger={["click"]} disabled={disabled || isLoading}>
        <button className={`tnso-button ${variant}`} disabled={disabled || isLoading}>
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : children}
        </button>
      </AntdDropdown>
    </div>
  );
}

export default TNSODropdownComponent;
