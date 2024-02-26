import { Meta } from "@storybook/react";
import TNSOContainer from "../../containers/container";
import TNSOSelector from "./select-component";

const meta = {
  component: TNSOSelector,
  title: "Components/Selector",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOSelector>;

export default meta;

const mockedData = {
  data: [
    {
      label: "Green",
      value: "Green"
    },
    {
      label: "Dark",
      value: "Dark"
    },
    {
      label: "Dark",
      value: "Dark3"
    },
    {
      label: "Dark",
      value: "Dark2"
    },
    {
      label: "Dark",
      value: "Dark1"
    }
  ]
};

export const Default = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOSelector options={mockedData.data} placeholder="Select" />
  </TNSOContainer>
);

export const ShowSearch = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOSelector options={mockedData.data} showSearch={true} placeholder="Select" />
  </TNSOContainer>
);

export const MultipleWithoutSearch = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOSelector options={mockedData.data} showSearch={false} mode="multiple" />
  </TNSOContainer>
);

export const MultipleWithSearch = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
      width: "90%"
    }}>
    <TNSOSelector options={mockedData.data} showSearch={true} mode="multiple" />
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
    <TNSOSelector options={mockedData.data} placeholder="Select" disabled={true} />
  </TNSOContainer>
);
