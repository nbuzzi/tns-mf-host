import React, { useCallback } from "react";
import { ConfigProvider, Radio, RadioChangeEvent } from "antd";
import { dark, light } from "./radio-button-theme";
import { useTheme } from "../../hooks/useTheme";
import { TNSORadioButtonProps } from "./radio-button-component.model";

export function TNSORadioButton(props: TNSORadioButtonProps): JSX.Element {
    const { onChange, options } = props;

    const theme = useTheme(dark, light, props.theme);
  
    const handleChange = useCallback(
      (e:RadioChangeEvent) => {
        if (onChange) {
          onChange(e);
        }
      },
      [onChange]
    );

  return (
    <ConfigProvider theme={theme}>
      <Radio.Group onChange={handleChange} defaultValue={props.defaultValue} >
      {options &&
          options.map((option) => (
            <Radio.Button key={option.value} value={option.value} {...props}>
              {option.children}
            </Radio.Button>
          ))}
      </Radio.Group>
    </ConfigProvider>
  );
}

export default TNSORadioButton;
