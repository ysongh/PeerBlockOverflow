import { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Badge, Avatar, Button, Link } from '@chakra-ui/react';
import { ethers } from 'ethers';

import PeerBlockOverflow from "../../artifacts/contracts/PeerBlockOverflow.sol/PeerBlockOverflow.json";
import { SEPOLIA_CONTRACT_ADDRESS, MUMBAI_CONTRACT_ADDRESS, GOERLI_RPC } from '../../../keys';

function Navbar({ ethAddress, setETHAddress, setContract, setethProvider }) {
  const [networkName, setnetworkName] = useState("");
  const [ens, setENS] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const getENSname = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC, 'goerli');
        const name = await provider.lookupAddress(ethAddress);
        setENS(name);

        const resolver = await provider.getResolver(name);
        if(!resolver) return;
        const avatar = await resolver.getText("avatar");
        setPhoto(avatar);
      } catch (error) {
        console.error(error);
      }
      
    }
    if (ethAddress) getENSname();
  }, [ethAddress])
  

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setethProvider(provider);
    const { name, chainId } = await provider.getNetwork();
    console.log(name, chainId);
    setnetworkName(name);
    const signer = provider.getSigner();
    if (chainId === 11155111) {
      const c = new ethers.Contract(SEPOLIA_CONTRACT_ADDRESS, PeerBlockOverflow.abi, signer);
      setContract(c);
    }
    else if (chainId === 80001) {
      const c = new ethers.Contract(MUMBAI_CONTRACT_ADDRESS, PeerBlockOverflow.abi, signer);
      setContract(c);
    }
  }

  return (
    <Box p={2}>
      <Container maxW='1100px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="blue.400" mt="3" mb="5">PeerBlock Overflow</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/posts">Posts</Link>
          <Link as={ReactLink} to="/create-post">Create Post</Link>
          <Spacer />
          {networkName && <p><Badge bgColor="#ff99fe" fontSize='.9rem'>{networkName}</Badge></p>}
          <Button leftIcon={<Avatar src={photo} size="sm" />} onClick={connectMetamask}>
            {ens ? ens : ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;