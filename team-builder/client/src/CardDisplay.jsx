import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberCard from "./MemberCard.jsx";
import SelectedMembers from "./SelectedMembers.jsx";
import { deleteAllMembersAsync, fetchMembersAsync } from "./membersSlice.js";
import SearchBar from "./SearchBar.jsx";

const CardDisplay = () => {
  const { membersList, statusFetch } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusFetch === "idle") {
      dispatch(fetchMembersAsync());
    }
  }, [statusFetch, dispatch]);

  if (statusFetch === "loading") {
    return <div>Loading...</div>;
  }

  if (statusFetch === "failed") {
    return <div>Error fetching members</div>;
  }

  return (
    <div id="card_display">
      <div id="top-bar">
        <SelectedMembers />
        <div className="right-aligned-components">
          <SearchBar membersList={membersList} />
          <button
            id="delete_all_members"
            type="button"
            onClick={() => dispatch(deleteAllMembersAsync())}
          >
            Delete All
          </button>
        </div>
      </div>

      <ul id="member_list">
        {membersList.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </ul>
    </div>
  );
};

export default CardDisplay;
