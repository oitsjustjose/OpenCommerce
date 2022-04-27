import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './redux/store';

const theme = extendTheme({
  config: {
    initialColorMode: window.localStorage.getItem('color-mode') || 'light',
    useSystemColorMode: false,
  },
});

export default () => (
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
