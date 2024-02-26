'use strict';
const geolocations = require('../jsons/geolocation/geolocation.json');

module.exports = {
  getDevicesByParams(filters, devices) {
    const allDevices = devices.map((device) => {
      const location = geolocations.filter(
        (geolocation) => geolocation.tnsDeviceName === device.tnsDeviceName
      );
      if (location) {
        return {
          ...device,
          hasGeolocation:
            !location[0].latitude || !location[0].longitude ? false : true,
        };
      }
      return { ...device, hasGeolocation: 'No' };
    });
    let newDevices = [...allDevices];
    let totalNewDevices = 0;

    const filtersKey = filters.map((filter) => filter[0]);
    const isTherePagination = filtersKey.some(
      (key) =>
        key === 'startAtRecord' || key === 'recordsPerPage' || key === 'sortBy'
    );

    filters.map((filter) => {
      if (
        filter[0] !== 'startAtRecord' &&
        filter[0] !== 'sortBy' &&
        filter[0] !== 'recordsPerPage' &&
        filter[1] !== ''
      ) {
        const valuesArray = filter[1].split(',');
        let filterKey = '';

        // filterKey name
        if (filter[0] === 'acnas') {
          filterKey = 'acna';
        } else if (filter[0] === 'countries') {
          filterKey = 'country';
        } else {
          filterKey = filter[0];
        }
        // filtering by each received key
        if (filterKey !== 'hasGeolocation') {
          if (valuesArray.length === 1) {
            const result = newDevices.filter((device) =>
              filter[1].match(new RegExp('^' + device[filterKey] + '$'))
            );
            newDevices = result;
          } else {
            let array = [];
            valuesArray.map((value) => {
              const result = newDevices.filter((device) =>
                value
                  .toLowerCase()
                  .match(
                    new RegExp('^' + device[filterKey].toLowerCase() + '$')
                  )
              );
              array = [...array, ...result];
            });
            newDevices = array;
          }
        } else {
          newDevices = newDevices.filter(
            (device) => device[filterKey].toString() === filter[1]
          );
        }
      }
      totalNewDevices = newDevices.length;
    });

    if (isTherePagination) {
      filters.forEach((filter) => {
        if (filter[0] === 'startAtRecord') {
          newDevices = newDevices.slice(filter[1]);
        } else if (filter[0] === 'recordsPerPage') {
          newDevices = newDevices.slice(0, filter[1]);
        } else if (filter[0] === 'sortBy') {
          newDevices = newDevices.sort((a, b) => {
            if (a[filter[1]] < b[filter[1]]) {
              return -1;
            }
            if (a[filter[1]] > b[filter[1]]) {
              return 1;
            }
            return 0;
          });
        }
      });
    } else {
      devices.forEach((device) => {
        let filterAmount = 0;
        filters.forEach((filter) => {
          if (device[filter[0]] === filter[1] || filter[1] === '') {
            filterAmount++;
          }
        });
        if (filterAmount === filters.length) {
          newDevices.push(device);
        }
      });
    }

    return [newDevices, totalNewDevices];
  },

  getStatuses(devices, filters) {
    const statuses = {};
    const allDevices = devices.map((device) => {
      const location = geolocations.filter(
        (geolocation) => geolocation.tnsDeviceName === device.tnsDeviceName
      );
      if (location) {
        return {
          ...device,
          hasGeolocation:
            !location[0].latitude || !location[0].longitude ? false : true,
        };
      }
      return { ...device, hasGeolocation: 'No' };
    });

    let newDevices = [...allDevices];

    filters?.map((filter) => {
      if (filter[1] !== '') {
        const valuesArray = filter[1].split(',');
        let filterKey = '';

        // filterKey name
        if (filter[0] === 'acnas') {
          filterKey = 'acna';
        } else if (filter[0] === 'countries') {
          filterKey = 'country';
        } else {
          filterKey = filter[0];
        }
        // filtering by each received key
        if (filterKey !== 'hasGeolocation') {
          if (valuesArray.length === 1) {
            const result = newDevices.filter((device) =>
              filter[1]
                .match(new RegExp('^' + device[filterKey] + '$'))
            );
            newDevices = result;
          } else {
            let array = [];
            valuesArray.map((value) => {
              const result = newDevices.filter((device) =>
                value
                  .toLowerCase()
                  .match(
                    new RegExp('^' + device[filterKey].toLowerCase() + '$')
                  )
              );
              array = [...array, ...result];
            });
            newDevices = array;
          }
        } else {
          console.log('filterKey', filterKey);
          console.log('filter[1]', filter[1]);
          newDevices = newDevices.filter(
            (device) => device[filterKey].toString() === filter[1]
          );
        }
      }
    });

    newDevices.forEach((device) => {
      // const status = device.status.replace(" ", "")
      const status = device.connectivityStatus;
      statuses[status] = statuses[status] ? statuses[status] + 1 : 1;
    });
    return statuses;
  },
};
