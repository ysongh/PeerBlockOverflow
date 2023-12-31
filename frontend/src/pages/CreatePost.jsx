import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Box, ButtonGroup, Spinner, Select, Input, Textarea, Heading, Button } from '@chakra-ui/react';
import { Web3Storage } from 'web3.storage';

import { WEB3STORAGE_APIKEY } from '../../keys';
import { contractData } from '../../contractData';
const client = new Web3Storage({ token: WEB3STORAGE_APIKEY });

function CreatePost({ contract, ethAddress, ethProvider }) {
  const router = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [targetChain, setTargetChain] = useState('');

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
      const { chainId } = await ethProvider.getNetwork();
      if (chainId.toString() === targetChain) {
        const transaction = await contract.addPost(fullURL);
        const tx = await transaction.wait();
        console.log(tx);
      }
      else {
        const transaction = await contract.addPostCrosschain(contractData[targetChain].destinationChainSelector, contractData[targetChain].contractAddress, fullURL);
        const tx = await transaction.wait();
        console.log(tx);
      }
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
          <FormControl mb='3'>
            <FormLabel htmlFor='chain'>Destination Chain</FormLabel>
            <Select placeholder='Select Destination Chain' onChange={(e) => setTargetChain(e.target.value)}>
              <option value='11155111'>SEPOLIA</option>
              <option value='80001'>MATICMUM</option>
            </Select>
          </FormControl>
          
          {loading
            ? <Spinner color='blue' />
            : <ButtonGroup spacing='6'>
                <Button colorScheme='blue' onClick={createPost}>
                  Create
                </Button>
                <Button onClick={() => router('/posts')}>Cancel</Button>
              </ButtonGroup>
          }
        </Box>
      </center>
    </div>
  )
}

export default CreatePost;