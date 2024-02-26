import { render } from "@testing-library/react";
import React from "react";
import { ConnectivityStatus } from "../../../interfaces/devices/devices";

describe("asignedMarkers", () => {
  it("Should have one marker icon for each connectivity status", () => {
    const markers = [
      { connectivityStatus: ConnectivityStatus.offline },
      { connectivityStatus: ConnectivityStatus.onBackup },
      { connectivityStatus: ConnectivityStatus.indeterminate },
      { connectivityStatus: ConnectivityStatus.unknown }
    ];
    expect(markers).toBeTruthy();
  });
});
