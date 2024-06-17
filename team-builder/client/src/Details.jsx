import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMemberAsync } from "./membersSlice";

const Details = ({ member }) => {
  const [saveStatus, setSaveStatus] = useState("saved");
  const [age, setAge] = useState(member.age);
  const [description, setDescription] = useState(member.description);
  const dispatch = useDispatch();

  const handleSave = () => {
    setSaveStatus("saving");
    dispatch(
      updateMemberAsync({ id: member.id, updates: { age, description } }),
    )
      .unwrap() // The .unwrap() properly differentiates between resolved and rejected actions
      .then(() => {
        setTimeout(() => {
          setSaveStatus("saved");
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to save the changes: ", error);
        setSaveStatus("unsaved");
      });
  };

  return (
    <>
      <img id="avatar" src={member.image} alt={member.name} />
      <textarea
        className="description-input"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setSaveStatus("unsaved");
        }}
      />
      <div className="age-input-container">
        <label htmlFor="age-input">Age:</label>
        <input
          className="age-input"
          name="age-input"
          type="number"
          min="1"
          max="100"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setSaveStatus("unsaved");
          }}
        />
      </div>
      <button
        className={`save-changes-button ${saveStatus === "saving" ? "saving" : ""}`}
        onClick={handleSave}
        disabled={saveStatus === "saved"}
      >
        Save Changes
      </button>
    </>
  );
};

export default Details;
