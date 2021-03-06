import React from 'react';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { General as i18n } from '../i18n';

export default () => (
  <div>
    <Flex justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.400"
        size="xl"
      />
    </Flex>
    <Flex justifyContent="center" alignItems="center" mt={2}>
      <Heading size="lg">{i18n.loading}</Heading>
    </Flex>
  </div>
);
