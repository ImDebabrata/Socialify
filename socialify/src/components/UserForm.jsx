import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Box,
} from "@chakra-ui/react";

const UserForm = ({ onSubmit, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email })
      .then((res) => {
        toast({
          title: res.data.res,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "An error occurred",
          description: error.response.data.res,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      w={{ base: "100%", md: "450px" }}
      mx={"auto"}
      boxShadow={"lg"}
      p={"15px"}
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Enter Bio</FormLabel>
            <Input
              type="text"
              placeholder="Enter your Bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            {user ? "Update" : "Create"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
