import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMemberAsync } from "./membersSlice.js";

const TeamFormation = ({ members }) => {
  const [saveStatus, setSaveStatus] = useState("saved");
  const [teamName, setTeamName] = useState("");
  const dispatch = useDispatch();

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const teamResponse = await fetch("http://localhost:3000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamName,
          members: members.map((member) => member._id),
        }),
      });

      if (!teamResponse.ok) {
        throw new Error(teamResponse.statusText);
      }

      const teamJsonResponse = await teamResponse.json();

      const updateMembersPromises = members.map((member) =>
        dispatch(
          updateMemberAsync({
            id: member._id,
            updates: {
              team: teamJsonResponse._id,
              isSelected: false,
            },
          }),
        ),
      );

      await Promise.all(updateMembersPromises);

      setTimeout(() => {
        setSaveStatus("saved");
      }, 1000);
    } catch (error) {
      console.error("Failed to save the changes: ", error);
      setSaveStatus("unsaved");
    }
  };

  return (
    <>
      <div className="top-bar team-formation">
        <div className="selected-members">
          {members.map((member) => (
            <div className="avatar-container" key={member._id}>
              <img
                className="selected-member-avatar"
                src={member.image}
                alt={member.name}
              />
            </div>
          ))}
        </div>
      </div>

      <label htmlFor="age-input">Team Name:</label>
      <input
        className="teamName-input"
        name="teamName-input"
        value={teamName}
        onChange={(e) => {
          setTeamName(e.target.value);
          setSaveStatus("unsaved");
        }}
      />
      <button
        className={`save-changes-button ${saveStatus === "saving" ? "saving" : ""}`}
        onClick={handleSave}
        disabled={saveStatus === "saved"}
      >
        Form a Team
      </button>
    </>
  );
};

export default TeamFormation;
