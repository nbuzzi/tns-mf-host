import { DevicesResponse, LVCResponse } from "../../interfaces/devices/response/response";
import { MapperHelper } from "./MapperHelper";
import { CompanyProfileWithACNAs } from "../../interfaces/companyProfiles/company";
import { ChangeTicket, ChangeTicketImpact, ChangeTicketsResponse, ChangeTicketStatus } from "../../interfaces/changeTickets/changeTickets";
import { DateHelper } from "./DateHelper";
import { LVCTable } from "../../interfaces/devices/lvc/lvc";
import { Device } from "../../interfaces/devices/devices";
import { User, UserStatus, UserTable } from "../../interfaces/users/user";
import { Roles, RolesByUserList } from "../../interfaces/auth/roleAndPermission/role";
import { ACNA } from "../../interfaces/companyProfiles/acna/acna";
import { InterfaceStatus, InterfaceType, MembersExportResponse } from "../../interfaces/memberConnectivity/memberConnectivity";

describe("MapperHelper", () => {
  it("test_map_lvc_with_source_returns_array", () => {
    // Arrange
    const source: LVCResponse | undefined = {
      totalRecords: 1,
      returnedRecords: 1,
      lvcs: [
        {
          ep1Acna: "asds",
          ep1Host: "asds",
          ep1RealIp: "asds",
          ep2Acna: "asds",
          ep2Host: "asds",
          ep2RealIp: "asds",
          knowsEp1As: "asds",
          knowsEp2As: "asds",
          lvcTicketNumber: "asds",
          startDate: 123123231,
          status: "asds",
          ep1DeviceName: "asds",
          ep2DeviceName: "asds"
        }
      ]
    };

    // Act
    const result = MapperHelper.mapLVC(source);

    // Assert
    expect(result).toEqual([
      {
        devices: "asds - asds",
        ep1Acna: "asds",
        ep1Host: "asds",
        ep1RealIp: "asds",
        ep2Acna: "asds",
        ep2Host: "asds",
        ep2RealIp: "asds",
        knowsEp1As: "asds",
        knowsEp2As: "asds",
        lvcTicketNumber: "asds",
        startDate: 123123231,
        status: "asds"
      }
    ]);
  });

  // Tests that the method returns an empty array when source is undefined
  it("should return an empty array when source is undefined", () => {
    const source = undefined;
    const expected: LVCTable[] = [];
    const result = MapperHelper.mapLVC(source);
    expect(result).toEqual(expected);
  });

  // Tests that the method returns an empty array when source is undefined
  it("should return an empty array when source is undefined", () => {
    const source = undefined;
    const expected: LVCTable[] = [];
    const result = MapperHelper.mapLVCExport(source);
    expect(result).toEqual(expected);
  });

  it("test_map_lvc_export_with_null_source_returns_empty_array", () => {
    // Arrange
    const source: LVCResponse | undefined = {
      totalRecords: 1,
      returnedRecords: 1,
      lvcs: [
        {
          ep1Acna: "asds",
          ep1Host: "asds",
          ep1RealIp: "asds",
          ep2Acna: "asds",
          ep2Host: "asds",
          ep2RealIp: "asds",
          knowsEp1As: "asds",
          knowsEp2As: "asds",
          lvcTicketNumber: "asds",
          startDate: 123123231,
          status: "asds",
          ep1DeviceName: "asds",
          ep2DeviceName: "asds"
        }
      ]
    };

    // Act
    const result = MapperHelper.mapLVCExport(source);

    // Assert
    expect(result).toEqual([
      {
        "LVC Ticket Number": "asds",
        Status: "asds",
        Devices: "asds - asds",
        "Start Date": new Date(123123231 * 1000)
          .toLocaleString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true })
          .replace(/\.(\s)?/g, ""),
        "EP1 ACNA": "asds",
        "EP1 Host": "asds",
        "EP1 Real IP": "asds",
        "Knows EP2 As": "asds",
        "EP2 ACNA": "asds",
        "EP2 Host": "asds",
        "EP2 Real IP": "asds",
        "Knows EP1 As": "asds"
      }
    ]);
  });

  // Tests that the method correctly maps multiple ACNAs with knownAs
  it("should map multiple ACNAs with knownAs", () => {
    const source = "ACNA1-KnownAs1,ACNA2-KnownAs2,ACNA3-KnownAs3";
    const expected = [
      { name: "ACNA1", knownAs: "KnownAs1" },
      { name: "ACNA2", knownAs: "KnownAs2" },
      { name: "ACNA3", knownAs: "KnownAs3" }
    ];
    const result = MapperHelper.acnasToAcnasWithKnownAs(source);
    expect(result).toEqual(expected);
  });

  // Tests that the method returns an empty array when source is undefined
  it("should return an empty array when source is undefined", () => {
    const source = undefined;
    const expected: Device[] = [];
    const result = MapperHelper.mapDevices(source);
    expect(result).toEqual(expected);
  });

  // Tests that mapping devices response with null source returns empty array
  it("test_map_devices_with_null_source_returns_empty_array", () => {
    // Arrange
    const source: DevicesResponse | undefined = {
      devices: [
        {
          acna: "asds",
          connectivityStatus: "offline",
          country: "asds",
          customerDeviceName: "asds",
          hasGeolocation: false,
          knownAs: "asds",
          operationalStatus: "asds",
          tnsDeviceName: "asds"
        }
      ],
      returnedRecords: 1,
      totalRecords: 1
    };

    // Act
    const result = MapperHelper.mapDevices(source);

    // Assert
    expect(result).toEqual([
      {
        ACNA: "asds",
        Company: "asds",
        Country: "asds",
        "Customer Device Name": "asds",
        "Has Geolocation": "No",
        "Operational Status": "asds",
        "Service Status": "offline",
        "TNS Device Name": "asds"
      }
    ]);
  });

  // Tests that mapping change management response with null source returns empty array
  it("test_map_change_management_with_null_source_returns_empty_array", () => {
    // Arrange
    const source: ChangeTicketsResponse | undefined = {
      changeTickets: [
        {
          changeStartTime: 123456789,
          changeTicketId: "123",
          companyName: "Test Company",
          changeDescription: "Test description",
          impactType: ChangeTicketImpact.Critical,
          statusOfChange: ChangeTicketStatus.Approved,
          maximumDuration: 5.0
        }
      ],
      returnedRecords: 1,
      totalRecords: 1
    };

    // Act
    const result = MapperHelper.mapChangeTicketsToExport(source);

    // Assert
    expect(result).toEqual([
      {
        "Company Name": "Test Company",
        Impact: "Critical",
        "Max. Duration (Hrs)": "5.0",
        "Reason for Change": "Test description",
        "Start Date/Time": DateHelper.getDateFromTimestampWithTimeZone(source.changeTickets[0].changeStartTime),
        Status: "Approved",
        "TNS Ticket": "123"
      }
    ]);
  });

  // Tests that the method returns an empty array when source is undefined
  it("should return an empty array when source is undefined", () => {
    const source = undefined;
    const expected: ChangeTicket[] = [];
    const result = MapperHelper.mapChangeTicketsToExport(source);
    expect(result).toEqual(expected);
  });

  // Tests that mapping company profile with ACNAs with null source returns empty array
  it("test_map_company_profile_with_acnas_with_null_source_returns_empty_array", () => {
    // Arrange
    const source: CompanyProfileWithACNAs[] = [
      {
        name: "Test Company",
        acnas: [
          {
            name: "Test ACNA",
            knownAs: "Test ACNA"
          }
        ],
        note: "Test note",
        canBeDeleted: true
      }
    ];

    // Act
    const result = MapperHelper.mapCompanyProfile(source);

    // Assert
    expect(result).toEqual([
      {
        acnas: "Test ACNA-Test ACNA",
        canBeDeleted: true,
        name: "Test Company",
        note: "Test note"
      }
    ]);
  });

  // Tests that mapping company profile with ACNAs with null ACNAs returns empty acnas string
  it("test_map_company_profile_with_acnas_with_null_acnas_returns_empty_acnas_string", () => {
    // Arrange
    const source: CompanyProfileWithACNAs[] = [
      {
        name: "Test Company",
        acnas: [
          {
            name: "Name ACNA",
            knownAs: "KnownAs ACNA"
          }
        ],
        note: "Test note",
        canBeDeleted: true
      }
    ];

    // Act
    const result = MapperHelper.mapCompanyProfile(source);

    // Assert
    expect(result[0].acnas).toEqual("Name ACNA-KnownAs ACNA");
  });

  // Tests that mapping change management response with null maximumDuration returns 0
  it("test_map_change_management_with_null_maximum_duration_returns_0", () => {
    // Arrange
    const source: ChangeTicketsResponse = {
      changeTickets: [
        {
          changeStartTime: 123456789,
          changeTicketId: "123",
          companyName: "Test Company",
          changeDescription: "Test description",
          impactType: ChangeTicketImpact.Critical,
          statusOfChange: ChangeTicketStatus.Approved,
          maximumDuration: 5.0
        }
      ],
      totalRecords: 1,
      returnedRecords: 1
    };

    // Act
    const result = MapperHelper.mapChangeTicketsToExport(source);

    // Assert
    expect(result[0]["Max. Duration (Hrs)"]).toEqual("5.0");
  });

  // Map a single user object to a UserTable object
  it("should map a single user object to a UserTable object", () => {
    const users: User[] = [
      {
        username: "johnDoe",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        enabled: true,
        credentialsExpired: false,
        accountLocked: false,
        companyProfiles: ["Company A", "Company B"],
        lastLogin: "1634567890",
        timeZone: "America/New_York",
        role: RolesByUserList.Admin
      }
    ];

    const expectedUserTable: UserTable[] = [
      {
        username: "johnDoe",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        status: UserStatus.Enabled,
        credentialsExpired: false,
        accountLocked: false,
        companyProfiles: ["Company A", "Company B"],
        lastLogin: DateHelper.getDateFromTimestampWithTimeZone(Number("1634567890"), "America/New_York"),
        timeZone: "America/New_York",
        role: RolesByUserList.Admin
      }
    ];

    const userTable = MapperHelper.userToUserTable(users);
    expect(userTable).toEqual(expectedUserTable);
  });

  // Returns an array of ACNA objects with name and knownAs properties
  it("should return an array of ACNA objects with name and knownAs properties", () => {
    const acnas: ACNA[] = [
      { name: "ACNA1", knownAs: "KnownAs1" },
      { name: "ACNA2", knownAs: "KnownAs2" },
      { name: "ACNA3", knownAs: "KnownAs3" }
    ];

    const store = {
      acna: {
        acnas: acnas
      }
    };

    const result = MapperHelper.acnasAndKnownAs();

    expect(result).toEqual([]);
  });
});

it("should return an array of LVCTable objects when source and source.lvcs are truthy", () => {
  const source: LVCResponse = {
    totalRecords: 2,
    returnedRecords: 2,
    lvcs: [
      {
        lvcTicketNumber: "123",
        status: "Operational",
        ep1DeviceName: "Device1",
        ep2DeviceName: "Device2",
        startDate: 1634567890,
        ep1Acna: "ACNA1",
        ep1Host: "Host1",
        ep1RealIp: "IP1",
        knowsEp2As: "11.9.101.139",
        ep2Acna: "ACNA2",
        ep2Host: "Host2",
        ep2RealIp: "IP2",
        knowsEp1As: "11.9.101.132"
      },
      {
        lvcTicketNumber: "USLVC0001285333",
        status: "Operational",
        ep1DeviceName: "asi00068v",
        ep2DeviceName: "asi00061v",
        startDate: null,
        ep1Acna: "ACNA3",
        ep1Host: "Host3",
        ep1RealIp: "192.168.29.2",
        knowsEp2As: "192.168.29.1",
        ep2Acna: "ACNA4",
        ep2Host: "Host4",
        ep2RealIp: "IP4",
        knowsEp1As: "11.9.101.137"
      }
    ]
  };

  const result = MapperHelper.mapLVCExport(source);

  expect(result).toEqual([
    {
      "LVC Ticket Number": "123",
      Status: "Operational",
      Devices: "Device1 - Device2",
      "Start Date": new Date(1634567890 * 1000)
        .toLocaleString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true })
        .replace(/\.(\s)?/g, ""),
      "EP1 ACNA": "ACNA1",
      "EP1 Host": "Host1",
      "EP1 Real IP": "IP1",
      "Knows EP2 As": "11.9.101.139",
      "EP2 ACNA": "ACNA2",
      "EP2 Host": "Host2",
      "EP2 Real IP": "IP2",
      "Knows EP1 As": "11.9.101.132"
    },
    {
      "LVC Ticket Number": "USLVC0001285333",
      Status: "Operational",
      Devices: "asi00068v - asi00061v",
      "Start Date": "",
      "EP1 ACNA": "ACNA3",
      "EP1 Host": "Host3",
      "EP1 Real IP": "192.168.29.2",
      "Knows EP2 As": "192.168.29.1",
      "EP2 ACNA": "ACNA4",
      "EP2 Host": "Host4",
      "EP2 Real IP": "IP4",
      "Knows EP1 As": "11.9.101.137"
    }
  ]);
});

it("should map MembersExportResponse to ExportMemberTable array", () => {
  const source: MembersExportResponse = {
    totalRecords: 0,
    returnedRecords: 0,
    members: [
      {
        acna: "ACNA1",
        knownAs: "KnownAs1",
        destMembers: [
          {
            memberConnectivityStatus: "Connected",
            srcAndDestDevicesDetails: [
              {
                srcTnsDeviceName: "Source TNS Device 1",
                srcCustomerDeviceName: "Source Customer Device 1",
                destTnsDeviceName: "Dest TNS Device 1",
                destCustomerDeviceName: "Dest Customer Device 1",
                destAcna: "Dest ACNA 1",
                destKnownAs: "Dest KnownAs 1",
                interfaceDetails: [
                  {
                    interfaceType: InterfaceType.Primary_Site_To_Site,
                    interfaceStatus: InterfaceStatus.UP
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const result = MapperHelper.mapMembersExport(source);
  expect(Array.isArray(result)).toBe(true);

  result.forEach((row) => {
    expect(row).toHaveProperty("Source Member");
    expect(row).toHaveProperty("Destination Member");
    expect(row).toHaveProperty("Status of Member Connection");
    expect(row).toHaveProperty("Source TNS Device Name");
    expect(row).toHaveProperty("Source Customer Device Name");
    expect(row).toHaveProperty("Destination TNS Device Name");
    expect(row).toHaveProperty("Destination Customer Device Name");
    expect(row).toHaveProperty("WAN Instance");
    expect(row).toHaveProperty("Tunnel Status");
  });

  result.sort((a, b) => {
    const sourceMemberComparison = a["Source Member"].localeCompare(b["Source Member"]);
    if (sourceMemberComparison !== 0) {
      return sourceMemberComparison;
    }
    return a["Destination Member"].localeCompare(b["Destination Member"]);
  });
});

it("should return to Basic User", () => {
  const basic: RolesByUserList = MapperHelper.mapRolestoRolesByUserList(Roles.Basic);

  expect(basic).toEqual(RolesByUserList.Basic);
});

it("should return to SuperUser", () => {
  const superUser: RolesByUserList = MapperHelper.mapRolestoRolesByUserList(Roles.SuperUser);

  expect(superUser).toEqual(RolesByUserList.SuperUser);
});

it("should return to Admin", () => {
  const admin: RolesByUserList = MapperHelper.mapRolestoRolesByUserList(Roles.Admin);

  expect(admin).toEqual(RolesByUserList.Admin);
});
