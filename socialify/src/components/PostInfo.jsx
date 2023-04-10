import { Badge, Box, Flex, Text } from "@chakra-ui/react";

function PostInfo({ content, likes, created_at, updated_at, userName }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Text fontSize="xl" fontWeight="bold" mb="2">
        {content}
      </Text>
      <Text fontSize="sm" color="gray.500" mb="2">
        Likes: {likes}
      </Text>
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Badge variant="solid" colorScheme="green">
          Created {new Date(created_at).toLocaleDateString()}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          {new Date(created_at).toLocaleTimeString()}
        </Text>
      </Flex>
      {updated_at && (
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Badge variant="solid" colorScheme="green">
            Updated {new Date(updated_at).toLocaleDateString()}
          </Badge>
          <Text fontSize="sm" color="gray.500">
            {new Date(updated_at).toLocaleTimeString()}
          </Text>
        </Flex>
      )}
      <Text fontSize="sm" color="gray.500" mb="2">
        User Name: {userName}
      </Text>
    </Box>
  );
}

export default PostInfo;
