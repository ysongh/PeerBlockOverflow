import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
} from '@chakra-ui/react';

function Home() {
  const router = useNavigate();

  return (
    <div>
      <Container mt="16" mb="20" textAlign="center">
        <Heading as="h1" size="2xl" mb="6">
          Welcome to Your Blockchain Q&A Platform
        </Heading>
        <Text fontSize="xl" color="gray.600" mb="8">
          Ask and answer questions about blockchain technology in a decentralized community.
        </Text>
        <Button colorScheme="blue" size="lg" onClick={() => router('/posts')}>
          Get Started
        </Button>
      </Container>

      <Box bg="gray.100" p="10">
        <Container textAlign="center">
          <Heading as="h2" size="xl" mb="3">
            Key Features
          </Heading>
          <Text fontSize="lg" color="gray.600" mb="10">
            Explore the features that make PeerBlock Overflow unique.
          </Text>

          <Box textAlign="left" mb="4">
            <Heading as="h3" size="lg" mb="2">
              Post Question Cross Chain
            </Heading>
            <Text fontSize="md" color="gray.600">
              Seamlessly post questions that span across different blockchain networks and get
              answers from a diverse community.
            </Text>
          </Box>

          <Box textAlign="left" mb="4">
            <Heading as="h3" size="lg" mb="2">
              Content Stored on IPFS
            </Heading>
            <Text fontSize="md" color="gray.600">
              Securely store all platform content on the InterPlanetary File System (IPFS),
              ensuring decentralized and censorship-resistant access to information.
            </Text>
          </Box>

          <Box textAlign="left">
            <Heading as="h3" size="lg" mb="2">
              Get Reward When Answering
            </Heading>
            <Text fontSize="md" color="gray.600">
              Earn rewards in cryptocurrency for providing valuable answers to questions posted by
              others in the community.
            </Text>
          </Box>
        </Container>
      </Box>
    </div>
  )
}

export default Home;