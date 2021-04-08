import React from 'react';
import { Chat } from './components/Chat';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <>
      <Header />
      <Chat />
      <GlobalStyle />
    </>
  );
}

export default App;
