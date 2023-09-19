import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Box, ButtonGroup, Spinner, Input, Heading, Button } from '@chakra-ui/react';
import { Web3Storage } from 'web3.storage';

import { WEB3STORAGE_APIKEY } from '../../keys';

const client = new Web3Storage({ token: WEB3STORAGE_APIKEY });

function CreateCoupon() {
  const router = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try{
      console.log(title, description, tags);
      const postData = JSON.stringify({ title, description, tags });
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
    } catch(error) {
     console.error(error);
     setLoading(false);
    }  
  }

  return (
    <div>
      <center>
        <Box borderWidth='1px' borderRadius='lg' borderColor='orange' overflow='hidden' p='5' width='500px' mt='5'>
          <Heading fontSize='2xl' mb='3'>Create Post</Heading>
          <FormControl mb='3'>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <Input id='title' onChange={(e) => setTitle(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Input id='description' onChange={(e) => setDescription(e.target.value)}/>
          </FormControl>
          <FormControl mb='3'>
            <FormLabel htmlFor='tag'>Tag</FormLabel>
            <Input id='tag' onChange={(e) => setTags(e.target.value)}/>
          </FormControl>
          {loading
            ? <Spinner color='orange' />
            : <ButtonGroup spacing='6'>
                <Button colorScheme='orange' onClick={handleSubmit}>
                  Create
                </Button>
                <Button onClick={() => router.push('/')}>Cancel</Button>
              </ButtonGroup>
          }
        </Box>
      </center>
    </div>
  )
}

export default CreateCoupon;