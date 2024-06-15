import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    isSelected: false,
    name: "$crooge",
    description: "Lucky Dime enthusiast",
    age: 75,
    image:
      "https://ih1.redbubble.net/image.2110784518.0513/pp,840x830-pad,1000x1000,f8f8f8.jpg",
  },
  {
    id: 2,
    isSelected: false,
    name: "Gladstone",
    description: "The luckiest duck in the world",
    age: 27,
    image:
      "https://p8.itc.cn/q_70/images03/20200703/682da6af38d44dd8a988001ba1b6397c.jpeg",
  },
  {
    id: 3,
    isSelected: false,
    name: "Gyro",
    description: "A brilliant yet absent-minded scientist",
    age: 31,
    image:
      "https://i.pinimg.com/originals/94/a2/41/94a241f3fc27139cd0357e57a7402d05.jpg",
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
    toggleSelect: function (state, action) {
      const member = state.find((member) => member.id === action.payload);
      member.isSelected = !member.isSelected;
    },
  },
});

export default membersSlice.reducer;

export const { add, remove, removeAll, toggleSelect } = membersSlice.actions;
