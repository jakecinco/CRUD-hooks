import React, { useState, Fragment } from "react";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

const App = () => {
  const usersData = [{ id: 1, name: "Michelle", username: "scott" }];
  const [users, setUsers] = useState(usersData);

  //EDITING
  // First make state to define is editing is on, set to false initially.
  const [editing, setEditing] = useState(false);

  // since we dont know who is being editing until they are selected, we create intial
  //empty state for the form.

  const initialFormState = { id: null, name: "", username: "" };
  // we want to see who we are editing, so we apply empty user to currentState
  const [currentUser, setCurrentUser] = useState(initialFormState);

  // when edit is selected on user, we need to turn on edit mode, and set current user.
  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  //We still need a function to update User for edit, unlike Delete that filters out by id,
  // and add which appends user to the array, Update needs to map through the array,
  // and update the user that matches the ID passed thorough.
  // so we need 2 paramteres , the updated user object and the ID

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  }; // Now we need to make the edit form. EditUserForm.js

  //ADDING NEW USERS AND ID
  //Incrementing ID manually to new users. This function takes user object as a
  // parameter, and adds them to the users array of objects.

  const addUser = user => {
    // Ah incrementing, users.length + 1 is the user object
    user.id = users.length + 1;

    //this is adding new user input from form to users object
    setUsers([...users, user]);
  };

  //DELETING a user
  // I think what this is doing is filtering Id(clicked) and returning all the ID's
  // that do not match the clicked ID, therefore removing(using filter). Retunring new array
  // with clicked ID filtered out.

  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };

  // UPDATE WE TOGGLE USING TEIRNARY

  return (
    <div className="container">
      <h1>CRUD app with hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {/* This whole section is a condition for editing */}
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Users</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
          {/* Editing conditional Ends here */}
        </div>
        <div className="flex-large">
          <h2>View Users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};
export default App;

// so to Edit, its similiar to adding a user, but we have to identify the user with the ID
//normally we would use ComponentDidUpdate, but here we can use UseEffect.
// When edit action is selected, the "adduser form" will become "edit user",
// it will be pre-populated with the data from the selected user. We will also add a cancel edit.
