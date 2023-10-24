import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Center, Box, Heading, Tag, FormControl, FormLabel, Textarea, Button } from '@chakra-ui/react';

function PostDetail({ contract }) {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    const getPost = async () => {
      const newPost = await contract.posts(id);

      const res = await fetch(newPost.cid + "/postData.json");
      const postData = await res.json();

      setPost(postData);
    }

    if (contract) getPost();
  }, [contract])

  const handleSubmit = async () => {

  }

  return (
    <Container maxW='1000px'>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='blue.400' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">{post.title}</Heading>
          <p>{post.description}</p>
          <br />
          <Tag>{post.tags}</Tag>
        </Box>
      </Center>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='blue.400' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading fontSize='2xl' mb='3'>Add Comment</Heading>
          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Textarea id='description' rows={7} onChange={(e) => setDescription(e.target.value)}/>
          </FormControl>
          <Button colorScheme='blue' onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Center>
    </Container>
  )
}

export default PostDetail;