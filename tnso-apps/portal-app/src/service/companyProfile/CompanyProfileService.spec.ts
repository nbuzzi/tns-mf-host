import { CompanyProfileService } from "./CompanyProfileService";

describe("CompanyProfileService", () => {
  it("should be undefined", async () => {
    const response = await CompanyProfileService.getAll();

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.getAssociatedByUser("user");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.getAvailablesByUser("user");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.getByName("companyProfileName");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.isAvailable("companyProfileName");

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.create({
      name: "companyProfileName",
      note: "companyProfileNote",
      acnas: "companyProfileAcnase",
      available: true,
      canBeDeleted: true
    });

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.update("companyProfileName", {
      name: "companyProfileName",
      note: "companyProfileNote",
      acnas: "companyProfileAcnase",
      available: true,
      canBeDeleted: true
    });

    expect(response).toEqual({ data: undefined, status: undefined });
  });

  it("should be undefined", async () => {
    const response = await CompanyProfileService.delete("companyProfileName");

    expect(response).toEqual({ data: undefined, status: undefined });
  });
});
