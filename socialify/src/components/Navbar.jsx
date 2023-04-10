import {
  Flex,
  Box,
  Spacer,
  Button,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg="gray.700"
      px={4}
      py={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          color="white"
        >
          My Project
        </Link>
      </Box>
      <Box
        display={{ base: "block", md: "none" }}
        onClick={isOpen ? onClose : onOpen}
      >
        <GiHamburgerMenu fontSize="xl" color="white" />
      </Box>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
      >
        <Box mr={4}>
          <Link as={RouterLink} to="/" color="white">
            Add User
          </Link>
        </Box>
        <Box mr={4}>
          <Link as={RouterLink} to="/add-post" color="white">
            Add Post
          </Link>
        </Box>
        <Box mr={4}>
          <Link as={RouterLink} to="/all-users" color="white">
            All Users
          </Link>
        </Box>
        <Box mr={4}>
          <Link as={RouterLink} to="/all-posts" color="white">
            All Posts
          </Link>
        </Box>
        <Box mr={4}>
          <Link as={RouterLink} to="/post-analytics" color="white">
            Post Analytics
          </Link>
        </Box>
        <Box mr={4}>
          <Link as={RouterLink} to="/user-analytics" color="white">
            User Analytics
          </Link>
        </Box>
        <Spacer />
      </Box>
    </Flex>
  );
};

export default Navbar;
