import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

const UserForm = ({ onSubmit, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email })
      .then(() => {
        toast({
          title: `User ${user ? "updated" : "created"} successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("error:", error);
        toast({
          title: "An error occurred",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
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
        <Button colorScheme="blue" type="submit">
          {user ? "Update" : "Create"}
        </Button>
      </VStack>
    </form>
  );
};

export default UserForm;
