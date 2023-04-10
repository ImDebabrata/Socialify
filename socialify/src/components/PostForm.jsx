import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

const PostForm = ({ onSubmit, postContent, allPosts, updatePosts, id }) => {
  const toast = useToast();
  const [content, setContent] = useState(postContent || "");

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content })
      .then((res) => {
        console.log("res:", res);
        toast({
          title: res.data.res,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        //if post already exists
        if (postContent) {
          const updatedPost = allPosts.find((_post) => _post._id === id);
          const updatedPostIndex = allPosts.indexOf(updatedPost);
          updatedPost.content = content;
          allPosts.splice(updatedPostIndex, 1, updatedPost);
          //creating new array for dom updating
          const newArr = [...allPosts];
          updatePosts(newArr);
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
    <form onSubmit={handleSubmit}>
      <FormControl mt={4}>
        <FormLabel>Post Content</FormLabel>
        <Textarea
          name="content"
          value={content}
          onChange={handleInputChange}
          placeholder="Enter post content"
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit" w={"100%"}>
        {postContent ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};

export default PostForm;
