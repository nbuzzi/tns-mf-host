import React, { useCallback } from 'react';
import { TNSOActionButtonProps } from './action-button-component.model';
import { ConfigProvider } from 'antd';
import './action-button-theme';
import './action-button-component.scss';
import { dark, light } from './action-button-theme';
import { Variants } from '../../button-component/button-component.model';
import TNSOButton from '../../button-component/button-component';
import { useTheme } from '../../../hooks/useTheme';
import TNSODivider from '../../divider-component/divider-component';
import { TypesDivider } from '../../divider-component/divider-component.model';

export function TNSOActionButton(props: TNSOActionButtonProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);
  const { actionsButtons } = props;

  const content = useCallback(
    (icon: React.ReactNode, text: string | undefined) => {
      return icon ?? text;
    },
    [actionsButtons]
  );

  return (
    <ConfigProvider theme={theme}>
      <div className="action-button-container">
        {props.actionsButtons?.map((button, index, array) => (
          <>
            <TNSOButton
              onClick={button.onClick}
              onChange={button.onChange}
              disabled={button.disabled}
              variant={Variants.Link}
            >
              {content(button.icon, button.text)}
            </TNSOButton>
            {array.length > 1 && index !== array.length - 1 && (
              <TNSODivider type={TypesDivider.vertical} />
            )}
          </>
        ))}
      </div>
    </ConfigProvider>
  );
}

export default TNSOActionButton;
