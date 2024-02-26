import { render } from "@testing-library/react";
import { ItemsInstance } from "./ItemsInstance";
import { InterfaceDetails, InterfaceStatus, InterfaceType } from "../../../../interfaces/memberConnectivity/memberConnectivity";

describe("ItemsInstance", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ItemsInstance />);
    expect(baseElement).toBeTruthy();
  });

  it("should render the component with interfaceDetails prop", () => {
    const interfaceDetails: InterfaceDetails[] = [
      { interfaceType: InterfaceType.Primary_Site_To_Site, interfaceStatus: InterfaceStatus.DOWN },
      { interfaceType: InterfaceType.Secondary_Site_To_Site, interfaceStatus: InterfaceStatus.UP }
    ];
    const { getAllByText } = render(<ItemsInstance interfaceDetails={interfaceDetails} />);

    expect(getAllByText("Primary Site To Site")).toHaveLength(1);
    expect(getAllByText("Secondary Site To Site")).toHaveLength(1);
  });
});
