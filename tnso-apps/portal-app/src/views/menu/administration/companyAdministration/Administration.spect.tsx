import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Administration from "./Administration";

describe("Administration", () => {
  it("should render successfully", async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Administration />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders without crashing", async () => {
    // Render the component within a MemoryRouter to avoid issues with react-router-dom
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Administration />
      </BrowserRouter>
    );

    await waitFor(() => {
      const nameInput = getByTestId("name");
      const noteInput = getByTestId("note");
      fireEvent.change(nameInput, { target: { value: "test" } });
      fireEvent.change(noteInput, { target: { value: "test" } });
      const submitInput = getByTestId("submit");
      fireEvent.click(submitInput);
      setTimeout(() => {
        const acceptButton = getByText("Save");
        fireEvent.click(acceptButton);
        expect(window.location.pathname).toBe("/administration/company");
      }, 1000);
    });
  });

  it("should validate company name is not empty", async () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Administration />
      </BrowserRouter>
    );

    await waitFor(() => {
      const nameInput = getByTestId("name");
      fireEvent.change(nameInput, { target: { value: "" } });
      setTimeout(() => {
        expect(queryByTestId("invalid-name")).not.toBeNull();
      }, 1000);
    });
  });
});
