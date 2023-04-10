import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Select } from "@chakra-ui/react";
import baseApi from "../baseApi";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const onSubmit = ({ content }) => {
    return axios.post(`${baseApi()}/posts`, {
      content,
      user_id: selectedUser,
    });
  };

  useEffect(() => {
    axios
      .get(`${baseApi()}/users`)
      .then((res) => setUser(res.data.users))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      w={{ base: "100%", md: "450px" }}
      mx={"auto"}
      boxShadow={"lg"}
      p={"15px"}
    >
      <Heading>Create Post</Heading>
      <Select
        onChange={(e) => setSelectedUser(e.target.value)}
        placeholder="Select User"
      >
        {user.map((user) => {
          return (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          );
        })}
      </Select>
      <PostForm onSubmit={onSubmit} />
    </Box>
  );
};

export default CreatePost;
