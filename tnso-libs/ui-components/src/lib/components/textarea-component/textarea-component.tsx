import { ConfigProvider, Input } from "antd";
import { TNSOTextareaProps } from "./texarea-component.model";
import { dark, light } from "./textarea-theme";
import { useTheme } from "../../hooks/useTheme";

const { TextArea } = Input;

export function TNSOTextarea(props: TNSOTextareaProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);

  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-textarea" onKeyDown={(e) => e.stopPropagation()}>
        <TextArea {...props} />
      </div>
    </ConfigProvider>
  );
}
export default TNSOTextarea;
