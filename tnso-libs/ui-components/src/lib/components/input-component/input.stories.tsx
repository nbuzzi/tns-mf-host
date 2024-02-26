import { Meta } from "@storybook/react";
import { TNSOContainer } from "../../containers/container";
import { TNSOInput } from "./input-component";
import { InputType } from "./input-component.model";
import TNSOCard from "../card-component/card-component";

const meta = {
  component: TNSOInput,
  title: "Components/Input",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOInput>;

export default meta;

export const Default = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOCard>
      <TNSOInput />
    </TNSOCard>
  </TNSOContainer>
);

export const Password = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOCard>
      <TNSOInput type={InputType.Password} />
    </TNSOCard>
  </TNSOContainer>
);

export const Disabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOCard>
      <TNSOInput disabled defaultValue="Disabled" />
    </TNSOCard>
  </TNSOContainer>
);
