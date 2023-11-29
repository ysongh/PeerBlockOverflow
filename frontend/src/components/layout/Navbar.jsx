import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Badge, Button, Link } from '@chakra-ui/react';
import { ethers } from 'ethers';

import PeerBlockOverflow from "../../artifacts/contracts/PeerBlockOverflow.sol/PeerBlockOverflow.json";

// const CALIBRATION_CONTRACT_ADDRESS = "0xFda2FCAB7c8c2FDB3Ef69C37Ee94f1e7A94f0eD3";
// const LOCALHOST_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const MUMBAI_CONTRACT_ADDRESS = "0x6C43d2EC6A277E215269895CEf85875e719C09E1";
const SEPOLIA_CONTRACT_ADDRESS = "0xB2e0621213dD162a1BE0eAf42452306EF2Af66dc"

function Navbar({ ethAddress, setETHAddress, setContract }) {
  const [networkName, setnetworkName] = useState("");

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
          <Link as={ReactLink} to="/create-post">Create Post</Link>
          <Spacer />
          {networkName && <p><Badge bgColor="#ff99fe" fontSize='.9rem'>{networkName}</Badge></p>}
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;