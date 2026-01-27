import React from "react";
import {
  render,
  screen,
  within,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Board from "../components/Board";

afterEach(() => {
  cleanup();
});

describe("Kanban Board", () => {
  test("Load with 3 columns - Todo, In Progress, Done", () => {
    render(<Board />);
    const todoColumn = screen.getByTestId("column-todo");
    const inProgressColumn = screen.getByTestId("column-inprogress");
    const doneColumn = screen.getByTestId("column-done");
    expect(todoColumn).toBeInTheDocument();
    expect(inProgressColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
    expect(within(todoColumn).getByText("To Do")).toBeInTheDocument();
    expect(
      within(inProgressColumn).getByText("In Progress"),
    ).toBeInTheDocument();
    expect(within(doneColumn).getByText("Done")).toBeInTheDocument();
  });

  test("Load with 'Setup project' in Todo column", () => {
    render(<Board />);
    const todoColumn = screen.getByTestId("column-todo");
    const withinTodo = within(todoColumn);
    expect(withinTodo.getByText("Setup project")).toBeInTheDocument();
  });
  test("Load with 'Design UI' in In Progress column", () => {
    render(<Board />);
    const inProgressColumn = screen.getByTestId("column-inprogress");
    const withinInProgress = within(inProgressColumn);
    expect(withinInProgress.getByText("Design UI")).toBeInTheDocument();
  });
  test("Load with 'Implement API' in Done column", () => {
    render(<Board />);
    const doneColumn = screen.getByTestId("column-done");
    const withinDone = within(doneColumn);
    expect(withinDone.getByText("Implement API")).toBeInTheDocument();
  });

  test("Card Shows its title", () => {
    render(<Board />);
    const todoColumn = screen.getByTestId("column-todo");
    const withinTodo = within(todoColumn);
    expect(
      within(withinTodo.getAllByTestId("task-card")[0]).getByTestId(
        "task-card-title",
      ),
    ).toBeInTheDocument();
  });

  test("Card contains 2 buttons - Forward & Backward", () => {
    render(<Board />);
    const todoColumn = screen.getByTestId("column-todo");
    const withinTodo = within(todoColumn);
    const withinCard = within(withinTodo.getAllByTestId("task-card")[0]);
    expect(
      withinCard.getByTestId("task-card-backward-btn"),
    ).toBeInTheDocument();
    expect(withinCard.getByTestId("task-card-forward-btn")).toBeInTheDocument();
  });

  test("Clicking Forward moves task forward - Todo -> In Progress -> Done", () => {
    render(<Board />);
    const todoColumn = screen.getByTestId("column-todo");
    const inProgressColumn = screen.getByTestId("column-inprogress");
    const doneColumn = screen.getByTestId("column-done");

    let card = within(todoColumn).getByText("Setup project")?.parentNode;
    let forwardbtn = within(card).getByTestId("task-card-forward-btn");
    fireEvent.click(forwardbtn);
    expect(
      within(todoColumn).queryByText("Setup project"),
    ).not.toBeInTheDocument();
    expect(
      within(inProgressColumn).queryByText("Setup project"),
    ).toBeInTheDocument();

    card = within(inProgressColumn).getByText("Setup project")?.parentNode;
    forwardbtn = within(card).getByTestId("task-card-forward-btn");
    fireEvent.click(forwardbtn);
    expect(
      within(inProgressColumn).queryByText("Setup project"),
    ).not.toBeInTheDocument();
    expect(within(doneColumn).queryByText("Setup project")).toBeInTheDocument();

    card = within(doneColumn).getByText("Setup project")?.parentNode;
    forwardbtn = within(card).getByTestId("task-card-forward-btn");
    fireEvent.click(forwardbtn);
    expect(within(doneColumn).queryByText("Setup project")).toBeInTheDocument();
  });

  test("Clicking Backward moves task backward - Todo <- In Progress <- Done", () => {
    render(<Board />);
    const todoColumn = screen.getByTestId("column-todo");
    const inProgressColumn = screen.getByTestId("column-inprogress");
    const doneColumn = screen.getByTestId("column-done");

    let card = within(doneColumn).getByText("Implement API")?.parentNode;
    let backwardBtn = within(card).getByTestId("task-card-backward-btn");
    fireEvent.click(backwardBtn);
    expect(
      within(doneColumn).queryByText("Implement API"),
    ).not.toBeInTheDocument();
    expect(
      within(inProgressColumn).queryByText("Implement API"),
    ).toBeInTheDocument();

    card = within(inProgressColumn).getByText("Implement API")?.parentNode;
    backwardBtn = within(card).getByTestId("task-card-backward-btn");
    fireEvent.click(backwardBtn);
    expect(
      within(inProgressColumn).queryByText("Implement API"),
    ).not.toBeInTheDocument();
    expect(within(todoColumn).queryByText("Implement API")).toBeInTheDocument();

    card = within(todoColumn).getByText("Implement API")?.parentNode;
    backwardBtn = within(card).getByTestId("task-card-backward-btn");
    fireEvent.click(backwardBtn);
    expect(within(todoColumn).queryByText("Implement API")).toBeInTheDocument();
  });
});
