import { CompanyProfileService } from "../../service/companyProfile/CompanyProfileService";
import { store } from "../StoreMobx";
import { CompanyProfile, CompanyProfileResponse } from "../../interfaces/companyProfiles/company";
import { StatusCode } from "../../helpers/api/RequestHelper";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import { QueryParams } from "src/interfaces/shared/queryParams";
import companyProfile from "./CompanyProfile";

describe("CompanyProfileStore", () => {
  // Tests that loadData loads data from CompanyProfileService and sets it to data and companyProfiles
  it("test_load_data", async () => {
    const mockResponse: CompanyProfileResponse = {
      totalRecords: 1,
      returnedRecords: 1,
      companyProfiles: [
        {
          name: "Test Company",
          acnas: [
            {
              knownAs: "Test ACNA",
              name: "123"
            }
          ],
          note: "Test note",
          canBeDeleted: true
        }
      ]
    };
    jest.spyOn(CompanyProfileService, "getAll").mockResolvedValue({ data: mockResponse, status: 200 });
    await store.companyProfile.loadData();
    expect(store.companyProfile.data).toEqual(mockResponse);
    expect(store.companyProfile.companyProfiles).toEqual(mockResponse.companyProfiles);
  });

  // Tests that loadDataByName loads data from CompanyProfileService and sets it to companyProfile
  it("test_load_data_by_name", async () => {
    const mockResponse: CompanyProfileResponse = {
      totalRecords: 1,
      returnedRecords: 1,
      companyProfiles: [
        {
          name: "Test Company",
          acnas: [
            {
              knownAs: "Test ACNA",
              name: "123"
            }
          ],
          note: "Test note",
          canBeDeleted: true
        }
      ]
    };
    jest.spyOn(CompanyProfileService, "getByName").mockResolvedValue({ data: mockResponse, status: 200 });
    await store.companyProfile.loadDataByName("Test Company");
    expect(store.companyProfile.companyProfile).toEqual(mockResponse.companyProfiles[0]);
  });

  // Tests that loadAvailablesByUser loads data from CompanyProfileService and sets it to availableData
  it("test_load_availables_by_user", async () => {
    const mockResponse: CompanyProfileResponse = {
      totalRecords: 1,
      returnedRecords: 1,
      companyProfiles: [
        {
          name: "Test Company",
          acnas: [
            {
              knownAs: "Test ACNA",
              name: "123"
            }
          ],
          note: "Test note",
          canBeDeleted: true
        }
      ]
    };
    jest.spyOn(CompanyProfileService, "getAvailablesByUser").mockResolvedValue({ data: mockResponse, status: 200 });
    await store.companyProfile.loadAvailablesByUser("Test User");
    expect(store.companyProfile.availableData).toEqual(mockResponse);
  });

  // Tests that loadAssociatedByUser loads data from CompanyProfileService and sets it to associatedData
  it("test_load_associated_by_user", async () => {
    const mockResponse: CompanyProfileResponse = {
      returnedRecords: 1,
      totalRecords: 1,
      companyProfiles: [
        {
          name: "Test Company",
          acnas: [
            {
              knownAs: "Test ACNA",
              name: "123"
            }
          ],
          note: "Test note",
          canBeDeleted: true
        }
      ]
    };
    jest.spyOn(CompanyProfileService, "getAssociatedByUser").mockResolvedValue({ data: mockResponse, status: 200 });
    await store.companyProfile.loadAssociatedByUser("Test User");
    expect(store.companyProfile.associatedData).toEqual(mockResponse);
  });

  // Tests that isAvailable calls CompanyProfileService.isAvailable and sets available to true or false
  it("test_is_available", async () => {
    const mockResponse = {
      data: {
        available: true
      }
    };
    jest.spyOn(CompanyProfileService, "isAvailable").mockResolvedValue(mockResponse);
    await store.companyProfile.isAvailable("Test Company");
    expect(store.companyProfile.available).toEqual(true);
  });
  // Create company profile successfully
  it("should create company profile successfully", async () => {
    // Mock the CompanyProfileService.create method to return a successful response
    CompanyProfileService.create = jest.fn().mockResolvedValue({ status: StatusCode.NO_CONTENT });

    // Create an instance of the CompanyProfile class
    const companyProfile = store.companyProfile;

    // Define the company profile data
    const newCompanyProfile: CompanyProfile = {
      name: "Company B",
      acnas: "ACNA1-KnownAs1,ACNA2-KnownAs2",
      note: "This is a new company profile",
      canBeDeleted: true
    };

    // Call the create method
    const result = await companyProfile.create(newCompanyProfile);

    // Assert that the result is the expected status code
    expect(result).toBe(StatusCode.NO_CONTENT);
  });

  it("test_clean_data", () => {
    const companyProfile = store.companyProfile;
    companyProfile.cleanavailableDataAndAssociatedData();
    expect(companyProfile.availableData).toBeUndefined();
    expect(companyProfile.associatedData).toBeUndefined();
  });

  it("test_reset_data", () => {
    const companyProfile = store.companyProfile;
    companyProfile.resetData();
    expect(companyProfile.companyProfile).toEqual({
      name: "",
      acnas: [],
      note: "",
      canBeDeleted: false
    });
    expect(companyProfile.name).toBe("");
    expect(companyProfile.acnas).toBe("");
    expect(companyProfile.note).toBe("");
    expect(companyProfile.data).toBeUndefined();
  });

  it("test_delete", async () => {
    const companyProfile = store.companyProfile;
    const name = "Test Company";
    CompanyProfileService.delete = jest.fn().mockResolvedValue({ status: 200 });
    await companyProfile.delete(name);
    expect(CompanyProfileService.delete).toHaveBeenCalledWith(name);
  });

  it("test_update", async () => {
    const companyProfile = store.companyProfile;
    const name = "Test Company";
    const sampleData: CompanyProfile = {
      name: "Test Company",
      note: "Test note",
      canBeDeleted: true
    };
    CompanyProfileService.update = jest.fn().mockResolvedValue({ status: StatusCode.NO_CONTENT });
    await companyProfile.update(name, sampleData);
    expect(CompanyProfileService.update).toHaveBeenCalledWith(name, sampleData);
  });

  it("should handle data loading by name failure", async () => {
    const companyProfile = store.companyProfile;
    const name = "Company A";
    const mockError = new Error();
    CompanyProfileService.getByName = jest.fn().mockRejectedValueOnce(mockError);
    jest.spyOn(MessageHelper, "errorMessage");

    await companyProfile.loadDataByName(name);

    expect(CompanyProfileService.getByName).toHaveBeenCalledWith(name);
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error loading company profiles");
  });

  it("should handle data loading failure", async () => {
    const companyProfile = store.companyProfile;
    const mockError = new Error("Error loading company profiles");
    jest.spyOn(CompanyProfileService, "getAll").mockRejectedValueOnce(mockError);
    jest.spyOn(MessageHelper, "errorMessage");

    const queryParams: QueryParams = {
      sortBy: "sortBy",
      startAtRecord: 0,
      recordsPerPage: 10,
      search: "search",
      status: "status",
      startDate: "startDate",
      endDate: "endDate",
      countries: "countries",
      country: "country",
      city: "city",
      zipCode: "zipCode",
      orderBy: "orderBy",
      name: "name",
      hasGeolocation: true,
      username: "username",
      tnsDeviceName: "tnsDeviceName"
    };

    await companyProfile.loadData(queryParams);
    expect(CompanyProfileService.getAll).toHaveBeenCalledWith(queryParams);
    expect(companyProfile.data).toBeUndefined();
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error loading company profiles");
  });

  it("should handle available data loading by user failure", async () => {
    const companyProfile = store.companyProfile;
    const username = "user123";
    const mockError = new Error("Error loading company profiles");
    jest.spyOn(CompanyProfileService, "getAvailablesByUser").mockRejectedValueOnce(mockError);
    jest.spyOn(MessageHelper, "errorMessage");

    await companyProfile.loadAvailablesByUser(username);

    expect(CompanyProfileService.getAvailablesByUser).toHaveBeenCalledWith(username, undefined);
    expect(companyProfile.availableData).toBeUndefined();
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error loading company profiles");
  });

  it("should handle associated data loading by user failure", async () => {
    const companyProfile = store.companyProfile;
    const username = "testUser";
    const mockError = new Error("Error loading company profiles");

    jest.spyOn(CompanyProfileService, "getAssociatedByUser").mockRejectedValueOnce(mockError);
    jest.spyOn(MessageHelper, "errorMessage");

    await companyProfile.loadAssociatedByUser(username);

    expect(CompanyProfileService.getAssociatedByUser).toHaveBeenCalledWith(username, undefined);
    expect(companyProfile.associatedData).toBeUndefined();
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error loading company profiles");
  });

  it("should return undefined if company profiles data is not set", () => {
    companyProfile.companyProfiles = undefined;
    const result = companyProfile.getData();
    expect(result).toBeUndefined();
  });

  it("should handle a failure when updating a company profile", async () => {
    const companyProfileStore = store.companyProfile;
    const companyProfileName = "Company1";
    const updatedCompanyProfile = {
      name: "Updated Company",
      acnas: "ACNA2",
      note: "Updated Note",
      canBeDeleted: true
    };

    jest.spyOn(CompanyProfileService, "update").mockRejectedValueOnce(new Error("Error updating company profile"));
    jest.spyOn(MessageHelper, "errorMessage").mockImplementation(() => {});

    await companyProfileStore.update(companyProfileName, updatedCompanyProfile);

    expect(CompanyProfileService.update).toHaveBeenCalledWith(companyProfileName, updatedCompanyProfile);
    expect(MessageHelper.errorMessage).toHaveBeenCalledWith("Error updating company profile");
  });
});
