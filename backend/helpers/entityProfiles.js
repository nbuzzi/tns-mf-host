"use strict";
const entityProfilesdata = require("../jsons/entityProfiles/entityProfiles.json");
const entityProfiles = require("../jsons/entityProfiles/entityProfilesApi.json");

module.exports = {
  getAllProfiles() {
    return entityProfiles.map((profile) => ({
      name: profile.name,
      userCount: profile.userCount,
      canBeDeleted: profile.canBeDeleted,
      devices: profile.devices,
    }));
  },

  getAllProfileNames() {
    return entityProfilesdata.map((profile) => profile.name);
  },

  checkProfileNameAvailability(entityProfileName) {
    const isAvailable = !entityProfilesdata.some(
      (profile) => profile.name === entityProfileName
    );
    return { available: isAvailable };
  },

  getAvailableDevicesByProfileName(
    entityProfileName,
    deviceName,
    recordsPerPage = 100,
    startAtRecord = 0
  ) {
    const entityProfile = entityProfilesdata.find(
      (profile) => profile.name === entityProfileName
    );
    if (!entityProfile) {
      throw new Error("Entity profile not found");
    }

    let availableDevices = [];
    if (deviceName) {
      availableDevices = entityProfile.availableDevices.filter((device) =>
        device.startsWith(deviceName)
      );
    } else {
      availableDevices = entityProfile.availableDevices;
    }

    const startIndex = Math.max(startAtRecord, 0);
    const endIndex = Math.min(
      startIndex + recordsPerPage,
      availableDevices.length
    );
    const paginatedDevices = availableDevices.slice(startIndex, endIndex);

    return {
      totalRecords: availableDevices.length,
      returnedRecords: paginatedDevices.length,
      devices: paginatedDevices,
    };
  },

  getAvailableAcnasByProfileName(
    entityProfileName,
    acna,
    recordsPerPage = 100,
    startAtRecord = 0
  ) {
    const entityProfile = entityProfilesdata.find(
      (profile) => profile.name === entityProfileName
    );
    if (!entityProfile) {
      throw new Error("Entity profile not found");
    }

    let filteredDevices = [];
    if (acna) {
      filteredDevices = entityProfile.availableDevices.filter((device) =>
        device.startsWith(acna)
      );
    } else {
      filteredDevices = entityProfile.availableDevices;
    }

    const acnas = {};
    filteredDevices.forEach((device) => {
      const acna = device.substring(0, 4);
      if (!acnas[acna]) {
        acnas[acna] = [];
      }
      acnas[acna].push(device);
    });

    const startIndex = Math.max(startAtRecord, 0);
    const endIndex = Math.min(
      startIndex + recordsPerPage,
      Object.keys(acnas).length
    );
    const paginatedAcnas = {};
    Object.keys(acnas)
      .slice(startIndex, endIndex)
      .forEach((key) => {
        paginatedAcnas[key] = acnas[key];
      });

    return {
      totalRecords: Object.keys(acnas).length,
      returnedRecords: Object.keys(paginatedAcnas).length,
      acnas: paginatedAcnas,
    };
  },

  getAvailableCountriesByProfileName(entityProfileName, country, recordsPerPage = 100, startAtRecord = 0) {
    const entityProfile = entityProfilesdata.find(profile => profile.name === entityProfileName);
    if (!entityProfile) {
      throw new Error("Entity profile not found");
    }

    let filteredDevices = [];
    if (country) {
      filteredDevices = entityProfile.availableDevices.filter(device => device.endsWith(country));
    } else {
      filteredDevices = entityProfile.availableDevices;
    }

    const countries = {};
    filteredDevices.forEach(device => {
      const country = device.substring(device.length - 3);
      if (!countries[country]) {
        countries[country] = [];
      }
      countries[country].push(device);
    });

    const startIndex = Math.max(startAtRecord, 0);
    const endIndex = Math.min(startIndex + recordsPerPage, Object.keys(countries).length);
    const paginatedCountries = {};
    Object.keys(countries).slice(startIndex, endIndex).forEach(key => {
      paginatedCountries[key] = countries[key];
    });

    return {
      totalRecords: Object.keys(countries).length,
      returnedRecords: Object.keys(paginatedCountries).length,
      countries: paginatedCountries
    };
  },

  getAvailableStatesByProfileName(entityProfileName, state, recordsPerPage = 100, startAtRecord = 0) {
    const entityProfile = entityProfilesdata.find(profile => profile.name === entityProfileName);
    if (!entityProfile) {
      throw new Error("Entity profile not found");
    }

    let filteredDevices = [];
    if (state) {
      filteredDevices = entityProfile.availableDevices.filter(device => device.includes(state));
    } else {
      filteredDevices = entityProfile.availableDevices;
    }

    const states = {};
    filteredDevices.forEach(device => {
      const state = device.split("_")[1];
      if (!states[state]) {
        states[state] = [];
      }
      states[state].push(device);
    });

    const startIndex = Math.max(startAtRecord, 0);
    const endIndex = Math.min(startIndex + recordsPerPage, Object.keys(states).length);
    const paginatedStates = {};
    Object.keys(states).slice(startIndex, endIndex).forEach(key => {
      paginatedStates[key] = states[key];
    });

    return {
      totalRecords: Object.keys(states).length,
      returnedRecords: Object.keys(paginatedStates).length,
      states: paginatedStates
    };
  },

  getAvailableCitiesByProfileName(entityProfileName, city, recordsPerPage = 100, startAtRecord = 0) {
    const entityProfile = entityProfilesdata.find(profile => profile.name === entityProfileName);
    if (!entityProfile) {
      throw new Error("Entity profile not found");
    }

    let filteredDevices = [];
    if (city) {
      filteredDevices = entityProfile.availableDevices.filter(device => device.includes(city));
    } else {
      filteredDevices = entityProfile.availableDevices;
    }

    const cities = {};
    filteredDevices.forEach(device => {
      const city = device.split("_")[2];
      if (!cities[city]) {
        cities[city] = [];
      }
      cities[city].push(device);
    });

    const startIndex = Math.max(startAtRecord, 0);
    const endIndex = Math.min(startIndex + recordsPerPage, Object.keys(cities).length);
    const paginatedCities = {};
    Object.keys(cities).slice(startIndex, endIndex).forEach(key => {
      paginatedCities[key] = cities[key];
    });

    return {
      totalRecords: Object.keys(cities).length,
      returnedRecords: Object.keys(paginatedCities).length,
      cities: paginatedCities
    };
  },

  getAssociatedDevicesByProfileName(entityProfileName, deviceName, recordsPerPage = 100, startAtRecord = 0) {
    const entityProfile = entityProfilesdata.find(profile => profile.name === entityProfileName);
    if (!entityProfile) {
      throw new Error("Entity profile not found");
    }

    let filteredDevices = [];
    if (deviceName) {
      filteredDevices = entityProfile.associatedDevices.filter(device => device.includes(deviceName));
    } else {
      filteredDevices = entityProfile.associatedDevices;
    }

    const startIndex = Math.max(startAtRecord, 0);
    const endIndex = Math.min(startIndex + recordsPerPage, filteredDevices.length);
    const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

    return {
      totalRecords: filteredDevices.length,
      returnedRecords: paginatedDevices.length,
      devices: paginatedDevices
    };
  },

  deleteProfile(entityProfileName) {
    const index = entityProfilesdata.findIndex(
      (profile) => profile.name === entityProfileName
    );
    if (index !== -1) {
      entityProfilesdata.splice(index, 1);
    } else {
      throw new Error("Profile not found");
    }
  },
  createProfile(newProfileData) {
    return new Promise((resolve, reject) => {
      const existingProfile = entityProfilesdata.find(
        (profile) => profile.name === newProfileData.name
      );
      if (existingProfile) {
        return reject(new Error("Profile with the same name already exists"));
      }
      entityProfilesdata.push(newProfileData);
      resolve();
    });
  },

  updateProfile(entityProfileName, updatedProfileData) {
    return new Promise((resolve, reject) => {
      const profile = entityProfilesdata.find(
        (profile) => profile.name === entityProfileName
      );
      if (!profile) {
        return reject(new Error("Profile not found"));
      }
      Object.assign(profile, updatedProfileData);

      resolve(profile);
    });
  },
};
