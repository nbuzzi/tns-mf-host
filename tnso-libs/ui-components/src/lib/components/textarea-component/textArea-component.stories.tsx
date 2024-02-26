import { Meta } from "@storybook/react";
import TNSOContainer from "../../containers/container";
import { TNSOTextarea } from "./textarea-component";

const meta = {
  component: TNSOTextarea,
  title: "Components/TextArea",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOTextarea>;

export default meta;

export const Default = () => (
  <TNSOContainer>
    <TNSOTextarea  placeholder="Enter note here"/>
  </TNSOContainer>
);
