import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import React from 'react';
import Calendar from '../Calendar';
import Recorder from '../Recorder';
import Warning from '../Warning';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Warning />
      <Recorder />
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
