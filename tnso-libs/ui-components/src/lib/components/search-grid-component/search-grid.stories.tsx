import { Meta } from "@storybook/react";
import { TNSOContainer } from "../../containers/container";
import { TNSOSearchGrid } from "./search-grid-component";
import "./search-grid-component.scss";
import TNSOCard from "../card-component/card-component";

const meta = {
  component: TNSOSearchGrid,
  title: "Components/SearchGrid",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOSearchGrid>;

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
      <TNSOSearchGrid themeSelected="dark" keyFilter="test" onReset={() => {}} onSearch={() => {}} />
    </TNSOCard>
  </TNSOContainer>
);
