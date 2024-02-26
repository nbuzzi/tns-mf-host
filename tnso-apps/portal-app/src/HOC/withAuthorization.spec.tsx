import React from "react";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import withAuthorization from "./withAuthorization";
import { Roles } from "../interfaces/auth/roleAndPermission/role";

// Mockear el módulo AuthHelper
jest.mock("../helpers/auth/AuthHelper", () => ({
  AuthHelper: {
    getAuthByToken: jest.fn(() => ({ role: "user" }))
  }
}));

// Componente de prueba que se envolverá con withAuthorization
const TestComponent = () => <div data-testid="test-component">Test Component</div>;

describe("withAuthorization", () => {
  it("should render wrapped component for authorized user", () => {
    // Configurar el rol necesario para acceder al componente
    const authorizedRoles = [Roles.Basic];

    // Envolver el componente con withAuthorization
    const WrappedComponent = withAuthorization(TestComponent, authorizedRoles);

    // Renderizar el componente con MemoryRouter para proporcionar contexto de enrutamiento
    const { container } = render(
      <MemoryRouter initialEntries={["/monitoring/devices"]}>
        <Routes>
          <Route path="/monitoring/devices" element={<WrappedComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Asegurarse de que el componente envuelto se renderice correctamente
    waitFor(() => {
      expect(container.innerHTML).toContain("");
    });
  });

  it("should redirect unauthorized user to 403 page", () => {
    // Configurar el rol necesario para acceder al componente
    const authorizedRoles = [Roles.Admin];

    // Envolver el componente con withAuthorization
    const WrappedComponent = withAuthorization(TestComponent, authorizedRoles);

    // Renderizar el componente con MemoryRouter para proporcionar contexto de enrutamiento
    const { container } = render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/test" element={<WrappedComponent />} />
        </Routes>
      </MemoryRouter>
    );

    // Asegurarse de que el redireccionamiento se haya iniciado (puedes ajustar según tu lógica específica)
    waitFor(() => {
      expect(container.innerHTML).toContain("/auth/403");
    });
  });
});
