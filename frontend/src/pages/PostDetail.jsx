import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Center, Box, Heading, Tag } from '@chakra-ui/react';

function PostDetail({ contract }) {
  const { id } = useParams();

  const [post, setPost] = useState({});
  
  useEffect(() => {
    const getPost = async () => {
      const newPost = await contract.posts(id);

      const res = await fetch(newPost.cid + "/postData.json");
      const postData = await res.json();

      setPost(postData);
    }

    if (contract) getPost();
  }, [contract])

  return (
    <Container maxW='1000px'>
      <Center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">{post.title}</Heading>
          <p>{post.description}</p>
          <br />
          <Tag>{post.tags}</Tag>
        </Box>
      </Center>
    </Container>
  )
}

export default PostDetail;