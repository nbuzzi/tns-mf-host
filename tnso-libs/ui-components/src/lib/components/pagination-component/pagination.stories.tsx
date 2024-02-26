import { Meta } from "@storybook/react";
import { TNSOPagination } from "./pagination-component";
import TNSOContainer from "../../containers/container";

const meta = {
  component: TNSOPagination,
  title: "Components/Pagination",
  tags: ["autodocs"]
} satisfies Meta<typeof TNSOPagination>;

export default meta;

export const Default = ({ currentPage = 1, totalItems = 10, pageSize = 5 }) => {
  return (
    <TNSOContainer
      className="dark-theme"
      style={{
        backgroundColor: "#0F0F1A",
        height: "100vh",
        width: "90%"
      }}>
      <TNSOPagination currentPage={currentPage} totalItems={totalItems} pageSize={pageSize} handleGoToPage={() => {}} />
    </TNSOContainer>
  );
};

export const ManyPages = ({ currentPage = 5, totalItems = 100, pageSize = 5 }) => {
    return (
      <TNSOContainer
        className="dark-theme"
        style={{
          backgroundColor: "#0F0F1A",
          height: "100vh",
          width: "90%"
        }}>
        <TNSOPagination currentPage={currentPage} totalItems={totalItems} pageSize={pageSize} handleGoToPage={() => {}} />
      </TNSOContainer>
    );
  };
