import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Flex, Box, Heading, Text, Tag, FormControl, FormLabel, Card, CardHeader, CardBody, Stack, StackDivider, Textarea, Button } from '@chakra-ui/react';
import { Web3Storage } from 'web3.storage';

import { WEB3STORAGE_APIKEY } from '../../keys';

const client = new Web3Storage({ token: WEB3STORAGE_APIKEY });

function PostDetail({ contract, ethAddress }) {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    const getComments = async () => {
      try{
        const newComments = await contract.getComments(id);
  
        const temp = [];
        for (let c of newComments) {
          const res = await fetch(c.cid + "/commentData.json");
          let commentData = await res.json();
          temp.push(commentData);
        }
        setComments(temp);
      } catch (error) {
        console.log(error)
      }
    }

    if (contract) getComments();
  }, [contract])

  const createComment = async () => {
    try{
      const commentData = JSON.stringify({ description, from: ethAddress });
      const blob = new Blob([commentData], {type: "text/plain"});
      const commentDataFile = new File([ blob ], 'commentData.json');

      const cid = await client.put([commentDataFile], {
        onRootCidReady: localCid => {
          console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
          console.log('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
      })

      console.log(`https://dweb.link/ipfs/${cid}`);
      const fullURL = `https://dweb.link/ipfs/${cid}`;
      const transaction = await contract.addComment(id, fullURL);
      const tx = await transaction.wait();
      console.log(tx);
    } catch(error) {
     console.error(error);
     setLoading(false);
    }  
  }

  return (
    <Container maxW='1000px'>
      <Flex borderWidth='1px' borderRadius='lg' borderColor='blue.400' overflow='hidden' p='5' mt='5'>
        <Box flex={1}>
          <Heading fontSize="3xl" mb="4">{post.title}</Heading>
          <p>{post.description}</p>
          <br />
          <Tag>{post.tags}</Tag>
          <Text mt="2">{post.from}</Text>
        </Box>
        <Box flex={1}>
          <FormControl mb='3'>
            <FormLabel htmlFor='description' fontWeight="700">
              Add Comment
            </FormLabel>
            <Textarea id='description' rows={7} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <Button colorScheme='blue' onClick={createComment}>
            Add
          </Button>
        </Box>
      </Flex>
      <Card mt="5">
        <CardHeader>
          <Heading size='md'>Comments</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {comments.map((c, i) => (
              <Box key={i}>
                <Heading size='xs' textTransform='uppercase'>
                  {c.from}
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {c.description}
                </Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Container>
  )
}

export default PostDetail;