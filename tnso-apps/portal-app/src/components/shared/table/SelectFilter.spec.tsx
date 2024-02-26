import { render } from "@testing-library/react";
import { TNSOSelectFilter } from "./SelectFilter";

describe("TNSOSelectFilter", () => {
  // Renders the component with the given props.
  it("should render the component with the given props", () => {
    // Arrange
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ];
    const keyFilter = "example";
    const onSearch = jest.fn();

    // Act
    render(<TNSOSelectFilter options={options} keyFilter={keyFilter} onSearch={onSearch} defaultValue={["option2"]} />);

    // Assert
    // Add assertions here
  });
});
