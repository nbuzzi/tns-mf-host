import { ConfigProvider, Divider } from 'antd';
import { dark, light } from './divider-theme';
import { useTheme } from '../../hooks/useTheme';
import { IDividerConfig, TNSODividerProps } from './divider-component.model';
import { useMemo } from 'react';

export function TNSODivider(props: TNSODividerProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);

  const customStyles = useMemo(() => {
    const objectConfig: IDividerConfig = {};
    props.type === 'horizontal' && (objectConfig.width = '100%');
    props.borderBold && (objectConfig.border = '2px solid #2f7df3');

    return objectConfig;
  }, [props.borderBold, props.type]);

  return (
    <ConfigProvider theme={theme}>
      <Divider plain type={props.type} style={customStyles} />
    </ConfigProvider>
  );
}

export default TNSODivider;
