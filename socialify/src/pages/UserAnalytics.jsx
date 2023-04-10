import React, { useState, useEffect } from "react";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import baseApi from "../baseApi";

const UserAnalytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [topActiveUsers, setTopActiveUsers] = useState([]);

  useEffect(() => {
    // Fetch total number of users
    axios.get(`${baseApi()}/analytics/users`).then((response) => {
      setTotalUsers(response.data.totalUsers);
    });

    // Fetch top 5 most active users
    axios.get(`${baseApi()}/analytics/users/top-active`).then((response) => {
      setTopActiveUsers(response.data.topActiveUsers);
    });
  }, []);

  return (
    <div>
      <Heading mb={6}>User Analytics</Heading>

      <Text mb={4}>
        Total number of users: <strong>{totalUsers}</strong>
      </Text>
      {/* users lists */}
      <Text mb={5}>Top most {topActiveUsers.length} active users</Text>
      {topActiveUsers.map((user) => {
        return (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
            <Flex alignItems="center" mb="4">
              <Avatar icon={<FaUserCircle />} mr="4" />
              <Text fontSize="2xl" fontWeight="bold">
                {user.name}
              </Text>
            </Flex>
            <Text fontSize="lg" mb="2">
              Email: {user.email}
            </Text>
            <Text fontSize="lg" mb="2">
              Bio: {user.bio}
            </Text>
            <Text fontSize="lg" mb="2">
              Created At: {user.created_at}
            </Text>
            <Text fontSize="lg" mb="2">
              Updated At: {user.updated_at}
            </Text>
            <Text fontSize="lg" mb="2">
              Total Posts: {user.totalPosts}
            </Text>
          </Box>
        );
      })}
    </div>
  );
};

export default UserAnalytics;
