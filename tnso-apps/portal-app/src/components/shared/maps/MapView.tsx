import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_API_KEY } from "../../../config/environments";
import { Map } from "./Map";
import { MarkerCluster } from "./MarkerCluster";
import { GeolocationResponse } from "../../../interfaces/devices/response/response";

/**
 * Properties for the MapView component.
 */
export interface MapViewProps {
  devicesGroup?: GeolocationResponse[]; // Group of devices to display on the map
  showOnlyFilteredData?: boolean; // Show only filtered data
  width?: string; // Width of the map
  height?: string; // Height of the map
}

/**
 * MapView component.
 * Displays a map with device markers and marker clusters.
 */
const MapView = ({ devicesGroup, width, height }: MapViewProps): JSX.Element => {
  const [widthMap, setWidthMap] = useState("100%"); // Width of the map
  const [heightMap, setHeightMap] = useState("75vh"); // Height of the map

  /**
   * Collects elements with the "title" attribute starting with "Cluster of",
   * and applies additional styles and attributes based on the marker count.
   */
  const collectElementsWithTitle = useCallback((): void => {
    const clusters = document.querySelectorAll("div[title^='Cluster of']");
    clusters.forEach((cluster) => {
      const title = cluster.getAttribute("title");
      if (title) {
        const match = title.match(/Cluster of (\d+)/);
        if (match) {
          if (parseInt(match[1]) > 9) {
            cluster.classList.add("high-cluster"); // Add the "high-cluster" class for clusters with more than 9 markers
            const markerCount = parseInt(match[1]);
            cluster.setAttribute("data-marker-count", markerCount.toString()); // Add the "data-marker-count" attribute with the marker count
          } else {
            cluster.classList.add("low-cluster"); // Add the "low-cluster" class for clusters with less than 10 markers
            const markerCount = parseInt(match[1]);
            cluster.setAttribute("data-marker-count", markerCount.toString()); // Add the "data-marker-count" attribute with the marker count
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    setWidthMap(width ?? "100%"); // Set the width of the map
    setHeightMap(height ?? "600px"); // Set the height of the map
    collectElementsWithTitle(); // Collect elements with the "title" attribute and apply styles and attributes
  }, [width, height, devicesGroup]);

  return (
    <Wrapper apiKey={GOOGLE_API_KEY} data-testid="map-view-component">
      <Map style={{ width: `${widthMap}`, height: `${heightMap}` }} deviceLocation={devicesGroup?.[0]}>
        <MarkerCluster devicesGroup={devicesGroup} collectElementsWithTitle={collectElementsWithTitle} />
      </Map>
    </Wrapper>
  );
};

export default MapView;
