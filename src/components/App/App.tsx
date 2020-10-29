import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import React from 'react';
import Recorder from '../Recorder';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Recorder></Recorder>
    </ThemeProvider>
  );
}

export default App;
