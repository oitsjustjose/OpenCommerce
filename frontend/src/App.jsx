import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './global/components/Nav/Bar';
import store from './redux/store';

// Pages
import Home from './pages/Home/index';

export default () => (
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <div style={{ marginBottom: '1rem' }} />
          <NavBar />
          <div style={{ marginBottom: '2rem' }} />
          <Routes>
            <Route exact path="/" index element={(<Home />)} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
