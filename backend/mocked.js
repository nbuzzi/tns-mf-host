const devices = require('./jsons/devices/devices');
const deviceDetail = require('./jsons/devices/deviceDetail');
const groups = require('./jsons/group/groups');
const geolocation = require('./jsons/geolocation/geolocation');
const configuration = require('./jsons/configuration/configuration');
const signal = require('./jsons/normalizedSignal/signal');
const tnsSignal = require('./jsons/tnsSignal');
const dataReport = require('./jsons/dataReport');
const software = require('./jsons/software/software');
const uptimeMonth = require('./jsons/connectivityUptime/month');
const uptimeDay = require('./jsons/connectivityUptime/day');
const currentUsage = require('./jsons/usage/current');
const historicalUsage = require('./jsons/usage/historical.json');
const technologies = require('./jsons/technologies');
const LAN = require('./jsons/LAN');
const notes = require('./jsons/notes/notes');
const lvcData = require('./jsons/lvcs/lvc');
const companyProfiles = require('./jsons/companyProfiles/companyProfiles');
const acnas = require('./jsons/acnas/acnas');
const token = require('./jsons/authenticate/authToken');
const users = require('./jsons/users/users');
const roles = require('./jsons/userRoles/roles.json');
const usersByRole = require('./jsons/userRoles/users.json');

module.exports = {
  auth: {
    signin: {
      token,
    },
    users,
  },
  devices: {
    totalRecords: devices.length,
    returnedRecords: 0,
    devices,
  },
  devicesGroups: groups,
  geolocation: geolocation,
  devicesWithName: {
    deviceDetail,
    configuration,
    LAN,
    locations: geolocation,
    software: {
      totalRecords: software.length,
      returnedRecords: 0,
      configurations: software,
    },
    usage: {
      currentUsage,
      historicalUsage: {
        totalRecords: historicalUsage.length,
        returnedRecords: 0,
        historical: historicalUsage,
      },
    },
  },
  technologies,
  devicesWithInterfaces: {
    totalRecords: 0,
    returnedRecords: 0,
    devices: [
      {
        createTime: new Date().toJSON(),
        updateTime: new Date().toJSON(),
        name: 'Test Device',
        status: 'Running',
        stringDefinition: 'string',
        capacity: 'string',
        wirelessCapabilities: 'string',
      },
    ],
  },
  devicesWithUptimeMonth: uptimeMonth,
  devicesWithUptimeDay: uptimeDay,
  devicesWithSignal: {
    normalizedSignal: {
      totalRecords: 0,
      displayRecords: 0,
      historical: signal,
    },
    mostRecentSignal: {
      technologies: [
        '2G-RSSI',
        '3G-RSSI',
        '3G-EC/IO',
        '3G-RSCP',
        '4G-RSSI',
        '4G-RSRP',
        '4G-RSRQ',
        '4G-SINR',
      ],
      current: 0,
    },
    tnsSignal,
    dataReport: {
      totalRecords: dataReport.length,
      returnedRecords: dataReport.length,
      dataReport,
    },
  },
  devicesWithNote: notes,
  devicesWithLvcs: {
    totalRecords: 0,
    returnedRecords: 0,
    devices: lvcData,
  },
  companyProfiles: {
    totalRecords: companyProfiles.length,
    returnedRecords: 0,
    companyProfiles,
  },
  acnas: {
    totalRecords: 0,
    returnedRecords: 0,
    acnas,
  },
  roles: {
    roles,
    usersByRole,
  },
};
