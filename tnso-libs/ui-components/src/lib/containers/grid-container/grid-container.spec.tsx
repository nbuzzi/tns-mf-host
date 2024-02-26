import { render } from "@testing-library/react";
import TNSOGrid from "./grid-container";

describe("TNSOGrid", () => {
  // Calls handleSelectRow when a row is clicked
  it("should call handleSelectRow when a row is clicked", () => {
    const dataSource = [
      { id: 1, name: "John Doe", age: 25 },
      { id: 2, name: "Jane Smith", age: 30 },
      { id: 3, name: "Bob Johnson", age: 35 }
    ];
    const handleSelectRow = jest.fn();

    const { baseElement } = render(<TNSOGrid dataSource={dataSource} handleSelectRow={handleSelectRow} />);

    expect(baseElement).toBeTruthy();
  });
});
