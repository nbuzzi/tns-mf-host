import { ConfigProvider } from 'antd';
import { TNSOCardProps } from './card-component.model';
import { Card } from 'antd';
import { dark, light } from './card-theme';
import style from './card-component.module.scss';
import { useTheme } from '../../hooks/useTheme';

export function TNSOCard(props: TNSOCardProps): JSX.Element {
  const theme = useTheme(dark, light, props.theme);
  return (
    <ConfigProvider theme={theme}>
      <Card className={`tnso-card ${props.className} ${style.card}`}>
        {props.children}
      </Card>
    </ConfigProvider>
  );
}

export default TNSOCard;
