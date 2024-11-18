import React from 'react';
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App.js";
import { UserProvider } from "./Context/UserContext";

jest.mock("./Context/CartContext", () => ({
  CartContextProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("./Context/CounterContext", () => ({
  CounterContextProvider: ({ children }) => <div>{children}</div>,
}));

describe("App Component", () => {
  test("renders without crashing and shows a route", () => {
    render(
      <UserProvider>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </UserProvider>
    );

    // Example: Check for a specific route element
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
