import { AcnaStatus, HasMemberConnectivity, Member, MemberConnectivityStatus, MembersGraphResponse, MembersResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { store } from "../StoreMobx";
import { MemberConnectivityService } from "../../service/memberConnectivity/MemberConnectivityService";
import { MemberExportService } from "../../service/memberConnectivity/MemberExportService";
import { Response } from "../../interfaces/api/api";
import { StatusCode } from "../../helpers/api/RequestHelper";
import { MessageHelper } from "../../helpers/shared/MessageHelper";
import membersConnectivity from "./MemberConnectivity";

describe("MemberConnectivityStore", () => {
  // Tests that data is loaded successfully with valid acna
  it("test_load_data_with_valid_acna", async () => {
    const mockResponse: MembersResponse = {
      members: [
        {
          acna: "acna",
          devices: [],
          knownAs: "knownAs",
          memberConnectivityStatus: MemberConnectivityStatus.DOWN
        }
      ],
      returnedRecords: 1,
      totalRecords: 1
    };
    jest.spyOn(MemberConnectivityService, "getAll").mockResolvedValue({ data: mockResponse, status: 200 });
    const memberConnectivity = store.member;
    await memberConnectivity.loadData("acna");
    expect(memberConnectivity.data).toEqual(mockResponse);
    expect(memberConnectivity.data?.members).toEqual(mockResponse.members);
  });

  // Test loadDataExport function
  it("test_load_data_export", async () => {
    const mockResponse: any = {
      totalRecords: 1,
      returnedRecords: 1,
      exportMember: []
    };
    jest.spyOn(MemberExportService, "getAll").mockResolvedValue({ data: mockResponse, status: 200 });
    const memberConnectivity = store.member;
    await memberConnectivity.loadDataExport();
    expect(memberConnectivity.exportData).toEqual(mockResponse);
  });

  // Successfully retrieves data from MemberConnectivityService.getHasMemberConnectivity()
  it("should retrieve data from MemberConnectivityService.getHasMemberConnectivity and set this.hasMemberConnectivity", async () => {
    // Arrange
    const memberConnectivity = store.member;
    const responseData: Response<HasMemberConnectivity> = {
      data: {
        hasMemberConnectivity: true,
        connectedAcnas: [
          {
            acna: "acna",
            knownAs: "knownAs"
          }
        ]
      },
      status: StatusCode.OK
    };

    MemberConnectivityService.getHasMemberConnectivity = jest.fn().mockResolvedValue(responseData);
    // Act
    await memberConnectivity.loadHasMemberConnectivity();
    // Assert
    expect(MemberConnectivityService.getHasMemberConnectivity).toHaveBeenCalled();
    expect(memberConnectivity.hasMemberConnectivity).toEqual(responseData.data);
  });

  it("should load data successfully", async () => {
    const mockResponse: MembersResponse = {
      members: [
        {
          acna: "acna",
          devices: [],
          knownAs: "knownAs",
          memberConnectivityStatus: MemberConnectivityStatus.UP_SITE_TO_SITE
        }
      ],
      returnedRecords: 1,
      totalRecords: 1
    };
    jest.spyOn(MemberConnectivityService, "getAll").mockResolvedValue({ data: mockResponse, status: 200 });
    const memberConnectivity = store.member;
    await memberConnectivity.loadData("acna");

    expect(memberConnectivity.data).toEqual(mockResponse);
  });

  it("should load membersGraph successfully", async () => {
    const mockResponse: MembersGraphResponse = {
      connectedMembers: [],
      srcAcna: "acna",
      srcKnownAs: "knownAs",
      srcAcnaStatus: AcnaStatus.fullService
    };
    jest.spyOn(MemberConnectivityService, "getConnectedGraph").mockResolvedValue({
      data: mockResponse,
      status: StatusCode.OK
    });
    const memberConnectivity = store.member;
    await memberConnectivity.loadMembersGraph("acna");
    expect(memberConnectivity.membersGraph).toEqual(mockResponse);
  });

  it("should clear data successfully", () => {
    // Arrange
    membersConnectivity.data = {
      members: [
        {
          acna: "acna",
          devices: [],
          knownAs: "knownAs",
          memberConnectivityStatus: MemberConnectivityStatus.DOWN
        }
      ],
      returnedRecords: 1,
      totalRecords: 1
    };
    // Act
    membersConnectivity.clearData();
    // Assert
    expect(membersConnectivity.data).toBeUndefined();
  });
  
  it("should clear members graph successfully", () => {
    // Arrange
    membersConnectivity.connectedMember = [
      {
        destAcna: "acna",
        destKnownAs: "knownAs",
        destAcnaStatus: AcnaStatus.fullService,
        memberConnectivityStatus: MemberConnectivityStatus.UP_SITE_TO_SITE
      }
    ];

    // Act
    membersConnectivity.clearMembersGraph();
    // Assert
    expect(membersConnectivity.connectedMember).toBeUndefined();
  });
});
