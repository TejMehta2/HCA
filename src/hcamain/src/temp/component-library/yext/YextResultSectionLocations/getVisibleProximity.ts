const getVisibleProximity = (map: google.maps.Map) => {
  // http://stackoverflow.com/questions/3525670/radius-of-viewable-region-in-google-maps-v3
  // Get Gmap radius / proximity start
  // First, determine the map bounds
  const bounds = map.getBounds();
  if (!bounds) return;
  // Then the points
  const swPoint = bounds.getSouthWest();
  const nePoint = bounds.getNorthEast();
  const proximityMeter = google.maps.geometry.spherical.computeDistanceBetween(
    swPoint,
    nePoint
  );
  return proximityMeter;
};

export default getVisibleProximity;
