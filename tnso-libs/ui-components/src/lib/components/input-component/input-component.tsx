import { useMemo } from "react";
import { Input as AntdInput, ConfigProvider } from "antd";
import { TNSOInputProps } from "./input-component.model";
import { dark } from "./input-theme";
import { light } from "./input-theme";
import { useTheme } from "../../hooks/useTheme";

export function TNSOInput(props: TNSOInputProps): JSX.Element {
  const inputComponent = useMemo(() => (props.type === "password" ? <AntdInput.Password {...props} /> : <AntdInput {...props} />), [props]);
  const theme = useTheme(dark, light, props.theme);

  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-input">{inputComponent}</div>
    </ConfigProvider>
  );
}

export default TNSOInput;
