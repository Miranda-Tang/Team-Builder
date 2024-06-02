import { useDispatch, useSelector } from "react-redux";
import { toggleSelect } from "./membersSlice.js";

const SelectedMembers = () => {
  const selectedMembers = useSelector((state) => state.members).filter(
    (member) => member.isSelected,
  );
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
            onClick={() => dispatch(toggleSelect(member.id))}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedMembers;
