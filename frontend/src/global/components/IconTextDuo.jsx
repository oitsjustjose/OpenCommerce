import React from 'react';
import { Flex } from '@chakra-ui/react';

export default ({ icon, text, iconOnRight }) => (
  <Flex alignItems="center">
    {iconOnRight ? text : icon}
    <div style={{ width: '8px' }} />
    {iconOnRight ? icon : text}
  </Flex>
);
