import React, { useCallback, useEffect, useRef, useState, type JSX } from 'react';
import { YextResultSectionLocationsProps } from './YextResultSectionLocations.types';
import styles from './YextResultSectionLocations.module.scss';
import YextCustomMap from '../YextCustomMap/YextCustomMap';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Icons from '../../foundation/Icons/Icons';
import useSetVertical from '../helpers/useSetVertical';
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from '@yext/search-headless-react';
import { verticalConfigMap } from '../YextSearch/verticalConfigMap';
import { AlternativeVerticals } from '../YextCustomAlternativeVerticals/YextCustomAlternativeVerticals';
import Checkbox from '../../core-components/form/basic/Checkbox/Checkbox';
import getVisibleProximity from './getVisibleProximity';

const YextResultSectionLocations = (
  props: YextResultSectionLocationsProps
): JSX.Element => {
  const {
    center: initialCenter,
    locations = [],
    apiKey,
    variation = 'stacked',
    title,
  } = props;
  const setVertical = useSetVertical();
  const searchActions = useSearchActions();
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>();
  const searchState = useSearchState((state) => state);
  const [searchOnMove, setSearchOnMove] = useState(true);
  const [userHasMovedMap, setUserHasMovedMap] = useState(false);

  const [center] = useState(initialCenter);
  const [markers, setMarkers] = useState<
    {
      marker: google.maps.Marker;
      activeIcon: string;
      inactiveIcon: string;
    }[]
  >([]);

  const mapRef = useRef<google.maps.Map>(null);
  const markerRef = useRef<
    { marker: google.maps.Marker; activeIcon: string; inactiveIcon: string }[]
  >([]);

  // When locations change: set markers
  // i.e. map moves OR search made
  useEffect(() => {
    const getMarkers = () => {
      const getMarker = ({
        id,
        center,
        callback,
      }: {
        id: string;
        center: google.maps.LatLngLiteral;
        callback: () => void;
        selected?: boolean;
      }) => {
        const inactiveIcon = `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 28.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg width='37' height='44' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 37 44' style='enable-background:new 0 0 37 44;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill-rule:evenodd;clip-rule:evenodd;fill:%230C2141;%7D .st1%7Bfill:%23FFFFFF;%7D .st2%7Bfont-family:Mark, arial, helvetica, sans-serif;%7D .st3%7Bfont-size:18px;%7D .st4%7Bfont-weight: 700;%7D%0A%3C/style%3E%3Cpath class='st0' d='M18.5,44c0,0,18.5-12.3,18.5-26.4c0-4.7-2.6-9.1-6-12.4C27.7,1.9,23.2,0,18.5,0S9.3,1.9,6,5.2 c-3.3,3.3-6,7.8-6,12.4C0,30.2,18.5,44,18.5,44z'/%3E%3Ctext transform='matrix(1 0 0 1 13.562 24.9067)' class='st1 st2 st3 st4'%3E${id}%3C/text%3E%3C/svg%3E%0A`;
        const activeIcon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='44' viewBox='0 0 37 44' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.4956 44C18.4956 44 36.9911 31.7345 36.9911 17.6C36.9911 12.9322 34.3458 8.45556 31.0233 5.15492C27.7007 1.85428 23.1944 0 18.4956 0C13.7968 0 9.29044 1.85428 5.9679 5.15492C2.64535 8.45556 0 12.9322 0 17.6C0 30.177 18.4956 44 18.4956 44ZM25.7071 13.7071C26.0976 13.3166 26.0976 12.6834 25.7071 12.2929C25.3166 11.9024 24.6834 11.9024 24.2929 12.2929L15 21.5858L11.7071 18.2929C11.3166 17.9024 10.6834 17.9024 10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L14.2929 23.7071C14.6834 24.0976 15.3166 24.0976 15.7071 23.7071L25.7071 13.7071Z' fill='%230C2141'/%3E%3C/svg%3E`;
        const marker = new window.google.maps.Marker({
          position: center,
          map: mapRef.current,
          icon: inactiveIcon,
        });
        marker.addListener('click', () => {
          callback?.();
        });
        return {
          marker,
          activeIcon: activeIcon,
          inactiveIcon: inactiveIcon,
        };
      };

      const markers = locations?.map((location, index) =>
        getMarker({
          ...location,
          callback: () => {
            const cards = cardsRef?.current?.children;
            const currentCard = cards?.[index];
            currentCard?.scrollIntoView({
              behavior: 'smooth',
            });
            setSelected(location.id);
            const markers = markerRef.current;
            markers?.forEach(
              ({ marker, activeIcon, inactiveIcon }, markerIndex) => {
                if (markerIndex == index) {
                  marker.setIcon(activeIcon);
                } else {
                  marker.setIcon(inactiveIcon);
                }
              }
            );
          },
        })
      );
      return markers;
    };

    // Generate markers
    const markers = getMarkers();

    setMarkers(markers);

    return () => {
      markers.forEach((marker) => {
        marker.marker.setMap(null);
      });
    };
  }, [locations]);

  // Show all current pins after the marker count changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !markers.length) return;
    const bounds = new google.maps.LatLngBounds();
    const positions = [...markers.values()].map((marker) =>
      marker.marker.getPosition()
    );

    positions.forEach((center) => {
      if (center?.lat() && center.lng()) {
        bounds?.extend({
          lat: center?.lat(),
          lng: center?.lng(),
        });
      }
    });
    if (!userHasMovedMap) {
      map.fitBounds(bounds);
    }
  }, [markers, userHasMovedMap]);

  // When map moves, only show pins in the visible area (if checkbox enabled)
  const onMapMovement = useCallback(() => {
    const map = mapRef.current;
    if (!searchOnMove) return;
    if (!map) return;

    const center = map.getCenter();
    const latitude = center?.lat();
    const longitude = center?.lng();
    const proximity = getVisibleProximity(map);
    if (!latitude || !longitude || !proximity) {
      return;
    }

    const filter: SelectableStaticFilter = {
      filter: {
        fieldId: 'builtin.location',
        value: {
          lat: latitude,
          lng: longitude,
          radius: proximity * 0.4,
        },
        kind: 'fieldValue',
        matcher: Matcher.Near,
      },
      selected: true,
      displayName: 'builtin.location',
    };
    setUserHasMovedMap(true);
    if (searchState?.vertical?.verticalKey) {
      searchActions.setStaticFilters([]);
      searchActions.setFilterOption(filter);
      searchActions.setOffset(0);
      searchActions.executeVerticalQuery();
    }
  }, [searchActions, searchOnMove, searchState?.vertical?.verticalKey]);

  // When input or page changes, remove the filter option
  useEffect(() => {
    setUserHasMovedMap(false);
    searchActions.setStaticFilters([]);
  }, [
    searchActions,
    searchState.query.input,
    searchState.vertical.offset,
    searchState.vertical.verticalKey,
  ]);

  // When move moves, do a search
  const initMap = useCallback(
    (map: google.maps.Map) => {
      map.addListener('dragend', onMapMovement);
      if (!searchOnMove) {
        map.addListener('zoom_changed', onMapMovement);
      }
    },

    [onMapMovement, searchOnMove]
  );

  return (
    <div className={[styles.wrapper, styles[variation]].join(' ')}>
      {title && variation === 'stacked' && (
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
          {locations.length === 0 && (
            <>
              <AlternativeVerticals
                currentVerticalLabel={'Locations'}
                verticalConfigMap={verticalConfigMap}
                displayAllOnNoResults={false}
              />
            </>
          )}
          {!!locations?.length && variation === 'side-by-side' && (
            <Checkbox
              label={'Search when map moves'}
              name={'search-on-move'}
              value={'search-on-move'}
              checked={searchOnMove}
              onChange={() => {
                if (searchOnMove) {
                  searchActions.setStaticFilters([]);
                  searchState?.vertical?.verticalKey
                    ? searchActions.executeVerticalQuery()
                    : searchActions.executeUniversalQuery();
                }
                setSearchOnMove(!searchOnMove);
              }}
              id={'search-on-move'}
            />
          )}
        </div>
        <div className={styles['map-column']}>
          <div className={styles.map}>
            <YextCustomMap
              ref={mapRef}
              apiKey={apiKey}
              center={center as google.maps.LatLngLiteral}
              callback={initMap}
            />
          </div>
        </div>
      </div>
      {variation === 'stacked' && (
        <TextButton>
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
              setTimeout(() => {
                setVertical('healthcare_facilities');
              }, 1000);
            }}
          >
            <span>View all</span>
            <Icons iconName={'iconArrowRight'} />
          </button>
        </TextButton>
      )}
    </div>
  );
};

export default YextResultSectionLocations;
