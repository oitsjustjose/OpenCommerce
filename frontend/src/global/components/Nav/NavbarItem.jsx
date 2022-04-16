import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({
  to, name, icon,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => `chakra-button ${isActive ? 'nav-active' : 'nav-inactive'}`}
  >
    {icon && icon}
    {!!icon && !!name && (<div style={{ width: '8px' }} />)}
    {!!name && name}
  </NavLink>

);
