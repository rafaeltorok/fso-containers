// Test dependencies
import { describe, test, expect, beforeEach, vi, beforeAll } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import Todo from "../Todo";

// Constants
let deleteTodo;
let completeTodo;
let user;

// Tests
describe("The Todo component", () => {
  beforeAll(() => {
    // Clear the function call count
    vi.clearAllMocks();

    // Mock both prop functions
    deleteTodo = vi.fn();
    completeTodo = vi.fn();

    // Setup the user event to handle button clicks
    user = userEvent.setup();
  });

  describe("Basic Todo item rendering", () => {
    beforeEach(() => {
      // Create a Todo item
      const todo = { text: "My todo", done: false };

      // Render the component
      render(
        <Todo
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />,
      );
    });

    test("the todo content is properly displayed", async () => {
      // Confirm the Todo text is being displayed
      await expect(screen.getByText(/my todo/i)).toBeInTheDocument();
    });

    test("the delete button is present", async () => {
      // Get the respective button element from a Todo
      const todoItem = screen.getByText(/my todo/i).closest("div");
      const deleteButton = within(todoItem).getByRole("button", {
        name: /delete/i,
      });

      // Assert it exists
      await expect(deleteButton).toBeInTheDocument();
    });

    test("a todo that is not done, should contain the set as done button", async () => {
      // Get the respective button element from a Todo
      const todoItem = screen.getByText(/my todo/i).closest("div");
      const setAsDoneButton = within(todoItem).getByRole("button", {
        name: /set as done/i,
      });

      // Assert it is present
      await expect(setAsDoneButton).toBeInTheDocument();
    });
  });

  describe("The delete button", () => {
    beforeEach(() => {
      // Create a Todo item
      const todo = { text: "My todo", done: false };

      // Render the component
      render(
        <Todo
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />,
      );
    });

    test("the button correctly calls the deleteTodo function", async () => {
      // Get the respective button element from the Todo
      const todoItem = screen.getByText(/my todo/i).closest("div");
      const deleteButton = within(todoItem).getByRole("button", {
        name: /delete/i,
      });

      // Click on the delete button
      await user.click(deleteButton);

      // Confirm the function has been called
      await expect(deleteTodo).toHaveBeenCalledOnce();
    });
  });

  describe("The set as done button", () => {
    test("clicking on the button should call the completeTodo function", async () => {
      // Create a Todo item
      const todo = { text: "My todo", done: false };

      // Render the component
      render(
        <Todo
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />,
      );

      // Get the respective button element from a Todo
      const todoItem = screen.getByText(/my todo/i).closest("div");
      const setAsDoneButton = within(todoItem).getByRole("button", {
        name: /set as done/i,
      });

      // Assert it is present
      await expect(setAsDoneButton).toBeInTheDocument();

      // Click on the button
      await user.click(setAsDoneButton);

      // Confirm the function has been called once
      await expect(completeTodo).toHaveBeenCalledOnce();
    });

    test("a done todo should not display the button", async () => {
      // Create a Todo item
      const todo = { text: "My todo", done: true };

      // Render the component
      render(
        <Todo
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />,
      );

      // Get the respective button element from a Todo
      const todoItem = screen.getByText(/my todo/i).closest("div");
      const setAsDoneButton = within(todoItem).queryByRole("button", {
        name: /set as done/i,
      });

      // Assert it is not present
      await expect(setAsDoneButton).not.toBeInTheDocument();
    });
  });
});
