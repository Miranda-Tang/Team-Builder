import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import membersReducer, * as membersSlice from "../src/membersSlice";
import MemberForm from "../src/MemberForm";
import React from "react";

vi.mock("../src/membersSlice", () => ({
  __esModule: true,
  addMemberAsync: vi.fn(
    () => (dispatch) =>
      Promise.resolve({
        type: "members/addMemberAsync",
        payload: {
          name: "John Doe",
          description: "Developer",
          age: "30",
          image: "http://example.com/image.jpg",
          isSelected: false,
        },
      }).then(dispatch),
  ),
  default: vi.fn((state = { membersList: [], statusFetch: "idle" }, action) => {
    switch (action.type) {
      case "members/addMemberAsync":
        return {
          ...state,
          membersList: [...state.membersList, action.payload],
        };
      default:
        return state;
    }
  }),
}));

const renderWithRedux = (
  component,
  {
    initialState,
    store = configureStore({
      reducer: { members: membersReducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      preloadedState: initialState,
    }),
  } = {},
) => {
  return { ...render(<Provider store={store}>{component}</Provider>), store };
};

describe("MemberForm", () => {
  it("submits the form with member details", async () => {
    renderWithRedux(<MemberForm />);

    fireEvent.change(screen.getByLabelText(/Member Name:/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Description:/i), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByLabelText(/Member Age:/i), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByLabelText(/Image URL:/i), {
      target: { value: "http://example.com/image.jpg" },
    });

    fireEvent.click(screen.getByText(/Add Member/i));

    await vi.waitFor(() =>
      expect(membersSlice.addMemberAsync).toHaveBeenCalledWith({
        name: "John Doe",
        description: "Developer",
        age: "30",
        image: "http://example.com/image.jpg",
        isSelected: false,
      }),
    );
  });
});
