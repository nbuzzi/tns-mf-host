import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TreeMenuGroup } from "./TreeMenuGroup";

describe("TreeMenuGroup", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TreeMenuGroup />);
    expect(baseElement).toBeTruthy();
  });
});
