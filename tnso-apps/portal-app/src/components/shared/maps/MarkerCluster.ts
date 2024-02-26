import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { content } from './infoMarker';
import { ConnectivityStatus } from '../../../interfaces/devices/devices';
import { DeviceService } from '../../../service/device/DeviceService';
import primaryDetails from '../../../assets/images/icons/marker-details-primary.png';
import offlineDetails from '../../../assets/images/icons/marker-details-offline.png';
import backupDetails from '../../../assets/images/icons/marker-details-backup.png';
import unknownDetails from '../../../assets/images/icons/marker-details-unknown.png';
import indeterminateDetails from '../../../assets/images/icons/marker-details-indeterminate.png';
import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../store/StoreMobx';
import { observer } from 'mobx-react';
import { GeolocationResponse } from '../../../interfaces/devices/response/response';

export interface MarkerClustererProps {
  map?: google.maps.Map;
  devicesGroup?: GeolocationResponse[];
  collectElementsWithTitle: () => void;
}

export const MarkerCluster = observer(
  ({
    map,
    devicesGroup,
    collectElementsWithTitle,
  }: MarkerClustererProps): null => {
    const { geolocation } = store.device;
    const navigate = useNavigate();
    const geolocations = devicesGroup ?? geolocation.data;
    const markerClusterer = useMemo(() => new MarkerClusterer({}), []);
    const markerSpiderfier = useMemo(
      () =>
        map && new OverlappingMarkerSpiderfier(map, { keepSpiderfied: true }),
      [map]
    );

    const markerClustererRef = useRef<MarkerClusterer | null>(null);
    const observerRef = useRef<MutationObserver | null>(null);
    const [isDeviceGroup] = useState<boolean>(devicesGroup ? true : false);
    const actualMarker = useRef<google.maps.InfoWindow | null>(null);

    const asignedMarkers = useCallback((): google.maps.Marker[] | undefined => {
      if (geolocations) {
        const markers: google.maps.Marker[] = [];
        geolocations?.forEach((device: GeolocationResponse): void => {
          if (device.latitude && device.longitude) {
            const marker = new google.maps.Marker({
              position: {
                lat: Number(device.latitude),
                lng: Number(device.longitude),
              },
            });

            switch (device.connectivityStatus) {
              case ConnectivityStatus.onPrimary:
                marker.setIcon(primaryDetails);
                break;
              case ConnectivityStatus.offline:
                marker.setIcon(offlineDetails);
                break;
              case ConnectivityStatus.onBackup:
                marker.setIcon(backupDetails);
                break;
              case ConnectivityStatus.indeterminate:
                marker.setIcon(indeterminateDetails);
                break;
              default:
                marker.setIcon(unknownDetails);
            }
            marker.addListener('spider_click', async () => {
              try {
                const response = await DeviceService.getDetail(
                  device.tnsDeviceName
                );
                const infoContent = content(response?.data, isDeviceGroup);
                // eslint-disable-next-line
                const infoMarker: any = new google.maps.InfoWindow({
                  content: infoContent,
                });
                actualMarker.current?.close();
                actualMarker.current = infoMarker;
                infoMarker.open({
                  anchor: marker,
                  map,
                  shouldFocus: true,
                });

                map?.addListener('zoom_changed', () => {
                  actualMarker.current?.close();
                });

                map?.addListener('click', () => {
                  actualMarker.current?.close();
                });

                google.maps.event.addListener(
                  infoMarker,
                  'domready',
                  function () {
                    const element = document.getElementById('redirectToDetail');
                    if (element) {
                      element.addEventListener('click', () =>
                        navigate(
                          `/monitoring/devices/device-detail/${device.tnsDeviceName}`
                        )
                      );
                    }
                  }
                );
              } catch (e) {
                console.error(e);
              }
            });
            if (markerSpiderfier) {
              markerSpiderfier?.addMarker(marker, () => 1);
            }
            markers.push(marker);
          }
        });
        return markers;
      }
    }, [geolocations, markerSpiderfier, navigate, map, isDeviceGroup]);

    useEffect(() => {
      const markers = asignedMarkers();
      markerClusterer.addMarkers(markers ?? []);
      markerClusterer.setMap(map ?? null);
      markerClustererRef.current = markerClusterer;

      const handleMutation = (): void => {
        collectElementsWithTitle();
      };

      const observer = new MutationObserver(handleMutation);
      observerRef.current = observer;

      // Observe the target node for mutations
      const mapContainer = map?.getDiv();
      if (mapContainer) {
        observer.observe(mapContainer, { childList: true, subtree: true });
      }

      return (): void => {
        observerRef.current?.disconnect();
        markerClusterer.setMap(null);
        markerClusterer.clearMarkers();
        markerSpiderfier?.removeAllMarkers();
      };
    }, [
      geolocations,
      map,
      markerClusterer,
      asignedMarkers,
      markerSpiderfier,
      collectElementsWithTitle,
    ]);

    return null;
  }
);
