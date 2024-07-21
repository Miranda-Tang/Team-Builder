import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import membersReducer, * as membersSlice from "../src/membersSlice";
import MemberCard from "../src/MemberCard";
import React from "react";

vi.mock("../src/membersSlice", () => ({
  __esModule: true,
  deleteMemberAsync: vi.fn(
    () => (dispatch) =>
      Promise.resolve({
        type: "members/deleteMemberAsync",
        payload: "1",
      }).then(dispatch),
  ),
  default: (state = { membersList: [], statusFetch: "idle" }, action) => {
    switch (action.type) {
      case "members/deleteMemberAsync":
        return {
          ...state,
          membersList: state.membersList.filter(
            (member) => member._id !== action.payload,
          ),
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

describe("MemberCard", () => {
  it("renders member information", () => {
    const member = {
      _id: "1",
      name: "John Doe",
      description: "Developer",
      image: "url1",
      isSelected: false,
      team: "",
    };
    const initialState = {
      members: {
        membersList: [member],
      },
    };
    renderWithRedux(<MemberCard member={member} />, { initialState });
    expect(screen.getByText(member.name)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see details/i }),
    ).toBeInTheDocument();
  });

  it("triggers delete action on button click", async () => {
    const member = {
      _id: "1",
      name: "John Doe",
      description: "Developer",
      image: "url1",
      isSelected: false,
      team: "",
    };
    const initialState = {
      members: {
        membersList: [member],
      },
    };
    renderWithRedux(<MemberCard member={member} />, { initialState });
    screen.getByText("X").click();
    await vi.waitFor(() =>
      expect(membersSlice.deleteMemberAsync).toHaveBeenCalledTimes(1),
    );
  });
});
