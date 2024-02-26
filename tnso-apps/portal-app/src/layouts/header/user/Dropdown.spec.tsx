import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import { ProfileDD } from "./Dropdown";
import { store } from "../../../store/StoreMobx";

describe("ProfileDD", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ProfileDD />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  test("should navigate to /user/profile when the my profile link is clicked", () => {
    render(
      <BrowserRouter>
        <ProfileDD />
      </BrowserRouter>
    );

    const myProfileLink = screen.getByTestId("dropdown-my-profile");
    fireEvent.click(myProfileLink);
  });
});

describe('ProfileDD component', () => {
  it("should redirect to user profile when clicking anywhere in Dropdown.Item", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <ProfileDD />
      </MemoryRouter>
    );
    const dropdownItem = getByRole("my-profile");
    fireEvent.click(dropdownItem)
    setTimeout(() => {
      expect(window.location.pathname).toBe("/user/profile");
    }, 1000);
    });
    setTimeout(() => {
      expect(localStorage.getItem("menuItemSelected")).toBeNull();
      expect(localStorage.getItem("openKeys")).toBe([]);
    }, 1000);
  });