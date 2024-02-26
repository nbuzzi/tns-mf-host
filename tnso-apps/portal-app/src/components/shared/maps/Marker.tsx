import React, { useEffect } from "react";

interface MarkerProps extends google.maps.MarkerOptions {
  statusDevice: string;
}

export const Marker: React.FC<MarkerProps> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return (): void => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
