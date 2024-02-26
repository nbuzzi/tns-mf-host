import { Meta } from "@storybook/react";
import { TNSOContainer } from "../../containers/container";
import {TNSOSearch} from "./search-component";
import TNSOCard from "../card-component/card-component";

const meta = {
  component: TNSOSearch,
  title: "Components/Search",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOSearch>;

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
    <TNSOSearch />
    </TNSOCard>
  </TNSOContainer>
);
