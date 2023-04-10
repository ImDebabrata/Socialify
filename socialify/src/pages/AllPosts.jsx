import React, { useEffect, useState } from "react";
import { Box, Heading, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import axios from "axios";
import baseApi from "../baseApi";
import PostList from "../components/PostList";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  console.log("posts:", posts);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseApi()}/posts`)
      .then((res) => setPosts(res.data.posts))
      .catch((err) => {
        console.log("err:", err);
        setError(true);
      });
  }, []);
  return (
    <div>
      <Box>
        <Heading as="h1" size="xl" mb="6">
          Post List
        </Heading>
        {posts.map((post) => {
          return (
            <PostList
              key={post._id}
              post={post}
              allPosts={posts}
              updatePosts={setPosts}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default AllPosts;
