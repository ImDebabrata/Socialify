import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import AllUsers from "./AllUsers";
import AllPosts from "./AllPosts";
import PostAnalytics from "./PostAnalytics";
import UserAnalytics from "./UserAnalytics";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-post" element={<CreatePost />} />
      <Route path="/all-users" element={<AllUsers />} />
      <Route path="/all-posts" element={<AllPosts />} />
      <Route path="/post-analytics" element={<PostAnalytics />} />
      <Route path="/user-analytics" element={<UserAnalytics />} />
    </Routes>
  );
};

export default AllRoute;
