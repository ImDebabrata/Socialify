import React, { useState, useEffect } from "react";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import baseApi from "../baseApi";

const PostAnalytics = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  useEffect(() => {
    // Fetch total number of users
    axios.get(`${baseApi()}/analytics/posts`).then((response) => {
      setTotalPosts(response.data.totalPosts);
    });

    // Fetch top 5 most active users
    axios.get(`${baseApi()}/analytics/posts/top-liked`).then((response) => {
      console.log("response:", response);
      setTopLikedPosts(response.data.topPosts);
    });
  }, []);

  return (
    <div>
      <Heading mb={6}>Posts Analytics</Heading>

      <Text mb={4}>
        Total number of Posts: <strong>{totalPosts}</strong>
      </Text>
      {/* posts lists */}
      <Text mb={5}>Top most {topLikedPosts.length} liked posts</Text>
      {topLikedPosts.map((post) => {
        return (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
            <Text fontSize="2xl" fontWeight="bold">
              {post.content}
            </Text>
            <Text fontSize="lg" mb="2">
              Likes: {post.likes}
            </Text>
            <Text fontSize="lg" mb="2">
              Created At: {post.created_at}
            </Text>
            <Text fontSize="lg" mb="2">
              Updated At: {post.updated_at}
            </Text>
          </Box>
        );
      })}
    </div>
  );
};

export default PostAnalytics;
