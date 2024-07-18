import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMemberAsync } from "./membersSlice.js";

const InputField = ({ label, id, type, value, onChange, ...rest }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <br />
    <input
      id={id}
      name={id}
      required
      type={type}
      value={value}
      onChange={onChange}
      {...rest}
    />
    <br />
  </>
);

const TextAreaField = ({ label, id, value, onChange, ...rest }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <br />
    <textarea
      id={id}
      name={id}
      required
      value={value}
      onChange={onChange}
      {...rest}
    />
    <br />
  </>
);

const MemberForm = () => {
  const dispatch = useDispatch();
  const initialFormData = {
    name: "",
    description: "",
    age: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const addMember = (e) => {
    e.preventDefault();

    const newMember = {
      isSelected: false,
      ...formData,
    };

    dispatch(addMemberAsync(newMember));

    clearForm();
  };

  return (
    <form id="member_form" onSubmit={addMember}>
      <InputField
        label="Member Name:"
        id="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextAreaField
        label="Description:"
        id="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <InputField
        label="Member Age:"
        id="age"
        type="number"
        min="1"
        max="100"
        value={formData.age}
        onChange={handleInputChange}
      />
      <InputField
        label="Image URL:"
        id="image"
        type="text"
        value={formData.image}
        onChange={handleInputChange}
      />

      <div id="button-container">
        <button id="add_member" type="submit">
          Add Member
        </button>
        <button id="clear_form" type="button" onClick={clearForm}>
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default MemberForm;
