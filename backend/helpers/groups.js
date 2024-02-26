module.exports = {
  getGroupsByFilter(mockedGroups, mockedDevices) {
    let groups = [];

    mockedDevices.devices.map((device) => {
      const isDevice = mockedGroups.find((group) => group.acna === device.acna);
      let acna = isDevice.acna;
      let companyName = isDevice.companyName;
      let knownAs = isDevice.knownAs;

      if (isDevice) {
        const status = device.connectivityStatus;

        const group = groups.find((group) => group.acna === acna);

        if (!group) {
          const devicesStatus = {
            fullService: 0,
            offline: 0,
            onPrimary: 0,
            onBackup: 0,
            unknown: 0,
            indeterminate: 0
          };

          groups = [...groups, { acna, companyName, knownAs, totalNumberOfDevices: 1, connectivityStatus: { ...devicesStatus, [status]: 1 } }];
        } else {
          group.connectivityStatus[status] = group.connectivityStatus[status] ? group.connectivityStatus[status] + 1 : 1;
          group.totalNumberOfDevices++;
        }
      }
    });

    return groups;
  }
};
