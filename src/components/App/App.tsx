import { ThemeProvider,CSSReset, Box } from '@chakra-ui/core';
import React from 'react';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box bg="tomato" m={2}>tomato</Box>
    </ThemeProvider>
  );
}

export default App;
