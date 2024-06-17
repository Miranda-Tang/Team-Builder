import { useDispatch, useSelector } from "react-redux";
import { updateMemberAsync } from "./membersSlice.js";

const SelectedMembers = () => {
  const selectedMembers = useSelector(
    (state) => state.members.membersList,
  ).filter((member) => member.isSelected);
  const dispatch = useDispatch();

  return (
    <div className="selected-members">
      {selectedMembers.map((member) => (
        <div className="avatar-container" key={member.id}>
          <img
            className="selected-member-avatar"
            src={member.image}
            alt={member.name}
          />
          <button
            className="deselect-member-button"
            onClick={() =>
              dispatch(
                updateMemberAsync({
                  id: member.id,
                  updates: { isSelected: false },
                }),
              )
            }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedMembers;
