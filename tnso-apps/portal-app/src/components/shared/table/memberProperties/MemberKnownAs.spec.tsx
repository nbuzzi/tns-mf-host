import React from "react";
import { render, screen } from "@testing-library/react";
import { ComponentKnownAs } from "./MemberKnownAs";
describe("ComponentKnownAs", () => {
 it("should render the component with acna and knownAs props", () => {
   const acna = "apna";
   const knownAs = "Auspaynet";
   render(<ComponentKnownAs acna={acna} knownAs={knownAs} />);
   const partnerText = screen.getByText(`${acna} - ${knownAs}`);
   expect(partnerText).toBeDefined();
   expect(partnerText).not.toBeNull();
 });
});