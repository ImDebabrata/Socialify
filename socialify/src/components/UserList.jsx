import React, { useState } from "react";
import PopupModal from "./PopupModal";
import UserForm from "./UserForm";
import AlertBox from "./AlertBox";
import UserInfo from "./UserInfo";

import { Tr, Td, Button } from "@chakra-ui/react";
import axios from "axios";
import baseApi from "../baseApi";

const UserList = ({
  email,
  name,
  bio,
  _id,
  created_at,
  updated_at,
  users,
  setUsers,
}) => {
  const userData = { email, name, bio, _id, created_at, updated_at };
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  function handleViewClick() {
    setModalType("view");
    setIsOpen(true);
    console.log("View clicked", _id);
  }

  function handleEditClick() {
    setModalType("update");
    console.log("Edit clicked", _id);
    setIsOpen(true);
  }

  function handleDeleteClick() {
    setModalType("delete");
    setIsOpen(true);
    console.log("Delete clicked", _id);
  }

  //Modal functionallity
  function onDelete() {
    return axios.delete(`${baseApi()}/users/${_id}`);
  }
  function onUpdate({ name, bio }) {
    return axios.put(`${baseApi()}/users/${_id}`, { name, bio });
  }
  return (
    <>
      <Tr>
        <Td>
          <PopupModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            heading={
              modalType === "view"
                ? "User Info"
                : modalType === "delete"
                ? "Delete User"
                : "Update User"
            }
          >
            {modalType === "update" ? (
              <UserForm
                user={{ email, name, bio, _id }}
                onSubmit={onUpdate}
                setUsers={setUsers}
                users={users}
              />
            ) : modalType === "delete" ? (
              <AlertBox
                id={_id}
                onDelete={onDelete}
                users={users}
                setUsers={setUsers}
              />
            ) : (
              <UserInfo {...userData} />
            )}
          </PopupModal>
          {name}
        </Td>
        <Td>{email}</Td>
        <Td>
          <Button onClick={handleViewClick} colorScheme="blue">
            View
          </Button>
        </Td>
        <Td>
          <Button onClick={handleEditClick} colorScheme="yellow">
            Edit
          </Button>
        </Td>
        <Td>
          <Button onClick={handleDeleteClick} colorScheme="red">
            Delete
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default UserList;
