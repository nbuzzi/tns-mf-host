import { Meta } from "@storybook/react";
import { TNSOContainer } from "../../containers/container";
import { Flex } from "antd";
import { TNSOButton } from "./button-component";
import { Variants } from "./button-component.model";

const meta = {
  component: TNSOButton,
  title: "Components/Button",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOButton>;

export default meta;

export const Primary = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSOButton>Primary Button</TNSOButton>
  </TNSOContainer>
);

export const PrimaryDisabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSOButton variant={Variants.Primary} disabled>
      Primary Disabled
    </TNSOButton>
  </TNSOContainer>
);

export const Secondary = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSOButton variant={Variants.Secondary}>Secondary Button</TNSOButton>
  </TNSOContainer>
);

export const SecondaryDisabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSOButton variant={Variants.Secondary} disabled>
      Secondary Disabled
    </TNSOButton>
  </TNSOContainer>
);
export const Link = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSOButton variant={Variants.Link}>Link Button</TNSOButton>
  </TNSOContainer>
);

export const LinkDisabled = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <TNSOButton variant={Variants.Link} disabled>
      Link Disabled
    </TNSOButton>
  </TNSOContainer>
);

export const AllVariants = () => (
  <TNSOContainer
    className="dark-theme"
    style={{
      backgroundColor: "#0F0F1A",
      height: "100vh"
    }}>
    <Flex gap="middle">
      <TNSOButton variant={Variants.Primary}>Primary Button</TNSOButton>
      <TNSOButton variant={Variants.Primary} disabled>
        Primary Button
      </TNSOButton>
      <TNSOButton variant={Variants.Secondary}>Secondary Button</TNSOButton>
      <TNSOButton variant={Variants.Secondary} disabled>
        Secondary Button
      </TNSOButton>
      <TNSOButton variant={Variants.Link}>Link Button</TNSOButton>
      <TNSOButton variant={Variants.Link} disabled>
        Link Button
      </TNSOButton>
    </Flex>
    <Flex gap="middle">
      <TNSOButton variant={Variants.OutlinePrimary}>Outline Primary Button</TNSOButton>
    </Flex>
  </TNSOContainer>
);
