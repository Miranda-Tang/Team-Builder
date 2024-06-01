import { useDispatch } from "react-redux";
import { remove } from "./membersSlice.js";
import { useState } from "react";
import Modal from "./Modal.jsx";

const MemberCard = ({ member }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <li>
      <div className="member-image">
        <img
          src={member.image}
          alt={member.name}
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="member-info">
        <div className="member-name">
          <h2>{member.name}</h2>
        </div>
      </div>
      <button
        className="delete-button"
        onClick={() => dispatch(remove(member.id))}
      >
        X
      </button>
      {showModal ? (
        <Modal>
          <div>
            <div className="buttons">
              <button>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </li>
  );
};

export default MemberCard;
