import { useDispatch, useSelector } from "react-redux";
import { updateMemberAsync } from "./membersSlice.js";
import React, { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { Snackbar } from "@mui/material";
import TeamFormation from "./TeamFormation.jsx";

const SelectedMembers = () => {
  const [membersSnapshot, setMembersSnapshot] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formTeam, setFormTeam] = useState(false);

  const selectedMembers = useSelector(
    (state) => state.members.membersList,
  ).filter((member) => member.isSelected);

  // A 'useEffect' that will be triggered every time 'selectedMembers' changes
  useEffect(() => {
    if (selectedMembers.length === 4) {
      setShowSnackbar(false);
      setFormTeam(true);
    } else {
      if (selectedMembers.length > 4) {
        setShowSnackbar(true);
      } else {
        setShowSnackbar(false);
      }
      setFormTeam(false);
    }
  }, [selectedMembers]);

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="selected-members">
        {selectedMembers.map((member) => (
          <div className="avatar-container" key={member._id}>
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
                    id: member._id,
                    updates: { isSelected: false },
                  }),
                )
              }
            >
              X
            </button>
          </div>
        ))}

        {formTeam && (
          <button
            onClick={() => {
              setMembersSnapshot([...selectedMembers]);
              setShowModal(true);
            }}
          >
            Form a Team
          </button>
        )}
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        message="You can only select 4 members for your team!"
      />

      {showModal && (
        <Modal>
          <TeamFormation members={membersSnapshot} />
          <div id="button-container">
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SelectedMembers;
