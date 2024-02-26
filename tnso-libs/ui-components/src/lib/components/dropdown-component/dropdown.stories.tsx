import { Meta} from "@storybook/react";
import TNSODropdown from "./dropdown-component";
import TNSOContainer from "../../../lib/containers/container";
import { DownloadOutlined } from "@ant-design/icons";

const meta = {
  title: "Components/DropdownComponent",
  component: TNSODropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof TNSODropdown>;

export default meta;

export const Default = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
    }}
  >
    <TNSODropdown
      options={[
        { label: "Option 1", onClick: () => console.log("Option 1") },
        { label: "Option 2", onClick: () => console.log("Option 2") },
      ]}
    >
      <DownloadOutlined />
    </TNSODropdown>
  </TNSOContainer>
);

export const Disabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh",
    }}
  >
    <TNSODropdown
      disabled = {true}
      options={[
        { label: "Option 1", onClick: () => console.log("Option 1") },
        { label: "Option 2", onClick: () => console.log("Option 2") },
      ]}
    >
      <DownloadOutlined />
    </TNSODropdown>
  </TNSOContainer>
);
