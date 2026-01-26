import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import Counter from "../components/Counter";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

describe("History Controller", () => {
  test("Counter shows an initial value of 0", async () => {
    render(<Counter />);
    const counterText = await screen.getByTestId("counter-value");
    expect(counterText.textContent).toContain("0");
  });
  test("It has a increment button - 'Increase'", () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId("increment-btn");
    expect(incrementBtn).toBeInTheDocument();
  });
  test("It has a decrement button - 'Decrease", () => {
    render(<Counter />);
    const decrementBtn = screen.getByTestId("decrement-btn");
    expect(decrementBtn).toBeInTheDocument();
  });
  test("It has a Undo button", () => {
    render(<Counter />);
    const undoBtn = screen.getByTestId("undo-btn");
    expect(undoBtn).toBeInTheDocument();
  });
  test("It has a Redo button", () => {
    render(<Counter />);
    const redoBtn = screen.getByTestId("redo-btn");
    expect(redoBtn).toBeInTheDocument();
  });

  test("Clicking Increment increases count value by 1", () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId("increment-btn");
    const counterText = screen.getByTestId("counter-value");
    fireEvent.click(incrementBtn);
    expect(counterText.textContent).toContain("1");
  });
  test("Clicking Decrement decreases count value by 1", () => {
    render(<Counter />);
    const decrementBtn = screen.getByTestId("decrement-btn");
    const counterText = screen.getByTestId("counter-value");
    fireEvent.click(decrementBtn);
    expect(counterText.textContent).toContain("-1");
  });

  test("Clicking Undo reverts count to previous value", () => {
    render(<Counter />);
    const undoBtn = screen.getByTestId("undo-btn");
    const incrementBtn = screen.getByTestId("increment-btn");
    const counterText = screen.getByTestId("counter-value");
    fireEvent.click(incrementBtn);
    expect(counterText.textContent).toContain("1");
    fireEvent.click(undoBtn);
    expect(counterText.textContent).toContain("0");
  });
  test("Clicking Redo restores count value to undone value", () => {
    render(<Counter />);
    const undoBtn = screen.getByTestId("undo-btn");
    const redoBtn = screen.getByTestId("redo-btn");
    const incrementBtn = screen.getByTestId("increment-btn");
    const counterText = screen.getByTestId("counter-value");
    fireEvent.click(incrementBtn);
    expect(counterText.textContent).toContain("1");
    fireEvent.click(undoBtn);
    expect(counterText.textContent).toContain("0");
    fireEvent.click(redoBtn);
    expect(counterText.textContent).toContain("1");
  });
  test("Undo button is Disabled when no History", () => {
    render(<Counter />);
    const undoBtn = screen.getByTestId("undo-btn");
    expect(undoBtn).toHaveAttribute("disabled");
  });
  test("Redo button is Disabled when there is no Future", () => {
    render(<Counter />);
    const redoBtn = screen.getByTestId("redo-btn");
    expect(redoBtn).toHaveAttribute("disabled");
  });
});
