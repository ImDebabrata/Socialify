import React from "react";
import UserForm from "../components/UserForm";
import axios from "axios";

const Home = () => {
  const onSubmit = (payload) => {
    return axios.post(`http://localhost:8080/users`, payload);
  };
  return (
    <div>
      <UserForm onSubmit={onSubmit} />
    </div>
  );
};

export default Home;
