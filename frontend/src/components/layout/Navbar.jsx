import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Badge, Button, Link } from '@chakra-ui/react';
import { ethers } from 'ethers';

import PeerBlockOverflow from "../../artifacts/contracts/PeerBlockOverflow.sol/PeerBlockOverflow.json";

// const CALIBRATION_CONTRACT_ADDRESS = "0xFda2FCAB7c8c2FDB3Ef69C37Ee94f1e7A94f0eD3";
// const LOCALHOST_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const MUMBAI_CONTRACT_ADDRESS = "0x1db889583773d27aB583e5531E6FB8F26CE0dDC8";

function Navbar({ ethAddress, setETHAddress, setContract }) {

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const c = new ethers.Contract(MUMBAI_CONTRACT_ADDRESS, PeerBlockOverflow.abi, signer);
    setContract(c);
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
          <p><Badge bgColor="#ff99fe" fontSize='.9rem'>Mumbai</Badge></p>
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;