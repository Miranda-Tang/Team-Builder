import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const MEMBERS_URL = "http://localhost:3000/api/members";

export const fetchMembersAsync = createAsyncThunk(
  "members/fetchMembersAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(MEMBERS_URL);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addMemberAsync = createAsyncThunk(
  "members/addMemberAsync",
  async (member, { rejectWithValue }) => {
    try {
      const response = await fetch(MEMBERS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteAllMembersAsync = createAsyncThunk(
  "members/deleteAllMembersAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(MEMBERS_URL, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteMemberAsync = createAsyncThunk(
  "members/deleteMemberAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${MEMBERS_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateMemberAsync = createAsyncThunk(
  "members/updateMemberAsync",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${MEMBERS_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const membersSlice = createSlice({
  name: "members",
  initialState: {
    membersList: [],
    statusFetch: "idle",
    statusAdd: "idle",
    statusDelete: "idle",
    statusUpdate: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersAsync.pending, (state) => {
        state.statusFetch = "loading";
        state.error = null;
      })
      .addCase(fetchMembersAsync.fulfilled, (state, action) => {
        state.statusFetch = "succeeded";
        state.membersList = action.payload;
      })
      .addCase(fetchMembersAsync.rejected, (state, action) => {
        state.statusFetch = "failed";
        state.error = action.payload;
      })
      .addCase(addMemberAsync.pending, (state) => {
        state.statusAdd = "loading";
        state.error = null;
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.statusAdd = "succeeded";
        state.membersList.push(action.payload);
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.statusAdd = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAllMembersAsync.pending, (state) => {
        state.statusDelete = "loading";
        state.error = null;
      })
      .addCase(deleteAllMembersAsync.fulfilled, (state) => {
        state.statusDelete = "succeeded";
        state.membersList = [];
      })
      .addCase(deleteAllMembersAsync.rejected, (state, action) => {
        state.statusDelete = "failed";
        state.error = action.payload;
      })
      .addCase(deleteMemberAsync.pending, (state) => {
        state.statusDelete = "loading";
        state.error = null;
      })
      .addCase(deleteMemberAsync.fulfilled, (state, action) => {
        state.statusDelete = "succeeded";
        state.membersList = state.membersList.filter(
          (member) => member._id !== action.payload,
        );
      })
      .addCase(deleteMemberAsync.rejected, (state, action) => {
        state.statusDelete = "failed";
        state.error = action.payload;
      })
      .addCase(updateMemberAsync.pending, (state) => {
        state.statusUpdate = "loading";
        state.error = null;
      })
      .addCase(updateMemberAsync.fulfilled, (state, action) => {
        state.statusUpdate = "succeeded";
        const index = state.membersList.findIndex(
          (member) => member._id === action.payload._id,
        );
        state.membersList[index] = action.payload;
      })
      .addCase(updateMemberAsync.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = action.payload;
      });
  },
});

export default membersSlice.reducer;
