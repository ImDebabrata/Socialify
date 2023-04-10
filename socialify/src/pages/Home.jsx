import React from "react";
import UserForm from "../components/UserForm";
import axios from "axios";
import { Box, Heading } from "@chakra-ui/react";
import baseApi from "../baseApi";

const Home = () => {
  const onSubmit = (payload) => {
    return axios.post(`${baseApi()}/users`, payload);
  };
  return (
    <Box
      w={{ base: "100%", md: "450px" }}
      mx={"auto"}
      boxShadow={"lg"}
      p={"15px"}
    >
      <Heading>Register User</Heading>
      <UserForm onSubmit={onSubmit} />
    </Box>
  );
};

export default Home;
