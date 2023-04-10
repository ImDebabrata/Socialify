import React, { useEffect, useState } from "react";
import { Box, Heading, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import axios from "axios";
import UserList from "../components/UserList";
import baseApi from "../baseApi";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseApi()}/users`)
      .then((res) => setUsers(res.data.users))
      .catch((err) => {
        console.log("err:", err);
        setError(true);
      });
  }, []);
  return (
    <div>
      <Box>
        <Heading as="h1" size="xl" mb="6">
          User List
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>View</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => {
              return (
                <UserList
                  key={user._id}
                  {...user}
                  users={users}
                  setUsers={setUsers}
                />
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default AllUsers;
