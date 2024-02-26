import { DataNode } from "rc-tree/lib/interface";
import { DeviceGroupHelper } from "./DeviceGroupHelper";

describe("DeviceGroupHelper", () => {
  // Tests that setGroups method sets groups property
  it("test_set_groups_sets_groups_property", () => {
    const groups = [{ acna: "123", knownAs: "group1", totalNumberOfDevices: 5 }];
    DeviceGroupHelper.setGroups(groups);
    expect(DeviceGroupHelper.groups).toEqual(groups);
  });

  // Tests that checkedAllDevices returns empty array when treeData is undefined
  it("test_checked_all_devices_returns_empty_array_when_tree_data_is_undefined", () => {
    const checkedKeys = DeviceGroupHelper.checkedAllDevices(undefined);
    expect(checkedKeys).toEqual([]);
  });

  // Tests that checkedAllDevices returns an array of keys when treeData is defined
  it("test_checked_all_devices_returns_array_of_keys_when_tree_data_is_defined", () => {
    const treeData = [
      { key: "1", children: [{ key: "2" }, { key: "3" }] },
      { key: "4", children: [{ key: "5" }] }
    ];
    const checkedKeys = DeviceGroupHelper.checkedAllDevices(treeData);
    expect(checkedKeys).toEqual(["1", "4"]);
  });

  // Tests that checkedAllDevices returns empty array when treeData is an empty array
  it("test_checked_all_devices_returns_empty_array_when_tree_data_is_an_empty_array", () => {
    const treeData: DataNode[] = [];
    const checkedKeys = DeviceGroupHelper.checkedAllDevices(treeData);
    expect(checkedKeys).toEqual([]);
  });

  // Tests that checkedAllDevices handles nodes with same key correctly
  it("test_checked_all_devices_handles_nodes_with_same_key_correctly", () => {
    const treeData = [
      { key: "1", children: [{ key: "2" }, { key: "3" }] },
      { key: "1", children: [{ key: "4" }] }
    ];
    const checkedKeys = DeviceGroupHelper.checkedAllDevices(treeData);
    expect(checkedKeys).toEqual([]);
  });

  // Tests that setGroups method sets groups property to undefined when passed an empty array
  it("test_set_groups_sets_groups_property_to_undefined_when_passed_an_empty_array", () => {
    DeviceGroupHelper.setGroups([]);
    expect(DeviceGroupHelper.groups).toEqual([]);
  });
});
