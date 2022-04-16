import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';
import store from './redux/store';

import Navbar from './global/components/Nav/Navbar';
import FakeNavItem from './global/components/Nav/FakeNavItem';
import AlertModal from './global/components/Modal/Alert';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home/index';
import Login from './pages/User/Login';
import Register from './pages/User/Register';

export const Pages = [
  {
    name: 'Shop',
    path: '/',
    icon: (<FaShoppingBag />),
    element: (<Home />),
    hidden: false,
  },
  {
    name: 'Login',
    path: '/login',
    icon: null,
    element: (<Login />),
    hidden: true,
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: null,
    element: (<FakeNavItem dispatch={{ type: 'CLEAR_USER' }} redirect="/" />),
    hidden: true,
  },
  {
    name: 'Register',
    path: '/register',
    icon: null,
    element: (<Register />),
    hidden: true,
  },
];

export default () => (
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <div style={{ marginBottom: '1rem' }} />
          <Navbar />
          <div style={{ marginBottom: '2rem' }} />
          <Routes>
            { Pages.map((x) => (
              <Route exact path={x.path} element={x.element} />
            ))}
          </Routes>
          <AlertModal />
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
