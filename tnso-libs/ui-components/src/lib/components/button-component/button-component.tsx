import { useCallback, useMemo } from "react";
import { TNSOButtonProps, Variants } from "./button-component.model";
import { Button, ConfigProvider } from "antd";
import { dark, light } from "./button-theme";
import { useTheme } from "../../hooks/useTheme";

export function TNSOButton(props: TNSOButtonProps): JSX.Element {
  const { onClick, onChange } = props;
  const ghost = useMemo(() => (props.variant === Variants.OutlinePrimary ? true : false), [props.variant]);
  const variant = useMemo(() => (props.variant === Variants.OutlinePrimary ? Variants.Primary : props.variant), [props.variant]);

  const theme = useTheme(dark, light, props.theme);


  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (onClick) {
        onClick();
      }
    },
    [onClick]
  );

  return (
    <ConfigProvider theme={theme}>
      <div className="tnso-button-wrapper">
        <Button
          onClick={handleClick}
          onChange={onChange}
          title={props.title}
          disabled={props.disabled}
          type={variant}
          ghost={ghost}>
          {props.children}
        </Button>
      </div>
    </ConfigProvider>
  );
}

export default TNSOButton;
