import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MarkerMap,
  YextResultSectionLocationsProps,
} from './YextResultSectionLocations.types';
import styles from './YextResultSectionLocations.module.scss';
import YextCustomMap from '../YextCustomMap/YextCustomMap';
import Text from '../../foundation/Text/Text';

const YextResultSectionLocations = (
  props: YextResultSectionLocationsProps
): JSX.Element => {
  const {
    center,
    locations = [],
    apiKey,
    variation = 'stacked',
    title,
  } = props;

  const cardsRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>();

  const markersMapRef = useRef<MarkerMap>(new Map());

  // Sync selected location state to markers
  useEffect(() => {
    const markerMap = markersMapRef.current;
    Array.from(markerMap.entries()).forEach(([id, markerSet]) => {
      if (id == selected) {
        markerSet.active.setVisible(true);
        markerSet.inactive.setVisible(false);
      } else {
        markerSet.active.setVisible(false);
        markerSet.inactive.setVisible(true);
      }
    });
  }, [selected]);

  // Memoise map without selected state as dependency
  const yextCustomMapMemo = useMemo(
    () => (
      <YextCustomMap
        ref={markersMapRef}
        apiKey={apiKey}
        center={center}
        locations={locations.map((location, index) => ({
          ...location,
          callback: () => {
            const cards = cardsRef?.current?.children;
            const currentCard = cards?.[index];
            currentCard?.scrollIntoView({
              behavior: 'smooth',
            });
            setSelected(location.id);
          },
        }))}
      />
    ),
    [apiKey, center, locations]
  );

  return (
    <div className={[styles.wrapper, styles[variation]].join(' ')}>
      {title && (
        <Text tag={'h2'} variation={'heading-1'}>
          {title}
        </Text>
      )}
      <div className={styles.grid}>
        <div ref={cardsRef} className={styles.cards}>
          {locations.map(({ card, id }) => (
            <div
              key={id}
              className={[
                styles.card,
                id === selected ? styles.selected : '',
              ].join(' ')}
            >
              {card}
            </div>
          ))}
        </div>
        <div className={styles['map-column']}>
          <div className={styles.map}>{yextCustomMapMemo}</div>
        </div>
      </div>
    </div>
  );
};

export default YextResultSectionLocations;
