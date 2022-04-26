import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './redux/store';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
  background: 'transparent !important',
  padding: '0 !important',
};

const theme = extendTheme({
  config: {
    initialColorMode: window.localStorage.getItem('color-mode') || 'light',
    useSystemColorMode: false,
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              pointerEvents: 'none',
              mx: 'var(--chakra-space-2)',
              // px: 1,
              my: 'var(--chakra-space-2)',
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
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
