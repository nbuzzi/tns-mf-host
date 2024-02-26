import { Meta } from "@storybook/react";
import { TNSOContainer } from "../../containers/container";
import { RadioChangeEvent } from "antd";
import TNSORadioButton from "./radio-button-component";

const meta = {
  component: TNSORadioButton,
  title: "Components/RadioButton",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSORadioButton>;

export default meta;

const onChange = (e: RadioChangeEvent)=>{
    console.log( e.target.value);
}

export const Primary = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSORadioButton onChange={onChange} options={[{value:"a", children:"a"},{value:"b", children:"b"}]} />
  </TNSOContainer>
);

export const Disabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSORadioButton onChange={onChange} options={[{value:"a", children:"a"},{value:"b", children:"b"}]} disabled />
  </TNSOContainer>
);