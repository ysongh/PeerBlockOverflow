import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SimpleGrid, Box, Heading, InputGroup, Input, InputRightElement, Text, Tag, Button } from '@chakra-ui/react';

function Posts() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <Container maxW='1000px'>
      <Heading>Find Posts</Heading>
      <InputGroup bg='white' mt='4'>
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <InputRightElement>
          <Text mr="2" color="blue" fontWeight="bold">Find</Text>
        </InputRightElement>
      </InputGroup>
      <SimpleGrid minChildWidth='300px' spacing='5px'>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Title</Heading>
          <Text textAlign="center" fontSize="xl" mb="4">Detail....</Text>
          <Tag>React</Tag>
          <br />
          <Button mt="4" onClick={() => navigate(`/post`)}>View</Button>
        </Box>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Title</Heading>
          <Text textAlign="center" fontSize="xl" mb="4">Detail....</Text>
          <Tag>JS</Tag>
          <br />
          <Button mt="4" onClick={() => navigate(`/post`)}>View</Button>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Posts;