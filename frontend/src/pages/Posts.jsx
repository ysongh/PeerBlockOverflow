import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Box, Link, InputGroup, Input, InputRightElement, Flex, Spacer, Heading, Text, Tag } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

function Posts({ contract }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try{
        console.log(contract)
        const newPosts = await contract.getPosts();
  
        const temp = [];
        for (let p of newPosts) {
          const res = await fetch(p.cid + "/postData.json");
          let postData = await res.json();
          postData.id = p.id.toString();
          temp.push(postData);
        }
        setPosts(temp);
      } catch (error) {
        console.log(error)
      }
    }

    if (contract) getPosts();
  }, [contract])

  useEffect(() => {
    const getMessage = async () => {
      const data = await contract.getLastReceivedMessageDetails();
      console.log(data);
      setMessage(data);
    }

    if (contract) getMessage();
  }, [])
  
  return (
    <Container maxW='1100px'>
      <Heading>Find Posts</Heading>
      <InputGroup bg='white' mt='4'>
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <Stack spacing={4} mt={8}>
        {posts.map(p => (
          <Box key={p.id} p={4} borderWidth="1px" borderRadius="lg">
            <Link fontSize="30px" color="blue.700" fontWeight="bold" mb={2} onClick={() => navigate(`/post/${p.id}`)}>
              {p.title}
            </Link>
            <Text fontSize="sm" color="gray.600">
              {p.description}
            </Text>
            <Flex>
              <Tag mt="2">{p.tags}</Tag>
              <Spacer />
              <Text fontSize="sm" color="gray.600" mt="3">
                Asked by {p.from}
              </Text>
            </Flex>
          </Box>
        ))}
      </Stack>
      <Text mt="2">{message.messageId}</Text>
      <Text>{message.text}</Text>
    </Container>
  )
}

export default Posts;