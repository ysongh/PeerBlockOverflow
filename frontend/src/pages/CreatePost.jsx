import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Box, ButtonGroup, Spinner, Input, Textarea, Heading, Button } from '@chakra-ui/react';
import { Web3Storage } from 'web3.storage';

import { WEB3STORAGE_APIKEY } from '../../keys';

const client = new Web3Storage({ token: WEB3STORAGE_APIKEY });

function CreateCoupon({ contract, ethAddress }) {
  const router = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const [loading, setLoading] = useState(false);

  const uploadToIPFS = async () => {
    const postData = JSON.stringify({ title, description, tags, from: ethAddress });
    const blob = new Blob([postData], {type: "text/plain"});
    const postDataFile = new File([ blob ], 'postData.json');

    const cid = await client.put([postDataFile], {
      onRootCidReady: localCid => {
        console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
        console.log('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
    })

    console.log(`https://dweb.link/ipfs/${cid}`);
    const fullURL = `https://dweb.link/ipfs/${cid}`;
    return fullURL;
  }

  const createPost = async () => {
    try{
      setLoading(true);
      const fullURL = uploadToIPFS();
      const transaction = await contract.addPost(fullURL);
      const tx = await transaction.wait();
      console.log(tx);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }  
  }

  const createPostCrossChain = async () => {
    try{
      setLoading(true);
      const fullURL = uploadToIPFS();
      const transaction = await contract.sendMessage("12532609583862916517", "0x6C43d2EC6A277E215269895CEf85875e719C09E1", fullURL);
      const tx = await transaction.wait();
      console.log(tx);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }  
  }

  return (
    <div>
      <center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='blue.400' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading fontSize='2xl' mb='3'>Create Post</Heading>
          <FormControl mb='3'>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <Input id='title' onChange={(e) => setTitle(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Textarea id='description' rows={7} onChange={(e) => setDescription(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='tag'>Tag</FormLabel>
            <Input id='tag' onChange={(e) => setTags(e.target.value)}/>
          </FormControl>
          {loading
            ? <Spinner color='blue' />
            : <ButtonGroup spacing='6'>
                <Button colorScheme='blue' onClick={createPost}>
                  Create
                </Button>
                <Button onClick={() => router.push('/')}>Cancel</Button>
              </ButtonGroup>
          }
          <br />
          <Button colorScheme='blue' mt="3" onClick={createPostCrossChain}>
            Create Post to MATICMUM
          </Button>
        </Box>
      </center>
    </div>
  )
}

export default CreateCoupon;