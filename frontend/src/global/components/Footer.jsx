import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { General as i18n } from '../i18n';

export default () => (
  <Box margin="2rem auto 1rem" width="max-content">
    <Flex>
      <Text>
        {`${i18n.footer.part1} `}
        <a href="https://oitsjustjose.com">oitsjustjose</a>
        {` ${i18n.footer.part2} `}
        <a href="https://chakra-ui.com">Chakra-UI</a>
      </Text>
    </Flex>
  </Box>
);
