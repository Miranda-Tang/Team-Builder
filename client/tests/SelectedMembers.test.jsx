import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import membersReducer, * as membersSlice from "../src/membersSlice";
import SelectedMembers from "../src/SelectedMembers";
import React from "react";

vi.mock("../src/membersSlice", () => ({
  __esModule: true,
  updateMemberAsync: vi.fn(
    () => (dispatch) =>
      Promise.resolve({
        type: "members/updateMemberAsync",
        payload: {
          id: "1",
          updates: { isSelected: false },
        },
      }).then(dispatch),
  ),
  default: (state = { membersList: [], statusFetch: "idle" }, action) => {
    switch (action.type) {
      case "members/updateMemberAsync":
        const index = state.membersList.findIndex(
          (member) => member._id === action.payload.id,
        );
        if (index !== -1) {
          return {
            ...state,
            membersList: state.membersList.map((member, i) =>
              i === index ? { ...member, ...action.payload.updates } : member,
            ),
          };
        }
        return state;
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

describe("SelectedMembers", () => {
  it("triggers update action on deselect button click", async () => {
    const member = {
      _id: "1",
      name: "John Doe",
      description: "Developer",
      image: "url1",
      isSelected: true,
      team: "",
    };
    const initialState = {
      members: {
        membersList: [member],
      },
    };
    const { getByText } = renderWithRedux(<SelectedMembers />, {
      initialState,
    });
    await act(async () => {
      fireEvent.click(getByText("X")); // Click deselect button
    });
    await vi.waitFor(() =>
      expect(membersSlice.updateMemberAsync).toHaveBeenCalledWith({
        id: "1",
        updates: { isSelected: false },
      }),
    );
  });
});
