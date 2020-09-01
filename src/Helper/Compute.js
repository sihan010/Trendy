import {Dimensions} from 'react-native';

const generateRandomPoints = (center, radius, count) => {
  var points = [];
  for (var i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
};

const generateRandomPoint = (center, radius) => {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  // Resulting point.
  return {lat: y + y0, lng: xp + x0};
};

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const regionBuilder = (lat, lng, northeastLat, southwestLat) => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;

  const latDelta = northeastLat - southwestLat;
  const lngDelta = latDelta * ASPECT_RATIO;

  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  };

  return region;
};

const colorSelector = (count) => {
  if (count == null) return 'rgba(235, 245, 251,0.6)';
  else if (count < 10000) return 'rgba(52, 152, 219,0.6)';
  else if (count >= 10000 && count < 50000) return 'rgba(46, 204, 113,0.6)';
  else if (count >= 50000 && count < 100000) return 'rgba(230, 126, 34,0.6)';
  else if (count >= 100000 && count < 120000) return 'rgba(211, 84, 0,0.6)';
  else if (count >= 120000 && count < 150000) return 'rgba(192, 57, 43,0.6)';
  else if (count >= 150000 && count < 170000) return 'rgba(248, 196, 113,0.6)';
  else if (count >= 170000 && count < 200000) return 'rgba(118, 215, 196,0.6)';
  else if (count >= 200000 && count < 250000) return 'rgba(249, 231, 159,0.6)';
  else if (count >= 250000 && count < 300000) return 'rgba(26, 188, 156,0.6)';
  else if (count >= 300000 && count < 350000) return 'rgba(155, 89, 182,0.6)';
  else if (count >= 350000 && count < 400000) return 'rgba(241, 148, 138,0.6)';
  else return 'rgba(33, 47, 60,0.6)';
};

export {
  generateRandomPoints,
  getDistanceFromLatLonInKm,
  regionBuilder,
  colorSelector,
};

// Generates 100 points that is in a 1km radius from the given lat and lng point.
