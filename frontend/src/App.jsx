import { useState } from 'react';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';

function App() {

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/test"
            element={
              <>
                <h1>Test</h1>
              </>} />
          <Route
            path="/"
            element={
              <Text fontSize="3rem">Home</Text>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
