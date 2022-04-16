import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FakeNavItem from './global/components/Nav/FakeNavItem';
import Home from './pages/Home/index';
import Manage from './pages/Manage/index';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Navbar from './global/components/Nav/Navbar';
import AlertModal from './global/components/Modal/Alert';
import Footer from './global/components/Footer';

export const Pages = [
  {
    name: 'Shop',
    path: '/',
    icon: (<FaShoppingBag />),
    element: (<Home />),
    adminOnly: false,
    hidden: false,
  },
  {
    name: 'Manage',
    path: '/manage',
    icon: null,
    element: (<Manage />),
    adminOnly: true,
    hidden: false,
  },
  {
    name: 'Login',
    path: '/login',
    icon: null,
    element: (<Login />),
    adminOnly: false,
    hidden: true,
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: null,
    element: (<FakeNavItem dispatch={{ type: 'CLEAR_USER' }} redirect="/" />),
    adminOnly: false,
    hidden: true,
  },
  {
    name: 'Register',
    path: '/register',
    icon: null,
    element: (<Register />),
    adminOnly: false,
    hidden: true,
  },
];

const Routes = ({ user }) => (
  <BrowserRouter>
    <div style={{ marginBottom: '1rem' }} />
    <Navbar />
    <div style={{ marginBottom: '2rem' }} />
    <RouterRoutes>
      {
          Pages
            .filter((x) => !x.adminOnly || (x.adminOnly && user?.admin))
            .map((x) => (
              <Route key={x.name} exact path={x.path} element={x.element} />
            ))
        }
    </RouterRoutes>
    <AlertModal />
    <Footer />
  </BrowserRouter>
);

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(Routes);
