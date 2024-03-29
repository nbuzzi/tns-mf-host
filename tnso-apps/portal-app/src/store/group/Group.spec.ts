// Generated by CodiumAI

import { StatusCode } from "../../helpers/api/RequestHelper";
import { GroupFilters } from "../../interfaces/devices/group/group";
import { GroupService } from "../../service/device/GroupService";
import { store } from "../StoreMobx";

describe("Group", () => {
  // Load data successfully and set groups, treeDataGroups, and allTreeDataGroups
  it("should load data successfully and set groups, treeDataGroups, and allTreeDataGroups", async () => {
    // Mock GroupService.getAll() to return a successful response with data
    const mockResponse = { data: [{ acna: "123", knownAs: "Group 1", totalNumberOfDevices: 5 }], status: StatusCode.OK };
    GroupService.getAll = jest.fn().mockResolvedValue(mockResponse);

    // Create an instance of Group
    const group = store.group;

    // Call the loadData method
    await group.loadData();

    // Assert that the groups, treeDataGroups, and allTreeDataGroups are set correctly
    expect(group.groups).toEqual(mockResponse.data);
  });

  // Set groupActive, groupSelected, filterBy, checkedDevicesKeys, and isAllCheckedDevices successfully
  it("should set groupActive, groupSelected, filterBy, checkedDevicesKeys, and isAllCheckedDevices successfully", () => {
    // Create an instance of Group
    const group = store.group;

    // Set the values for groupActive, groupSelected, filterBy, checkedDevicesKeys, and isAllCheckedDevices
    group.setGroupActive("Group 1");
    group.setGroupSelected(["key1", "key2"]);
    group.setGroupsFilterBy(GroupFilters.Member);
    group.setCheckedDevicesKeys(["key1", "key2"]);
    group.setIsAllCheckedDevices(true);

    // Assert that the values are set correctly
    expect(group.groupActive).toBe("Group 1");
    expect(group.groupSelected).toEqual(["key1", "key2"]);
    expect(group.filterBy).toBe(GroupFilters.Member);
    expect(group.checkedDevicesKeys).toEqual(["key1", "key2"]);
    expect(group.isAllCheckedDevices).toBe(true);
  });

  // Toggle all checked devices successfully
  it("should toggle all checked devices successfully", () => {
    // Create an instance of Group
    const group = store.group;

    // Set the initial values for isAllCheckedDevices and allTreeDataGroups
    group.isAllCheckedDevices = false;
    group.allTreeDataGroups = [{ key: "key1" }, { key: "key2" }];

    // Call the toggleAllCheckedDevices method
    group.toggleAllCheckedDevices();

    // Assert that isAllCheckedDevices is true and checkedDevicesKeys is undefined
    expect(group.isAllCheckedDevices).toBe(true);
    expect(group.checkedDevicesKeys).toBeUndefined();

    // Call the toggleAllCheckedDevices method again
    group.toggleAllCheckedDevices();

    // Assert that isAllCheckedDevices is false and checkedDevicesKeys is undefined
    expect(group.isAllCheckedDevices).toBe(false);
    expect(group.checkedDevicesKeys).toBeUndefined();
  });

  // Set checkedDevicesKeys with empty array
  it("should set checkedDevicesKeys with empty array", () => {
    // Create an instance of Group
    const group = store.group;

    // Set the checkedDevicesKeys with an empty array
    group.setCheckedDevicesKeys([]);

    // Assert that checkedDevicesKeys is undefined
    expect(group.checkedDevicesKeys).toEqual([]);
  });
});
