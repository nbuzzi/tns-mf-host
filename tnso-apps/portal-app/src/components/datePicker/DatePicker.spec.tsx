import { render } from "@testing-library/react";
import { DateP } from "./DatePicker";

const mockedProps = {
  date: "2021-01-01",
  setDate: () => {
    ("YYYY-MM-DD HH:mm");
  }
};

describe("DatePicker", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DateP date={mockedProps.date} setDate={mockedProps.setDate} />);
    expect(baseElement).toBeTruthy();
  });
});
