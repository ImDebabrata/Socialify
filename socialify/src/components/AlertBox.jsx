import { Box, Text, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import baseApi from "../baseApi";

function AlertBox({ onDelete, setUsers, users, id }) {
  const toast = useToast();
  const handleDelete = () => {
    onDelete()
      .then((res) => {
        toast({
          title: res.data.res,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .then(() => {
        const allUserAfterDelete = users.filter((user) => user._id !== id);
        setUsers(allUserAfterDelete);
      })
      .catch((error) =>
        toast({
          title: "An error occurred",
          description: error.response.data.res,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
  };
  return (
    <Box
      width="100%"
      bg="#f8d7da"
      color="#721c24"
      p="20px"
      borderRadius="5px"
      boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
      textAlign="center"
    >
      <Text fontSize="18px" mb="20px">
        Delete User?
      </Text>
      <Button
        onClick={handleDelete}
        colorScheme="red"
        size="sm"
        fontWeight="bold"
        _hover={{ bg: "red.600" }}
      >
        Confirm
      </Button>
    </Box>
  );
}

export default AlertBox;
