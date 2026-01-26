import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import App from "../App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  test("Page shows 3 tabs - Tab 1, Tab 2, Tab 3", async () => {
    render(<App />);
    expect(await screen.findByTestId("tab-1")).toBeInTheDocument();
    expect(await screen.findByTestId("tab-2")).toBeInTheDocument();
    expect(await screen.findByTestId("tab-3")).toBeInTheDocument();
  });

  test("Clicking on Tab 1 loads Tab 1", async () => {
    render(<App />);
    const targetTab = await screen.findByTestId("tab-1");
    fireEvent.click(targetTab);
    expect(await screen.findByTestId("tab-content-1")).toBeInTheDocument();
  });

  test("Clicking on Tab 2 loads Tab 2", async () => {
    render(<App />);
    const targetTab = await screen.findByTestId("tab-2");
    fireEvent.click(targetTab);
    expect(await screen.findByTestId("tab-content-2")).toBeInTheDocument();
  });

  test("Clicking on Tab 3 loads Tab 3", async () => {
    render(<App />);
    const targetTab = await screen.findByTestId("tab-3");
    fireEvent.click(targetTab);
    expect(await screen.findByTestId("tab-content-3")).toBeInTheDocument();
  });
});
