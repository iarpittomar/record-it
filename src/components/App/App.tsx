import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import React from 'react';
import Calendar from '../Calendar';
import Recorder from '../Recorder';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Recorder />
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
