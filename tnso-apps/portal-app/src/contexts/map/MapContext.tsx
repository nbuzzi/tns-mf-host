import React, { createContext, useMemo, useCallback, useState, useEffect } from "react";
import { store } from "../../store/StoreMobx";

interface MapContextValue {
  mapCenter?: google.maps.LatLngLiteral;
  mapZoom?: number;
  mapMarkers?: google.maps.Marker[];
  mapInfoWindow?: google.maps.InfoWindow;
  map?: google.maps.Map | null;

  /**
   * @description set the `zoom map` data
   * @param {number} zoom The zoom
   * @returns void
   */
  setMapZoomData: (zoom: number) => void;
  /**
   * @description set the `center map` data
   * @param {google.maps.LatLngLiteral} center The center
   * @returns void
   */
  setMapCenterData: (center: google.maps.LatLngLiteral) => void;
  /**
   * @description set the `markers map` data
   * @param {google.maps.Marker[]} markers The markers
   * @returns void
   */
  setMapMarkersData: (markers: google.maps.Marker[]) => void;
  /**
   * @description set the `infoWindow map` data
   * @param {google.maps.InfoWindow} infoWindow The infoWindow
   * @returns void
   */
  setMapInfoWindowData: (infoWindow: google.maps.InfoWindow) => void;
  /**
   * @description set the `map` data
   * @param {google.maps.Map} map The map
   * @returns void
   */
  setMapData: (map: google.maps.Map | null) => void;
  /**
   * @description set the `center and zoom information` by marker
   * @returns void
   */
  setCenterAndZoomByMarker: (lat: number, lng: number) => void;
}

interface MapContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const MapContextProvider: React.FC<MapContextProviderProps> = ({ children }): JSX.Element => {
  const [map, setMap] = useState<google.maps.Map | null>();
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>();
  const [mapZoom, setMapZoom] = useState<number>(0);
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);
  const [mapInfoWindow, setMapInfoWindow] = useState<google.maps.InfoWindow>();

  const setMapData = useCallback((map: google.maps.Map | null): void => setMap(map), [setMap]);

  const setMapCenterData = useCallback((center: google.maps.LatLngLiteral): void => setMapCenter(center), [setMapCenter]);

  const setMapZoomData = useCallback((zoom: number): void => setMapZoom(zoom), [setMapZoom]);

  const setMapMarkersData = useCallback((markers: google.maps.Marker[]): void => setMapMarkers(markers), [setMapMarkers]);

  const setMapInfoWindowData = useCallback((infoWindow: google.maps.InfoWindow): void => setMapInfoWindow(infoWindow), [setMapInfoWindow]);

  const setCenterAndZoomByMarker = useCallback(
    (lat: number, lng: number): void => {
      if (map && mapMarkers.length > 0) {
        setMapCenter({ lat, lng });
        setMapZoom(18);
      }
    },
    [map, mapMarkers]
  );

  useEffect(() => {
    if (store.device.geolocation.deviceLocation) {
      setMapCenterData({ lat: Number(store.device.geolocation.deviceLocation.latitude), lng: Number(store.device.geolocation.deviceLocation.longitude) });
      setMapZoomData(19);
    }
  }, [store.device.geolocation.deviceLocation, setMapCenterData, setMapZoomData]);

  const mapContextContextValue = useMemo<MapContextValue>(
    () => ({
      map,
      mapCenter,
      mapZoom,
      mapMarkers,
      mapInfoWindow,
      setMapData,
      setMapCenterData,
      setMapZoomData,
      setMapMarkersData,
      setMapInfoWindowData,
      setCenterAndZoomByMarker
    }),
    [map, mapCenter, mapZoom, mapMarkers, mapInfoWindow, setMapData, setMapCenterData, setMapZoomData, setMapMarkersData, setMapInfoWindowData, setCenterAndZoomByMarker]
  );

  return <MapContextContext.Provider value={mapContextContextValue}>{children}</MapContextContext.Provider>;
};

export const MapContextContext = createContext<MapContextValue>({} as MapContextValue);
