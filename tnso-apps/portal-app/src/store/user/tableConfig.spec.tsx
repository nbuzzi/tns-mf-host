// Generated by CodiumAI

import { User, UserResponse } from "src/interfaces/users/user";
import { store } from "../StoreMobx";
import { builderUserQueryParams, getColumnSearchProps, handleModal, handleSearch, handleSort } from "./tableConfig";

describe("handleSearch", () => {
  // Calls builderDeviceQueryParams with tableFilters containing the keyFilter and filter values
  it("should call builderDeviceQueryParams with tableFilters containing the keyFilter and filter values", () => {
    const filter = "test";
    const keyFilter = "testKey";
    const queryParams = builderUserQueryParams({ tableFilters: { [keyFilter]: filter } });
    expect(queryParams).toEqual({ recordsPerPage: 10, startAtRecord: 0, [keyFilter]: filter });
  });

  // Returns an object with filterDropdown and filterIcon properties.
  it("should return an object with filterDropdown and filterIcon properties", () => {
    const result = getColumnSearchProps("dataIndex");
    expect(result).toHaveProperty("filterDropdown");
    expect(result).toHaveProperty("filterIcon");
  });

  // If filter is "all", sets filter to an empty string
  it('should set filter to an empty string if filter is "all"', () => {
    const filter = "";
    const keyFilter = "connectivityStatus";

    const queryParams = builderUserQueryParams({ tableFilters: { [keyFilter]: filter } });
    expect(queryParams).toEqual({ recordsPerPage: 10, startAtRecord: 0 });
  });

  // If filter is "all", sets filter to an empty string
  it('should set filter to an empty string if filter is "all"', () => {
    handleSort("dataIndex", {}, {});
    expect(store.user.loadData).toHaveBeenCalled;
  });

  // When 'isShowModal' is true and 'username' is provided, it sets the user in the store with the matching username
  it("should set user in store when isShowModal is true and username is provided", () => {
    const user: User = { username: "testUser", email: "test@test.com", firstName: "test", lastName: "test" };
    store.user.data = { totalRecords: 1, returnedRecords: 1, users: [user] };
    handleModal(true, "testUser");
    expect(store.user.userSelected).toEqual(user);
  });
});