import { render } from "@testing-library/react";
import { ItemDoughnutChart } from "./ItemDoughnutChart";

describe("ItemDoughnutChart", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
        <ItemDoughnutChart />
    );
    expect(baseElement).toBeTruthy();
  });
});
