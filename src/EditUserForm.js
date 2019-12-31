import React, { useState, useEffect } from "react";

const EditUserForm = props => {
  const [user, setUser] = useState(props.currentUser);

  // We want to let the EditUserForm component know the props have changed,
  // which we would have done before with componentDidUpdate.
  // n the Effect Hook, we create a callback function that updates the user state with the new
  // prop thats being sent through. Before, we needed to compare
  // if (prevProps.currentUser !== this.state.currentUser),
  // but with the Effect Hook we can just pass [props] through to let it
  // know we're watching props. If your doing a one time event pass an empty array instead

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = e => {
    // setUser({ ...user, [e.target.name]: e.target.value });

    // Deconstructed
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.updateUser(user.id, user);
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
      <button> Update User </button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
