import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({
  to, name, icon,
}) => (
  <NavLink exact activeClassName="active" to={to}>
    <Button>
      {!!icon && (<Icon name={icon} />)}
      {!!icon && !!name && ' '}
      {!!name && name}
    </Button>
  </NavLink>

);
