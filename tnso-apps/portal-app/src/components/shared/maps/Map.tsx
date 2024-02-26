import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { stylers } from './stylers';
import { MapContextContext } from '../../../contexts/map/MapContext';
import { Button } from 'react-bootstrap';
import zoom from '../../../assets/images/icons/icon-zoom.png';
import { GeolocationResponse } from '../../../interfaces/devices/response/response';
import { TRANSLATION } from '../../../utils/const/translation';
import i18n from 'i18n-module/i18n';

interface MapProps extends google.maps.MapOptions {
  style?: { [key: string]: string };
  children: ReactNode;
  deviceLocation?: GeolocationResponse;
}

const reactCloneElement = cloneElement as <P extends object>(
  element: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactPortal,
  props?: P,
  ...children: ReactNode[]
) => JSX.Element;

export const Map: React.FC<MapProps> = ({
  style,
  children,
  deviceLocation,
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const mapContext = useContext(MapContextContext);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const buttonHide = deviceLocation ? 'd-none' : '';

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: mapContext.mapCenter,
          zoom: mapContext.mapZoom,
          disableDefaultUI: true,
          zoomControl: true,
          minZoom: 2,
          maxZoom: 20,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
          },
          styles: stylers,
          // eslint-disable-next-line
        } as any)
      );
      if (map) {
        mapContext.setMapData(map);
      }
    }
    return () => {
      if (map) {
        setMap(null);
      }
    };
  }, [mapContext, ref, map, deviceLocation]);

  const resetZoomAndCenter = useCallback((): void => {
    if (map) {
      map.setZoom(2);
      map.setCenter({ lat: 0, lng: 0 });
    }
  }, [map]);

  useEffect(() => {
    resetZoomAndCenter();
    // eslint-disable-next-line
  }, [map, mapContext.mapCenter, mapContext.mapZoom]);

  useEffect(() => {
    if (deviceLocation && map) {
      map.setCenter({
        lat: Number(deviceLocation.latitude),
        lng: Number(deviceLocation.longitude),
      });
      map.setZoom(19);
    }
  }, [deviceLocation, map]);

  return (
    <div className="position-relative" data-testid="maps-component">
      <div className={`btn-reset-map ${buttonHide}`}>
        <Button
          variant="secondary"
          onClick={resetZoomAndCenter}
          size="sm"
          title={i18n.t(TRANSLATION.TOOLTIP.resetZoomAndCenterMap)}
        >
          <img src={zoom} alt="zoom" />
        </Button>
      </div>
      <div ref={ref} style={style} id="map" className="rounded-top">
        {Children.map(children, (child: ReactNode) => {
          if (isValidElement(child)) {
            return reactCloneElement(child, { map });
          }
        })}
      </div>
    </div>
  );
};
