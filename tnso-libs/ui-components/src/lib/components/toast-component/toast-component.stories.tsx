import { Meta } from "@storybook/react";
import { TNSOToast } from "./toast-component";
import TNSOContainer from "../../containers/container";
import { ToastTypes } from "./toast-component.model";


const meta = {
  component: TNSOToast,
  title: "Components/Toast",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOToast>;

export default meta;

export const Success = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOToast type={ToastTypes.Success} isShowIcon={true} isClosable={true}>
      Success
    </TNSOToast>
  </TNSOContainer>
);

export const Danger = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOToast type={ToastTypes.Error} isShowIcon={true} isClosable={true}>
      Error
    </TNSOToast>
  </TNSOContainer>
);
