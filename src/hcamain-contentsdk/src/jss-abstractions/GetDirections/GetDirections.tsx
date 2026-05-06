import { Coordinate } from '@component-library/types/yext/healthcare_facilities';

const returnDirections = (
  googlePlaceId: string,
  directions: string,
  geocodedCoordinate: Coordinate
) => {
  let directionsLink;
  if (googlePlaceId) {
    directionsLink = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;
  } else if (directions) {
    directionsLink = directions;
  } else if (geocodedCoordinate?.latitude && geocodedCoordinate.longitude) {
    directionsLink = `https://maps.google.com/?q=${geocodedCoordinate?.latitude},${geocodedCoordinate?.longitude}`;
  }

  return directionsLink;
};

export default returnDirections;
