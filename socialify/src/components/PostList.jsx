import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import PopupModal from "./PopupModal";
import PostInfo from "./PostInfo";
import PostForm from "./PostForm";
import AlertBox from "./AlertBox";
import axios from "axios";
import baseApi from "../baseApi";

const PostList = ({ post, allPosts, updatePosts }) => {
  const { content, likes, _id } = post;
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
    return axios.delete(`${baseApi()}/posts/${_id}`);
  }
  function onUpdate({ content }) {
    return axios.put(`${baseApi()}/posts/${_id}`, { content });
  }

  //Like Unlike
  function handleLike() {
    axios.post(`${baseApi()}/posts/${_id}/like`).then((res) => {
      const updatedPost = allPosts.find((_post) => _post._id === _id);
      const updatedPostIndex = allPosts.indexOf(updatedPost);
      updatedPost.likes = updatedPost.likes + 1;
      allPosts.splice(updatedPostIndex, 1, updatedPost);
      //creating new array for dom updating
      const newArr = [...allPosts];
      updatePosts(newArr);
    });
  }
  function handleDislike() {
    axios.post(`${baseApi()}/posts/${_id}/unlike`).then((res) => {
      const updatedPost = allPosts.find((_post) => _post._id === _id);
      const updatedPostIndex = allPosts.indexOf(updatedPost);
      if (updatePosts.likes <= 0) {
        return alert("Dislikes can't be negative");
      }
      updatedPost.likes = updatedPost.likes - 1;
      allPosts.splice(updatedPostIndex, 1, updatedPost);
      //creating new array for dom updating
      const newArr = [...allPosts];
      updatePosts(newArr);
    });
  }
  return (
    <>
      <PopupModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        heading={
          modalType === "view"
            ? "Post Info"
            : modalType === "delete"
            ? "Delete Post"
            : "Update Post"
        }
      >
        {modalType === "view" ? (
          <PostInfo {...post} />
        ) : modalType === "update" ? (
          <PostForm
            postContent={content}
            onSubmit={onUpdate}
            allPosts={allPosts}
            updatePosts={updatePosts}
            id={_id}
          />
        ) : (
          <AlertBox
            id={_id}
            onDelete={onDelete}
            users={allPosts}
            setUsers={updatePosts}
          />
        )}
      </PopupModal>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
        <Text fontSize="xl">{content}</Text>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="2"
        >
          <Box>
            <Button
              colorScheme="blue"
              size="sm"
              mr="2"
              onClick={handleViewClick}
            >
              View
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              mr="2"
              onClick={handleEditClick}
            >
              Update
            </Button>
            <Button colorScheme="teal" size="sm" mr="2" onClick={handleLike}>
              Like ({likes})
            </Button>
            <Button colorScheme="red" size="sm" mr="2" onClick={handleDislike}>
              Unlike
            </Button>
          </Box>
          <Button colorScheme="red" size="sm" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PostList;
