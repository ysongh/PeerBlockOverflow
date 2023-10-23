import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SimpleGrid, Box, Heading, InputGroup, Input, InputRightElement, Text, Tag, Button } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";

function Posts({ contract }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

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
  
  return (
    <Container maxW='1100px'>
      <Heading>Find Posts</Heading>
      <InputGroup bg='white' mt='4'>
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
      <SimpleGrid minChildWidth='300px' spacing='5px'>
        {posts.map(p => (
          <Box key={p.id} borderWidth='1px' borderRadius='lg' borderColor='blue.400' overflow='hidden' p='5' mt='5'>
            <Heading textAlign="center" fontSize="3xl" mb="4">{p.title}</Heading>
            <Text textAlign="center" fontSize="xl" mb="4">{p.description}</Text>
            <Tag>{p.tags}</Tag>
            <br />
            <Button mt="4" onClick={() => navigate(`/post/${p.id}`)}>View</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Posts;