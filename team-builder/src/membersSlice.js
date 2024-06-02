import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: Date.now(),
    isSelected: false,
    name: "Miranda",
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
      return state.filter((member) => member.id !== action.payload);
    },
    removeAll: function () {
      return [];
    },
    select: function (state, action) {
      const member = state.find((member) => member.id === action.payload);
      member.isSelected = !member.isSelected;
    },
  },
});

export default membersSlice.reducer;

export const { add, remove, removeAll, select } = membersSlice.actions;
