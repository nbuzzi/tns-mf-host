import { Alert, ConfigProvider } from "antd";
import { TNSOToastProps } from "./toast-component.model";
import { dark, light } from "./toast-theme";
import { useTheme } from "../../hooks/useTheme";

export function TNSOToast(props: TNSOToastProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);

  return (
    <ConfigProvider theme={theme}>
      <Alert message={props.children} type={props.type} showIcon={props.isShowIcon} closable={props.isClosable} className={`tnso-${props.type}-toast`} />;
    </ConfigProvider>
  );
}

export default TNSOToast;
