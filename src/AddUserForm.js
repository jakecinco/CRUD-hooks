import React, { useState } from "react";

const AddUserForm = props => {
  // We need to create state for the form inputs
  const initialFormState = { id: null, name: "", username: "" };
  const [user, setUser] = useState(initialFormState);

  // Handleing user input
  const handleInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //handling when form submits

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!user.name || !user.username) return;
        props.addUser(user);
        // Think this below resets for input values
        setUser(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
