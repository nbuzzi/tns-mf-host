import React, { useMemo } from "react";
import { ConnectivityStatus } from "../../../interfaces/devices/devices";
import MapView from "../../shared/maps/MapView";
import { GeolocationResponse } from "../../../interfaces/devices/response/response";

import { store } from "../../../store/StoreMobx";
import { observer } from "mobx-react";

export const DeviceLocationMap = observer((): JSX.Element => {
  const { detail } = store.device;

  const location: GeolocationResponse | null = useMemo(
    () =>
      ({
        tnsDeviceName: detail.data?.tnsDeviceName || "",
        latitude: detail.data?.latitude || "0",
        longitude: detail.data?.longitude || "0",
        connectivityStatus: detail.data?.connectivityStatus || ConnectivityStatus.unknown,
        acna: detail.data?.acna || ""
      } || null),
    [ detail.data?.tnsDeviceName, detail.data?.latitude, detail.data?.longitude, detail.data?.connectivityStatus, detail.data?.acna]
  );

  return (
    <div className="map-container rounded w-100" data-testid="device-loation-component">
      <MapView devicesGroup={location ? [location] : undefined} />
      <div className="d-flex w-100 justify-content-center align-items-center map-footer">{detail.data?.streetAddress}</div>
    </div>
  );
});
