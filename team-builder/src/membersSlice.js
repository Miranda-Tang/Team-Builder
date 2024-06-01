import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: Date.now(),
    name: "Miranda T.",
    description: "Scrooge McDuck's hardcore fan\nLucky Dime enthusiast",
    age: 25,
    image: "https://avatars.githubusercontent.com/u/81618041?v=4",
  },
];

const membersSlice = createSlice({
  name: "members",
  initialState, // object property value shorthand
  reducers: {
    add: function (state, action) {
      state.push(action.payload);
    },
    remove: function (state, action) {
      // We use filter to remove the member with matching ID.
      return state.filter((member) => member.id !== action.payload);
    },
    removeAll: function (state) {
      return [];
    },
  },
});

export default membersSlice.reducer;

export const { add, remove, removeAll } = membersSlice.actions;
