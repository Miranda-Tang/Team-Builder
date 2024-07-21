import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "../src/membersSlice";
import CardDisplay from "../src/CardDisplay";
import React from "react";

// tells the test runner to mock the membersSlice module
vi.mock("../src/membersSlice", () => ({
  __esModule: true,
  fetchMembersAsync: vi.fn(
    () => (dispatch) =>
      Promise.resolve({
        type: "members/fetchMembersAsync",
        payload: [
          {
            _id: "1",
            name: "John Doe",
            description: "Developer",
            image: "url1",
            isSelected: false,
            team: "",
          },
          {
            _id: "2",
            name: "Jane Doe",
            description: "Designer",
            image: "url2",
            isSelected: false,
            team: "",
          },
        ],
      }).then(dispatch),
  ),
  default: (state = { membersList: [], statusFetch: "idle" }, action) => {
    switch (action.type) {
      case "members/fetchMembersAsync":
        return {
          ...state,
          membersList: action.payload,
          statusFetch: "succeeded",
        };
      default:
        return state;
    }
  },
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

describe("CardDisplay", () => {
  it("renders loading state", () => {
    const initialState = {
      members: { statusFetch: "loading", membersList: [] },
    };
    renderWithRedux(<CardDisplay />, { initialState });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    const initialState = {
      members: { statusFetch: "failed", membersList: [] },
    };
    renderWithRedux(<CardDisplay />, { initialState });
    expect(screen.getByText(/error fetching members/i)).toBeInTheDocument();
  });

  it("renders members list successfully", async () => {
    const initialState = {
      members: {
        statusFetch: "idle",
        membersList: [
          {
            _id: "1",
            name: "John Doe",
            description: "Developer",
            image: "url1",
            isSelected: false,
            team: "",
          },
          {
            _id: "2",
            name: "Jane Doe",
            description: "Designer",
            image: "url2",
            isSelected: false,
            team: "",
          },
        ],
      },
    };
    renderWithRedux(<CardDisplay />, { initialState });
    await waitFor(() => {
      const memberCards = screen.getAllByRole("listitem");
      expect(memberCards.length).toBe(2);
    });
  });
});
