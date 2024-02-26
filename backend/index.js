const jsonServer = require('json-server');
const server = jsonServer.create();
const mockedData = require('./mocked');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const YAML = require('yamljs');
const cors = require('cors');

//Helpers
const deviceHelper = require('./helpers/devices');
const groupHelper = require('./helpers/groups');
const authHelper = require('./helpers/auth');
const geolocationHelper = require('./helpers/geolocations');
const companyProfilesHelper = require('./helpers/companyProfiles');
const membersHelper = require('./helpers/members');
const changeTicketsHelper = require('./helpers/changeTickets');
const entityProfilesHelper = require('./helpers/entityProfiles');

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const portalPathBase = '/v1/portalapi';
const authPrefix = `${portalPathBase}/authenticate`;
const userRolePrefix = `${portalPathBase}/roles`;
const apiPrefix = `${portalPathBase}/devices`;
const userPrefix = `${portalPathBase}/users`;
const apiCompanyPrefix = `${portalPathBase}/companyprofiles`;
const apiACNAPrefix = `${portalPathBase}/acnas`;
const CHANGE_TICKETS_PREFIX = `${portalPathBase}/changetickets`;
const MEMBER_PREFIX = `${portalPathBase}/members`;
const apiEntityPrefix = `${portalPathBase}/entityprofiles`;

//-------------------------------------------- Authenticate route
const authRoute = require('./routes/authenticate');
const userRoleRoute = require('./routes/role');
const userRoute = require('./routes/user');
app.use(authPrefix, authRoute);
app.use(userRolePrefix, userRoleRoute);
app.use(userPrefix, userRoute);

//--------------------------------------------
// Get all devices
app.get(apiPrefix, async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);
  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }

  let devicesResponse = mockedData.devices;
  const filters = Object.entries(req.query).filter(
    (item) => item || item[1] !== ''
  );
  if (filters && filters.length > 0) {
    const devices = deviceHelper.getDevicesByParams(
      filters,
      devicesResponse.devices
    );
    devicesResponse = {
      ...devicesResponse,
      totalRecords: devices[1],
      returnedRecords: devices[0].length,
      devices: devices[0],
    };
  }
  res.jsonp(devicesResponse);
});

app.get(`${apiPrefix}/count/connectivityStatus`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);
  let response;
  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }

  if (req.query) {
    const filters = Object.entries(req.query).filter(
      (item) => item || item[1] !== ''
    );
    response = deviceHelper.getStatuses(mockedData.devices.devices, filters);
  } else {
    response = deviceHelper.getStatuses(mockedData.devices.devices);
  }

  res.jsonp(response);
});

//Get all devices locations
app.get(`${apiPrefix}/geolocation`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);
  let geolocations = mockedData.geolocation;
  let devices;
  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const filters = Object.entries(req.query).filter(
    (item) => item || item[1] !== ''
  );
  if (filters && filters.length > 0) {
    devices = deviceHelper.getDevicesByParams(
      filters,
      mockedData.devices.devices
    );
    geolocations = [
      ...geolocationHelper.getGeolocationsByParams(geolocations, devices[0]),
    ];
  }
  res.jsonp(geolocations);
});

app.get(`${apiPrefix}/count/nogeolocation`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);
  const geolocations = mockedData.geolocation.filter(
    (location) => !location.latitude || !location.longitude
  );

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }

  res.jsonp({ count: geolocations.length });
});

//Get all devices locations
app.post(`${apiPrefix}/locations`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const geolocation = req.body;
  mockedData.devices.devices = mockedData.devices.devices.filter(
    (device) => device.acna !== geolocation.acna
  );
  mockedData.devicesLocation.push(geolocation);
  res.jsonp(geolocation);
});

// Get all devices location by group id
app.get(`${apiPrefix}/locations/group/:id`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const groupId = req.params.id;
  let devices = mockedData.devicesLocation.filter(
    (device) => device.groupId === groupId
  );

  if (req.query.configurationDevice) {
    devices = mockedData.devicesLocation.filter(
      (device) =>
        device.groupId === groupId &&
        device.configuration === req.query.configurationDevice
    );
  } else if (req.query.statusDevice) {
    devices = mockedData.devicesLocation.filter(
      (device) =>
        device.groupId === groupId &&
        device.statusDevice === req.query.statusDevice
    );
  } else if (req.query.configurationDevice && req.query.statusDevice) {
    devices = mockedData.devicesLocation.filter(
      (device) =>
        (device.groupId === groupId &&
          device.configuration === req.query.configurationDevice) ||
        device.statusDevice === req.query.statusDevice
    );
  }
  res.jsonp(devices);
});

//Get all devices groups
app.get(`${apiPrefix}/groups/members`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const mockedGroups = mockedData.devicesGroups;
  // const filter = Object.keys(req.query).find((key) => key);
  const groups = groupHelper.getGroupsByFilter(
    mockedGroups,
    mockedData.devices
  );

  res.jsonp(groups);
  // console.log(mockedGroups);

  // res.jsonp(mockedGroups);
});

/** TODO borrar este endpoint?? */
//Get all devices groups by member name
app.get(`${apiPrefix}/groups/member/:name`, async (req, res) => {
  const memeberName = req.params.name;
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }

  const filteredLocaitions = mockedData.devicesLocation.filter((device) => {
    return device.groupName === memeberName;
  });

  res.jsonp(filteredLocaitions);
});

/** TODO borrar este endpoint?? */
//Get all devices groups by parent id
app.get(`${apiPrefix}/groups/parent/:id`, async (req, res) => {
  const parentId = req.params.id;
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const groups = mockedData.devicesGroups.filter((group) => {
    if (group.parentId === parentId) {
      mockedData.devicesLocation.forEach((device) => {
        if (device.groupId === group.id) {
        }
      });
      return group;
    }
  });
  res.jsonp(groups);
});

// Get all diferents technologies
app.get(`${apiPrefix}/technologies`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  res.jsonp(mockedData.technologies);
});

// Get an specific device by deviceName
app.get(`${apiPrefix}/:tnsDeviceName`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { tnsDeviceName } = req.params;
  let deviceDetail = mockedData.devicesWithName.deviceDetail;

  const device = mockedData.devices.devices.find((device) => {
    return (
      device.tnsDeviceName === tnsDeviceName ||
      device.customerDeviceName === tnsDeviceName
    );
  });
  if (!device) {
    deviceDetail = mockedData.geolocation.find((device) => {
      deviceDetail = device.tnsName === tnsDeviceName;
    });
  }
  if (device) {
    deviceDetail = {
      ...deviceDetail,
      tnsDeviceName: device.tnsDeviceName ?? deviceDetail.tnsDeviceName,
      customerDeviceName:
        device.customerDeviceName ?? deviceDetail.customerDeviceName,
      acna: device.acna ?? deviceDetail.acna,
      knownAs: device.acna ?? deviceDetail.knownAs,
      connectivityStatus:
        device.connectivityStatus ?? deviceDetail.connectivityStatus,
      operationalStatus:
        device.operationalStatus ?? deviceDetail.operationalStatus,
      companyName: device.companyName ?? deviceDetail.companyName,
      country: device.country ?? deviceDetail.country,
    };
  }
  res.jsonp(deviceDetail);
});

// Get an specific location by deviceName
app.get(`${apiPrefix}/:deviceName/locations`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const geolocation = mockedData.devicesWithName.locations.find(
    (device) =>
      device.tnsDeviceName === deviceName ||
      device.customerDeviceName === deviceName
  );
  res.jsonp(geolocation);
});

// Get an specific signal by deviceName
app.get(`${apiPrefix}/:deviceName/normalizedSignal/daily`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const { startDate } = req.body;
  const signalData =
    mockedData.devicesWithSignal.normalizedSignal.historical.map((signal) => {
      return {
        ...signal,
        high: Math.ceil(Math.random() * (100 - 60) + 60),
        low: Math.ceil(Math.random() * (60 - 10) + 10),
      };
    });
  const signal = {
    ...mockedData.devicesWithSignal.normalizedSignal,
    historical: signalData,
  };
  res.jsonp(signal);
});

// Get an specific signal by deviceName
app.get(
  `${apiPrefix}/:deviceName/normalizedSignal/weekly`,
  async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401);
    }

    const result = await authHelper.jwtVerify(req.headers.authorization);

    if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
      return res.status(401).jsonp({ error: authHelper.badAccessToken });
    }
    const { deviceName } = req.params;
    const { startDate } = req.body;
    const signalData = mockedData.devicesWithSignal.normalizedSignal.historical
      .slice(0, 7)
      .map((signal) => {
        return {
          ...signal,
          high: Math.ceil(Math.random() * (100 - 60) + 60),
          low: Math.ceil(Math.random() * (60 - 10) + 10),
        };
      });
    const signal = {
      ...mockedData.devicesWithSignal.normalizedSignal,
      historical: signalData,
    };
    res.jsonp(signal);
  }
);

// Get an specific signal by deviceName
app.get(`${apiPrefix}/:deviceName/mostRecentSignal`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const { startDate } = req.body;
  const signalData = mockedData.devicesWithSignal.mostRecentSignal;
  const currentTechnology =
    signalData.technologies[Math.ceil(Math.random() * 7)];
  let min = 0;
  let max = 0;

  switch (currentTechnology) {
    case '2G-RSSI':
      min = -120;
      max = -60;
      break;
    case '3G-RSSI':
      min = -120;
      max = -60;
      break;
    case '3G-EC/IO':
      min = -30;
      max = 0;
      break;
    case '3G-RSCP':
      min = -130;
      max = 0;
      break;
    case '4G-RSSI':
      min = -110;
      max = -55;
      break;
    case '4G-RSRP':
      min = -110;
      max = -70;
      break;
    case '4G-RSRQ':
      min = -30;
      max = 0;
      break;
    default:
      min = -10;
      max = 30;
  }

  const signal = {
    technology: currentTechnology,
    current: Math.ceil(Math.random() * (max - min) + min),
  };
  res.jsonp(signal);
});

// Get an specific signal by deviceName
app.get(`${apiPrefix}/:deviceName/tnsSignal/:interval`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName, interval } = req.params;
  const { startDate } = req.body;
  let signalData = mockedData.devicesWithSignal.tnsSignal;
  if (interval === 'daily') {
    signalData = signalData.slice(0, 23);
  } else if (interval === 'weekly') {
    signalData = signalData.slice(0, 7);
  }
  res.jsonp(signalData);
});

// Get an specific signal by deviceName
app.get(`${apiPrefix}/:deviceName/dataReport`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const { startDate, endDate } = req.query;
  let dataReport = mockedData.devicesWithSignal.dataReport;
  if (startDate && endDate) {
    dataReport = {
      ...dataReport,
      dataReport: dataReport.dataReport.filter((data) => {
        return (
          data['recordDate/Time'] >= startDate &&
          data['recordDate/Time'] <= endDate
        );
      }),
    };
    if (dataReport.dataReport.length === 0) {
      dataReport = {
        ...dataReport,
        dataReport: [
          ...dataReport.dataReport,
          {
            'recordDate/Time': '',
            quality: '',
            technology: '',
            value: '',
            indicator: '',
          },
        ],
      };
    }
  }

  // const dataReport = mockedData.devicesWithSignal.dataReport;

  res.jsonp(dataReport);
});

// Get an specific configuration by deviceName
app.get(`${apiPrefix}/:deviceName/configuration`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const configuration = mockedData.devicesWithName.configuration;
  res.jsonp(configuration);
});

// Get an specific LAN configuration
app.get(`${apiPrefix}/:deviceName/LAN`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const LAN = mockedData.devicesWithName.LAN;
  res.jsonp(LAN);
});

// Get an specific software by deviceName
app.get(`${apiPrefix}/:deviceName/software`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const software = mockedData.devicesWithName.software;
  res.jsonp(software);
});

// Get an specific uptime by deviceName
app.get(`${apiPrefix}/:deviceName/uptime/monthly`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const uptime = mockedData.devicesWithUptimeMonth;
  res.jsonp(uptime);
});

// Get an specific uptime by deviceName
app.get(`${apiPrefix}/:deviceName/uptime/daily/:month`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName, month } = req.params;
  const currentMonth = months.find((item) => item === month);
  const uptime = mockedData.devicesWithUptimeDay.map((day) => ({
    ...day,
    month: currentMonth,
  }));
  res.jsonp(uptime);
});

// Get an specific current usage by deviceName
app.get(`${apiPrefix}/:deviceName/usage/current`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const usage = mockedData.devicesWithName.usage.currentUsage;
  res.jsonp(usage);
});

// Get an specific historical usage by deviceName
app.get(`${apiPrefix}/:deviceName/usage/historical`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.params;
  const usage = mockedData.devicesWithName.usage.historicalUsage;
  res.jsonp(usage);
});

// Add a new device in the list
app.post(`${apiPrefix}/device/:deviceName`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.path;
  const {
    tnsName,
    customerName,
    status,
    operationalStatus,
    statusTieBreaker,
    acna,
    service,
    region,
    source,
  } = req.body;

  const newDevice = {
    createTime: new Date().toJSON(),
    updateTime: new Date().toJSON(),
    tnsName,
    customerName,
    status,
    operationalStatus,
    statusTieBreaker,
    acna,
    service,
    region,
    source,
  };

  if (
    tnsName &&
    customerName &&
    status &&
    operationalStatus &&
    statusTieBreaker &&
    acna &&
    service &&
    region !== undefined &&
    source
  ) {
    mockedData.devices.devices.push(newDevice);
    return res.status(200).jsonp(newDevice);
  }
});
// Get an specific device by deviceName
app.get(`${apiPrefix}/:deviceName/interfaces`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.path;
  res.jsonp(mockedData.devicesWithInterfaces);
});

// Get an specific device whith note
app.get(`${apiPrefix}/:deviceName/note`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.path;
  res.jsonp(mockedData.devicesWithNote);
});

//Add new group
app.post(`${apiPrefix}/groups`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const group = req.body;

  if (group) {
    mockedData.devicesGroups.push(group);
    return res.status(200).jsonp(group);
  }
  return res
    .status(500)
    .jsonp({ status: 'error', message: 'Error adding group' });
});

//Update a group or an array of groups
app.put(`${apiPrefix}/groups`, async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).jsonp({ status: 401 });
  }
  const groups = req.body;

  if (!Array.isArray(groups)) {
    const array = mockedData.devicesGroups.map((device) =>
      device.id === groups.id ? groups : device
    );
    mockedData.devicesGroups = array;

    return res
      .status(200)
      .jsonp({ status: 200, data: mockedData.devicesGroups });
  } else if (groups.length) {
    const array = mockedData.devicesGroups.map(
      (group) => groups.find((groups) => group.id === groups.id) || group
    );
    mockedData.devicesGroups = array;

    return res
      .status(200)
      .jsonp({ status: 200, data: mockedData.devicesGroups });
  }

  return res
    .status(400)
    .jsonp({ status: 'error', message: 'Missing required fields' });
});

//Update a group or an array of company profiles
app.get(`${apiCompanyPrefix}`, async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).jsonp({ status: 401 });
  }
  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }

  const filters = Object.entries(req.query).filter(
    (item) => item || item[1] !== ''
  );
  if (filters && filters.length > 0) {
    const companyProfiles = companyProfilesHelper.getCompanyProfilesByParams(
      filters,
      mockedData.companyProfiles.companyProfiles
    );
    const companyProfilesResponse = {
      totalRecords: mockedData.companyProfiles.totalRecords,
      companyProfiles,
      returnedRecords: 10,
    };
    return res.status(200).jsonp(companyProfilesResponse);
  }
  return res.status(200).jsonp(mockedData.companyProfiles);
});

//Update a group or an array of company profiles
app.patch(`${apiCompanyPrefix}/:companyProfileName`, async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).jsonp({ status: 401 });
  }
  const result = await authHelper.jwtVerify(req.headers.authorization);

  const { companyProfileName } = req.path;

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { name } = req.body;

  if (company) {
    const companyProfiles = mockedData.companyProfiles.companyProfiles.map(
      (company) => (company.name === companyProfileName ? { name } : company)
    );
    return res.status(200).jsonp(companyProfiles);
  }
  return res
    .status(500)
    .jsonp({ status: 'error', message: 'Error adding company' });
});

//Create a new company profile
app.post(`${apiCompanyPrefix}`, async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).jsonp({ status: 401 });
  }
  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const company = req.body;

  if (company) {
    mockedData.companyProfiles.companyProfiles.push(company);
    return res.status(200).jsonp(company);
  }
  return res
    .status(500)
    .jsonp({ status: 'error', message: 'Error adding company' });
});

//Get available company profiles
app.get(
  `${apiCompanyPrefix}/:companyProfileName/available`,
  async (req, res) => {
    if (!req.headers.authorization) {
      res.status(401).jsonp({ status: 401 });
    }
    const result = await authHelper.jwtVerify(req.headers.authorization);

    if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
      return res.status(401).jsonp({ error: authHelper.badAccessToken });
    }

    const isAvailable = mockedData.companyProfiles.companyProfiles.find(
      (company) => company.name === req.path.companyProfileName
    );

    return res.status(200).jsonp({ available: isAvailable });
  }
);

// Get all Acnas
app.get(`${apiACNAPrefix}`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }
  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  res.jsonp(mockedData.acnas);
});

// Add a new note on device
app.patch(`${apiPrefix}/:deviceName/note`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.path;
  const { note } = req.body;

  let updateNote = mockedData.devicesWithNote;

  if (note) {
    updateNote = { note };
    mockedData.devicesWithNote = updateNote;
    return res.status(204).jsonp(updateNote);
  }
  return res
    .status(400)
    .jsonp({ status: 'error', message: 'Missing required fields' });
});

// Get an specific device whith LVC
app.get(`${apiPrefix}/:deviceName/lvc`, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }

  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const { deviceName } = req.path;
  res.jsonp(mockedData.devicesWithLvcs);
});

app.put(apiPrefix, async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401);
  }
  const result = await authHelper.jwtVerify(req.headers.authorization);

  if (result === 'ERR_JWT_EXPIRED' || result === 'ERR_JWS_INVALID') {
    return res.status(401).jsonp({ error: authHelper.badAccessToken });
  }
  const acnaFilter = req.query.acnas;
  mockedData.devices.forEach((device) => (device.acna = req.body.acna));
});

// Get an specific device whith entityProfile

app.get(
  `${apiPrefix}/entityprofiles/:entityProfileName/available`,
  async (req, res) => {
    const { entityProfileName } = req.params;
    const { deviceName, recordsPerPage, startAtRecord } = req.query;
    try {
      const devices = entityProfilesHelper.getAvailableDevicesByProfileName(
        entityProfileName,
        deviceName,
        recordsPerPage,
        startAtRecord
      );
      res.status(200).json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get(
  `${apiPrefix}/acnas/entityprofiles/:entityProfileName/available`,
  async (req, res) => {
    const { entityProfileName } = req.params;
    const { acna, recordsPerPage, startAtRecord } = req.query;
    try {
      const acnas = entityProfilesHelper.getAvailableAcnasByProfileName(
        entityProfileName,
        acna,
        recordsPerPage,
        startAtRecord
      );
      res.status(200).json(acnas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get(
  `${apiPrefix}/countries/entityprofiles/:entityProfileName/available`,
  async (req, res) => {
    const { entityProfileName } = req.params;
    const { country, recordsPerPage, startAtRecord } = req.query;
    try {
      const countries = entityProfilesHelper.getAvailableCountriesByProfileName(
        entityProfileName,
        country,
        recordsPerPage,
        startAtRecord
      );
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get(
  `${apiPrefix}/states/entityprofiles/:entityProfileName/available`,
  async (req, res) => {
    const { entityProfileName } = req.params;
    const { state, recordsPerPage, startAtRecord } = req.query;
    try {
      const states = entityProfilesHelper.getAvailableStatesByProfileName(
        entityProfileName,
        state,
        recordsPerPage,
        startAtRecord
      );
      res.status(200).json(states);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get(
  `${apiPrefix}/cities/entityprofiles/:entityProfileName/available`,
  async (req, res) => {
    const { entityProfileName } = req.params;
    const { city, recordsPerPage, startAtRecord } = req.query;
    try {
      const cities = entityProfilesHelper.getAvailableCitiesByProfileName(
        entityProfileName,
        city,
        recordsPerPage,
        startAtRecord
      );
      res.status(200).json(cities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get(
  `${apiPrefix}/entityprofiles/:entityProfileName/associated`,
  async (req, res) => {
    const { entityProfileName } = req.params;
    const { deviceName, recordsPerPage, startAtRecord } = req.query;
    try {
      const devices = entityProfilesHelper.getAssociatedDevicesByProfileName(
        entityProfileName,
        deviceName,
        recordsPerPage,
        startAtRecord
      );
      res.status(200).json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// Get an specific Member

app.get(`${MEMBER_PREFIX}/:acna`, async (req, res) => {
  try {
    const acna = req.params;
    const startAtRecord = req.query.startAtRecord || 0;
    const recordsPerPage = req.query.recordsPerPage || 100;

    const members = membersHelper.getConnectedMembers(
      acna,
      startAtRecord,
      recordsPerPage
    );
    res.json(members);
  } catch (error) {
    console.error('Error to obtain acna members:', error);
    res.status(500).json({ error: 'Error to obtain acna members' });
  }
});

app.get(`${MEMBER_PREFIX}/export`, async (req, res) => {
  try {
    const startAtRecord = req.query.startAtRecord || 0;
    const recordsPerPage = req.query.recordsPerPage || 100;

    const members = membersHelper.exportConnectedMembers(
      startAtRecord,
      recordsPerPage
    );
    res.json(members);
  } catch (error) {
    console.error('Error to export acna members:', error);
    res.status(500).json({ error: 'Error to export acna members' });
  }
});

app.get(`${MEMBER_PREFIX}/:acna/connectedgraph`, async (req, res) => {
  try {
    const acna = req.params;
    const member = await membersHelper.getMemberForGraph(acna);
    res.json(member);
  } catch (error) {
    console.error('Error to obtain member:', error);
    res.status(500).json({ error: 'Error to obtain member' });
  }
});

// Get an specific changeTicket

app.get(`${CHANGE_TICKETS_PREFIX}`, async (req, res) => {
  try {
    const startAtRecord = req.query.startAtRecord || 0;
    const recordsPerPage = req.query.recordsPerPage || 100;

    console.log('Please wait while tickets are retrieved...');
    const tickets = changeTicketsHelper.getAllTickets(
      recordsPerPage,
      startAtRecord
    );
    res.json(tickets);
  } catch (error) {
    console.error('Error while retrieving tickets:', error);
    res.status(500).json({ error: 'Error to obtain tickets' });
  }
});

app.get(`${CHANGE_TICKETS_PREFIX}/:changeTicketId`, async (req, res) => {
  try {
    const changeTicketId = req.params;
    const ticket = await changeTicketsHelper.getTicketByUsername(
      changeTicketId
    );
    res.json(ticket);
  } catch (error) {
    console.error('Error while retrieving ticket:', error);
    res.status(500).json({ error: 'Error to obtain ticket' });
  }
});

app.get(`${CHANGE_TICKETS_PREFIX}/scheduleGraph`, async (req, res) => {
  try {
    const startAtRecord = req.query.startAtRecord || 0;
    const recordsPerPage = req.query.recordsPerPage || 100;
    console.log('Please wait while tickets are retrieved...');
    const tickets = changeTicketsHelper.getTicketsForGraph(
      recordsPerPage,
      startAtRecord
    );
    res.json(tickets);
  } catch (error) {
    console.error('Error while retrieving tickets:', error);
    res.status(500).json({ error: 'Error to obtain tickets' });
  }
});

app.get(
  `${CHANGE_TICKETS_PREFIX}/:changeTicketId/devices`,
  async (req, res) => {
    try {
      const changeTicketId = req.params;
      const device = await changeTicketsHelper.getDeviceByUsername(
        changeTicketId
      );
      res.json(device);
    } catch (error) {
      console.error('Error while retrieving device:', error);
      res.status(500).json({ error: 'Error to obtain device' });
    }
  }
);

// Get an specific entityProfile

app.get(`${apiEntityPrefix}`, async (req, res) => {
  try {
    const allProfiles = entityProfilesHelper.getAllProfiles();
    res.status(200).json(allProfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get(`${apiEntityPrefix}/names`, async (req, res) => {
  try {
    const allProfileNames = entityProfilesHelper.getAllProfileNames();
    res.status(200).json(allProfileNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get(
  `${apiEntityPrefix}/name/:entityProfileName/available`,
  async (req, res) => {
    const entityProfileName = req.params.entityProfileName;
    try {
      const availability =
        entityProfilesHelper.checkProfileNameAvailability(entityProfileName);
      res.status(200).json(availability);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
app.post(`${apiEntityPrefix}`, async (req, res) => {
  const newProfileData = req.body;
  try {
    await entityProfilesHelper.createProfile(newProfileData);
    res.status(204).end();
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

app.patch(`${apiEntityPrefix}/:entityProfileName`, async (req, res) => {
  const entityProfileName = req.params.entityProfileName;
  const updatedProfileData = req.body;
  try {
    await entityProfilesHelper.updateProfile(
      entityProfileName,
      updatedProfileData
    );
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.delete(`${apiEntityPrefix}/:entityProfileName`, async (req, res) => {
  const entityProfileName = req.params.entityProfileName;
  try {
    await entityProfilesHelper.deleteProfile(entityProfileName);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser);
app.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// // Use default router
// server.use(router);

app.set('port', process.env.PORT || 5000);
const port = app.get('port');

// Swagger configuration
/* app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(5000, () =>
  console.log(
    'Swagger is listening on port 5000, please visit http://localhost:5001/api-docs'
  )
);
open('http://localhost:3001/api-docs'); */

// Listen
app.listen(port, () => console.log('JSON Server is running'));

module.exports = app;
