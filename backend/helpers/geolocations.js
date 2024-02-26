module.exports = {
  getGeolocations(devices) {
    const geolocations = [];
    devices.forEach((device) => {
      geolocations.push({
        connectivityStatus: device.connectivityStatus,
        tnsDeviceName: device.tnsDeviceName,
        latitude: String(Math.random() * (87 - 20) + 1),
        longitude: String(Math.random() * (100 - 20) + 1)
      });
    });

    return geolocations;
  },

  getGeolocationsByParams(geolocations, devices) {
    const locations = new Set();
    devices.filter((device) => {
      const geolocation = geolocations.find((geolocation) => geolocation.tnsDeviceName === device.tnsDeviceName);
      if (geolocation) {
        locations.add(geolocation);
      }
    });
    return locations;
  }
};
