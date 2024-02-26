import { ConfigProvider, Steps } from 'antd';
import { TNSOStepsProps } from './steps-component.model';
import { useTheme } from '../../hooks/useTheme';
import { dark, light } from './steps-theme';
import { useMemo } from 'react';

export function TNSOSteps(props: TNSOStepsProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);
  const customStyles = useMemo(() => {
    return {
      border: 'none',
    };
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Steps {...props} style={customStyles} />
    </ConfigProvider>
  );
}
