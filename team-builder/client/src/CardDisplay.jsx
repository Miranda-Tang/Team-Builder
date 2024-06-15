import { useDispatch, useSelector } from "react-redux";
import MemberCard from "./MemberCard.jsx";
import { removeAll } from "./membersSlice.js";
import SelectedMembers from "./SelectedMembers.jsx";

const CardDisplay = () => {
  const members = useSelector((state) => state.members);
  const dispatch = useDispatch();

  return (
    <div id="card_display">
      <div id="top-bar">
        <SelectedMembers />
        <button
          id="delete_all_members"
          type="button"
          onClick={() => dispatch(removeAll())}
        >
          Delete All
        </button>
      </div>

      <ul id="member_list">
        {members.map((member) => (
          <MemberCard member={member} key={member.id} />
        ))}
      </ul>
    </div>
  );
};

export default CardDisplay;
