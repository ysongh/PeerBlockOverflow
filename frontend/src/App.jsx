import { useState } from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  
  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress} />
        <Routes>
          <Route
            path="/create-post"
            element={<CreatePost/>} />
          <Route
            path="/test"
            element={
              <>
                <h1>Test</h1>
              </>} />
          <Route
            path="/"
            element={<Posts />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
