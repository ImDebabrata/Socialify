import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

function UserInfo({ name, email, bio, created_at, updated_at }) {
  console.log("updated_at:", updated_at);
  return (
    <Box
      border="1px solid #E2E8F0"
      borderRadius="md"
      boxShadow="md"
      padding="4"
      maxW="400px"
    >
      <Flex alignItems="center" mb="4">
        <Box as={FaUserCircle} size="40px" color="gray.500" mr="2" />
        <Text fontWeight="bold">{name}</Text>
      </Flex>
      <Text mb="2">{email}</Text>
      <Text mb="4">{bio}</Text>
      {/* Created time */}
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Badge variant="solid" colorScheme="green">
          Joined {new Date(created_at).toLocaleDateString()}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          {new Date(created_at).toLocaleTimeString()}
        </Text>
      </Flex>
      {/* Updated time */}
      {updated_at && (
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Badge variant="solid" colorScheme="yellow">
            Updated {new Date(updated_at).toLocaleDateString()}
          </Badge>
          <Text fontSize="sm" color="gray.500">
            {new Date(updated_at).toLocaleTimeString()}
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default UserInfo;
