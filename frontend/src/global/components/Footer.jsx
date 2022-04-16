import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

export default () => (
  <Box margin="2rem auto 1rem" width="max-content">
    <Flex>
      <Text>
        Made with 💙 by
        {' '}
        <a href="https://oitsjustjose.com">oitsjustjose</a>
        {' '}
        using
        {' '}
        <a href="https://chakra-ui.com">Chakra-UI</a>
      </Text>
    </Flex>
  </Box>
);
