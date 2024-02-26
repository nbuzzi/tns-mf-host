import React from "react";
import { render } from "@testing-library/react";
import { ConnectedGraph } from "./ConnectedGraph";
import { AcnaStatus, MemberConnectivityStatus, MembersGraphResponse } from "../../interfaces/memberConnectivity/memberConnectivity";

describe("ConnectedGraph", () => {
  const membersGraph: MembersGraphResponse = {
    srcAcna: "asl",
    srcKnownAs: "automated",
    srcAcnaStatus: AcnaStatus.fullService,
    connectedMembers: [
      {
        destAcna: "asl1",
        destKnownAs: "automated1",
        destAcnaStatus: AcnaStatus.fullService,
        memberConnectivityStatus: MemberConnectivityStatus.DOWN
      }
    ]
  };

  it("should render without errors", () => {
    render(<ConnectedGraph membersGraph={membersGraph} />);
  });
});
