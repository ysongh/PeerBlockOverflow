import { useState } from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [contract, setContract] = useState(null);
  
  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress}
          setContract={setContract} />
        <Routes>
          <Route
            path="/create-post"
            element={<CreatePost contract={contract} />} />
          <Route
            path="/post/:id"
            element={<PostDetail contract={contract} ethAddress={ethAddress} />} />
          <Route
            path="/"
            element={<Posts contract={contract} />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
