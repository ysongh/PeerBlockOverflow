import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SimpleGrid, Box, Heading, Text, Tag, Button } from '@chakra-ui/react';

function Posts() {
  const navigate = useNavigate(); 

  return (
    <Container maxW='1000px'>
      <Heading>Projects</Heading>
      <SimpleGrid minChildWidth='120px' spacing='40px'>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading textAlign="center" fontSize="3xl" mb="4">Title</Heading>
          <Text textAlign="center" fontSize="xl" mb="4">Detail....</Text>
          <Tag>React</Tag>
          <br />
          <Button mt="4" onClick={() => navigate(`/post`)}>View</Button>
        </Box>
        <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
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