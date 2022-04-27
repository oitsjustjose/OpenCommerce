import React from 'react';

import {
  Box, Flex, Heading, Image,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';

export default ({ src, onClick }) => (
  <div>
    <Box position="relative" onClick={onClick}>
      <Image
        width="100%"
        height="auto"
        objectFit="cover"
        src={src}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        opacity={0}
        backgroundColor="red.500"
        width="100%"
        height="100%"
        transition="opacity ease-in-out 150ms"
        _hover={{ opacity: 1 }}
        cursor="pointer"
      >
        <Flex height="inherit" direction="column" justifyContent="center" alignItems="center">
          <Heading size="2xl"><BsTrash /></Heading>
        </Flex>
      </Box>
    </Box>
  </div>
);
