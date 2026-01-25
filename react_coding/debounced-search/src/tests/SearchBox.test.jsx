import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { vi, describe, test, expect, afterEach } from "vitest";
import SearchBox from "../components/SearchBox";

afterEach(() => {
  cleanup();
});

describe("Debounced Search", () => {
  test("Call onSearch result 500ms after the user stops typing", () => {
    vi.useFakeTimers();

    const onSearch = vi.fn();
    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "hello" } });

    expect(onSearch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(500);

    expect(onSearch).toHaveBeenCalledWith("hello");
    expect(onSearch).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  test("Cancel previous debounce when typing again", () => {
    vi.useFakeTimers();

    const onSearch = vi.fn();
    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "hello" } });
    expect(onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(onSearch).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: input.value + " world" } });
    expect(onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(onSearch).toHaveBeenCalledWith("hello world");
    expect(onSearch).toHaveBeenCalledOnce();

    vi.useRealTimers();
  });

  test("Empty Input does not call onSearch", () => {
    vi.useFakeTimers();

    const onSearch = vi.fn();
    render(<SearchBox onSearch={onSearch} />);
    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "" } });
    expect(onSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(onSearch).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
