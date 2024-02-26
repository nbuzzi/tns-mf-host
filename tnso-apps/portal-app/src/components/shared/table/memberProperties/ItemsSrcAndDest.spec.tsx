import React from "react";
import { render } from "@testing-library/react";
import { ItemsSrcAndDest } from "./ItemsSrcAndDest";
import { DeviceMember, InterfaceStatus } from "../../../../interfaces/memberConnectivity/memberConnectivity";

describe("ItemsSrcAndDest Component", () => {
  describe("ItemsSrcAndDest Component", () => {
    it("should render the component with item prop", () => {
      const item: DeviceMember = {
        srcTnsDeviceName: "Source TNS Device",
        srcCustomerDeviceName: "Source Customer Device",
        destTnsDeviceName: "Destination TNS Device",
        destCustomerDeviceName: "Destination Customer Device",
        interfaceDetails: [
          { interfaceType: "Type1", interfaceStatus: InterfaceStatus.DOWN },
          { interfaceType: "Type2", interfaceStatus: InterfaceStatus.UP }
        ]
      };

      const { getAllByText } = render(<ItemsSrcAndDest item={item} />);
      const sourceTnsDeviceText = /Source TNS Device/;
      const sourceCustomerDeviceText = /Source Customer Device/;
      const destinationTnsDeviceText = /Destination TNS Device/;
      const destinationCustomerDeviceText = /Destination Customer Device/;

      expect(getAllByText(sourceTnsDeviceText)).toHaveLength(1);
      expect(getAllByText(sourceCustomerDeviceText)).toHaveLength(1);
      expect(getAllByText(destinationTnsDeviceText)).toHaveLength(1);
      expect(getAllByText(destinationCustomerDeviceText)).toHaveLength(1);
    });
  });
});
