import { MemberHelper } from "./MemberHelper";
import { AcnaStatus, MemberConnectivityStatus, MembersGraphResponse } from "../../interfaces/memberConnectivity/memberConnectivity";
import { DiagramSchema } from "beautiful-react-diagrams/@types/DiagramSchema";
import { CustomNode } from "../../components/membersConnectivity/CustomNode";
import { COLORS } from "../../utils/const/colors";

describe("MemberHelper", () => {
  it("test_create_schema_graph_duplicate_dest_acna", () => {
    const memberGraph: MembersGraphResponse = {
      srcAcna: "srcAcna",
      srcAcnaStatus: AcnaStatus.fullService,
      srcKnownAs: "srcKnownAs",
      connectedMembers: [
        {
          destAcna: "destAcna",
          destAcnaStatus: AcnaStatus.fullService,
          destKnownAs: "destKnownAs",
          memberConnectivityStatus: MemberConnectivityStatus.DOWN
        }
      ]
    };

    const diagramSchema: DiagramSchema<unknown> = {
      nodes: [
        {
          content: "srcAcna",
          id: "srcAcna",
          coordinates: [450, 280],
          render: (props: any) => (
            <CustomNode
              {...props}
              backgroundColor={COLORS.MEMBERS.NODE[memberGraph.srcAcnaStatus as keyof typeof COLORS.MEMBERS.NODE]}
              status={memberGraph.srcAcnaStatus}
              text={memberGraph.srcAcna}
            />
          )
        },
        {
          content: "destAcna",
          id: "destAcna",
          coordinates: [780, 280],
          render: (props: any) => (
            <CustomNode
              {...props}
              backgroundColor={COLORS.MEMBERS.NODE[memberGraph.srcAcnaStatus as keyof typeof COLORS.MEMBERS.NODE]}
              status={memberGraph.srcAcnaStatus}
              text={memberGraph.srcAcna}
            />
          )
        }
      ],
      links: [
        {
          className: "link-down",
          input: "srcAcna",
          output: "destAcna"
        }
      ]
    };

    const response = MemberHelper.createSchemaGraph(memberGraph);

    expect(diagramSchema.nodes[0].content).toEqual(response.nodes[0].content);
  });

  // Tests that an input with all uppercase letters is correctly converted to mixed case
  it("should convert an input with all uppercase letters to mixed case", () => {
    const input = "Up-Full Site-to-Site";
    const expectedOutput = "upFullSiteToSite";
    const output = MemberHelper.modifyStatus(input);
    expect(output).toEqual(expectedOutput);
  });

  // Tests that the method returns an object with default values when no parameters are passed
  it("should return an object with default values when no parameters are passed", () => {
    const result = MemberHelper.builderMembersExportQueryParams();
    expect(result).toEqual({ startAtRecord: 0, recordsPerPage: 10 });
  });

  // Tests that the method returns an object with the correct startAtRecord and recordsPerPage values when currentPage is passed
  it("should return an object with the correct startAtRecord and recordsPerPage values when currentPage is passed", () => {
    const result = MemberHelper.builderMembersExportQueryParams({ currentPage: 2 });
    expect(result).toEqual({ startAtRecord: 20, recordsPerPage: 10 });
  });

  // Tests that the method returns an object with default query parameters when no arguments are passed
  it("should return an object with default query parameters when no arguments are passed", () => {
    const expected = {
      startAtRecord: 0,
      recordsPerPage: 10
    };
    const result = MemberHelper.builderMembersExportQueryParams();
    expect(result).toEqual(expected);
  });

  // Tests that the method returns an object with the correct tableFilters values when tableFilters is passed
  it("should return an object with the correct tableFilters values when tableFilters is passed", () => {
    const tableFilters = { acna: "12345" };
    const result = MemberHelper.builderMembersExportQueryParams({ tableFilters });
    expect(result).toEqual({ acna: "12345", startAtRecord: 0, recordsPerPage: 10 });
  });

  // Tests that the method returns an object with updated query parameters when arguments are passed
  it("should return an object with updated query parameters when arguments are passed", () => {
    const expected = {
      startAtRecord: 20,
      recordsPerPage: 50,
      acna: "12345"
    };
    const result = MemberHelper.builderMembersExportQueryParams({
      currentPage: 2,
      recordsPerPage: 50,
      tableFilters: { acna: "12345" }
    });
    expect(result).toEqual(expected);
  });
});
