import React from "react";
import { Group } from "src/interfaces/devices/group/group";
import { TreeMenuHelper } from "./TreeMenuHelper";
import { IFilter } from "src/store/device/filter/Filter";
import { IDevice } from "src/store/device/Device";
import { IGeolocation } from "src/store/device/geolocation/Geolocation";
import { OptionsGeolocationTable } from "../../interfaces/devices/geolocation/geolocation";

const info = {
  checkedNodes: [{ key: "group1" }]
};

const setCheckedKeys = jest.fn();

const devices: IDevice = {
  currentPage: 1,
  loadData: jest.fn(),
  loadDevicesStatus: jest.fn(),
  setCurrentPage: jest.fn(),
  setDevices: jest.fn(),
  setSelectedStatuses: jest.fn(),
  setStatusFilters: jest.fn(),
  setDevicesStatus: jest.fn(),
  toggleSelectedStatuses: jest.fn(),
  cleanDevicesAndGeolocations: jest.fn()
};
const geolocation: IGeolocation = {
  loadData: jest.fn(),
  setLocation: jest.fn(),
  loadLocation: jest.fn(),
  loadHasGeolocation: jest.fn(),
  setGeolocationOption: jest.fn(),
  geolocationOption: OptionsGeolocationTable.all
};

const filter: IFilter = {
  isFilteredTable: false,
  selectedTableView: true,
  setActiveFiltersData: jest.fn(),
  cleanFilteredDevicesTable: jest.fn(),
  resetAllFilters: jest.fn(),
  setFilteredDevicesTable: jest.fn(),
  setIsSelectedTableView: jest.fn(),
  setFilteredDevicesData: jest.fn()
};

const totalGroups = 2;
const setGroupActiveData = jest.fn();
const setGroupSelectedData = jest.fn();

describe("TreeMenuHelper", () => {
  // Build groups with valid input
  it("should build groups with valid input", () => {
    // Arrange
    const groups: Group[] = [
      {
        acna: "ACNA1",
        knownAs: "Group 1",
        totalNumberOfDevices: 10,
        companyName: "Company 1"
      },
      {
        acna: "ACNA2",
        knownAs: "Group 2",
        totalNumberOfDevices: 5,
        companyName: "Company 2"
      }
    ];

    // Act
    const result = TreeMenuHelper.buildGroups(groups) as any;

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].key).toBe("ACNA1");
    expect(result[0].title?.props.label).toBe("ACNA1 - Group 1");
    expect(result[0].title?.props.group).toEqual(groups[0]);
    expect(result[0].title?.props.devicesAmount).toBe(10);
    expect(result[0].title?.props.id).toBe("ACNA1");
    expect(result[1].key).toBe("ACNA2");
    expect(result[1].title?.props.label).toBe("ACNA2 - Group 2");
    expect(result[1].title?.props.group).toEqual(groups[1]);
    expect(result[1].title?.props.devicesAmount).toBe(5);
    expect(result[1].title?.props.id).toBe("ACNA2");
  });

  it("should check groups correctly", async () => {
    await TreeMenuHelper.checkGroups(info, setCheckedKeys, devices, geolocation, filter, totalGroups, setGroupActiveData, setGroupSelectedData);
    expect(setCheckedKeys).toHaveBeenCalledWith(info.checkedNodes);
  });

  // Calculates the maximum percentage correctly when both onPrimary and onBackup are greater than 0 and devicesStatus is defined.
  it("should calculate the maximum percentage correctly when both onPrimary and onBackup are greater than 0 and devicesStatus is defined", () => {
    const onPrimary = 10;
    const onBackup = 5;
    const setMaxPercentage = jest.fn();
    const setConnectionStatus = jest.fn();
    const devicesStatus = {
      onPrimary: 20,
      offline: 5,
      onBackup: 10,
      unknown: 5,
      indeterminate: 0
    };

    TreeMenuHelper.getDonutMaxPercentage(onPrimary, onBackup, setMaxPercentage, setConnectionStatus, devicesStatus);

    expect(setMaxPercentage).toHaveBeenCalledWith(38);
    expect(setConnectionStatus).toHaveBeenCalledWith(devicesStatus);
  });
});
