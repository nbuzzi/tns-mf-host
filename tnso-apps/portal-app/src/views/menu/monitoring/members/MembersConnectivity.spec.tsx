import React, { useMemo } from "react";
import { render, fireEvent } from "@testing-library/react";
import MembersConnectionsInternal from "./tabs/MembersConnections";
import { renderHook } from "@testing-library/react-hooks";
import membersConnectivity from "../../../../store/memberConnectivity/MemberConnectivity";
describe("MembersConnectionsInternal", () => {
  test("renders without errors", () => {
    render(<MembersConnectionsInternal isTabMembers={true} />);
  });
  test("Tests No member selected text", () => {
    const { getByTestId } = render(<MembersConnectionsInternal isTabMembers={false} />);
    const noMemberText = getByTestId("empty-message");
    expect(noMemberText).toBeDefined;
  });
});
