import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Box,
  Heading,
} from "@chakra-ui/react";

const UserForm = ({ onSubmit, user, setUsers, users }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email, bio })
      .then((res) => {
        console.log("res:", res);
        toast({
          title: res.data.res,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        //if user already exists
        if (user) {
          const updatedUser = users.find((_user) => _user._id === user._id);
          const updatedUserIndex = users.indexOf(updatedUser);
          updatedUser.name = name;
          updatedUser.bio = bio;
          users.splice(updatedUserIndex, 1, updatedUser);
          //creating new array for dom updating
          const newArr = [...users];
          setUsers(newArr);
        }
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
    <Box>
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
          {!user && (
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          )}
          <FormControl id="bio">
            <FormLabel>Enter Bio</FormLabel>
            <Input
              type="text"
              placeholder="Enter your Bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </FormControl>
          <Button w={"100%"} colorScheme="blue" type="submit">
            {user ? "Update" : "Create"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
