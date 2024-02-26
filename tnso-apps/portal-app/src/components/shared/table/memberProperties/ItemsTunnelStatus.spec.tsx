import React from "react";
import { render } from "@testing-library/react";
import { ItemsTunnelStatus } from "./ItemsTunnelStatus";
import { InterfaceStatus } from "../../../../interfaces/memberConnectivity/memberConnectivity";
import { COLORS } from "../../../../utils/const/colors";
import "@testing-library/jest-dom/extend-expect";

describe("ItemsTunnelStatus Component", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ItemsTunnelStatus />);
    expect(baseElement).toBeTruthy();
  });

  it("should render the component with interfaceDetails prop", () => {
    const interfaceDetails = [
      { interfaceType: "type1", interfaceStatus: InterfaceStatus.DOWN },
      { interfaceType: "type2", interfaceStatus: InterfaceStatus.UP }
    ];

    const { getByText } = render(<ItemsTunnelStatus interfaceDetails={interfaceDetails} />);
    const status1Element = getByText("DOWN");
    const status2Element = getByText("UP");

    expect(status1Element).toHaveStyle(`color: ${COLORS.TABLE.INTERFACESTATUS.DOWN}`);
    expect(status2Element).toHaveStyle(`color: ${COLORS.TABLE.INTERFACESTATUS.UP}`);
  });
});
