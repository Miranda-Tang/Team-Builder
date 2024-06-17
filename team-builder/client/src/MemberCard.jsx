import { useDispatch } from "react-redux";
import { deleteMemberAsync, updateMemberAsync } from "./membersSlice.js";
import { useState } from "react";
import Modal from "./Modal.jsx";
import Details from "./Details.jsx";

const MemberCard = ({ member }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <li>
      <div className="member-image">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="member-info">
        <h2 className="member-name">{member.name}</h2>
        <button onClick={() => setShowModal(true)}>See Details</button>
      </div>
      <button
        className="delete-button"
        onClick={() => dispatch(deleteMemberAsync(member.id))}
      >
        X
      </button>
      {showModal ? (
        <Modal>
          <Details member={member} />
          <div id="button-container">
            <button
              onClick={() => {
                dispatch(
                  updateMemberAsync({
                    id: member.id,
                    updates: { isSelected: true },
                  }),
                );
                setShowModal(false);
              }}
              disabled={member.isSelected}
            >
              Select
            </button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      ) : null}
    </li>
  );
};

export default MemberCard;
