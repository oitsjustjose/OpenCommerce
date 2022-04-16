import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './redux/store';

export default () => (
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
