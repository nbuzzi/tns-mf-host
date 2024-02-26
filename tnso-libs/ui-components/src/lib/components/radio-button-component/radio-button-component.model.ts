import { RadioChangeEvent } from "antd";
import { ITheme } from "../theme.model";
import { RadioButtonProps } from "antd/lib/radio/radioButton";

export interface TNSORadioButtonProps extends ITheme, RadioButtonProps {
  onChange: (e: RadioChangeEvent) => void;
  defaultValue? : string;
  options: { value: string; children: React.ReactNode}[];
}
