import { Meta } from "@storybook/react";
import { TNSOCard } from "./card-component";
import TNSOToast from "../toast-component/toast-component";
import TNSOContainer from "../../../lib/containers/container";
import { ToastTypes } from "../toast-component/toast-component.model";

const meta = {
  component: TNSOCard,
  title: "Components/Card",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOCard>;

export default meta;

export const Default = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOCard className="d-flex">
      <TNSOToast type={ToastTypes.Success} isShowIcon={true} isClosable={true}>
        Success!
      </TNSOToast>
    </TNSOCard>
  </TNSOContainer>
);
