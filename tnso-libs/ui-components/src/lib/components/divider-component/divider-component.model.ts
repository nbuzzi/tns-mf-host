import { DividerProps } from 'antd';
import { ITheme } from '../theme.model';

export const enum TypesDivider {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export interface TNSODividerProps extends ITheme, DividerProps {
  borderBold?: boolean;
}

export interface IDividerConfig {
  width?: string;
  border?: string;
}
