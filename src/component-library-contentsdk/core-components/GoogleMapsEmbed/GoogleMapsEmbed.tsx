import React, {
  MutableRefObject,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type JSX,
} from 'react';
import { GoogleMapsEmbedProps } from './GoogleMapsEmbed.types';
import styles from './GoogleMapsEmbed.module.scss';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapElement = (
  props: GoogleMapsEmbedProps,
  mapRef: MutableRefObject<google.maps.Map>
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = new window.google.maps.Map(ref?.current, {
      ...props,
    });
    window.google.maps.importLibrary('geometry');
    map.addListener('bounds_changed', function () {
      const zoom = map.getZoom();
      if (typeof zoom !== 'number') return;
      if (zoom <= 15) return;
      map.setZoom(15);
    });
    if (mapRef) {
      mapRef.current = map;
    }

    props.callback?.(map);
  }, [mapRef, props, ref]);
  return <div ref={ref} className={styles.map} />;
};

const MapElementWithRef = forwardRef(MapElement);

const GoogleMapsEmbed = (
  props: GoogleMapsEmbedProps,
  ref: MutableRefObject<google.maps.Map>
): JSX.Element => {
  // Memoise map without selected state as dependency
  const memo = useMemo(
    () => <MapElementWithRef {...props} ref={ref} />,
    [props, ref]
  );

  return <Wrapper apiKey={props.apiKey}>{memo}</Wrapper>;
};

export default forwardRef(GoogleMapsEmbed);
