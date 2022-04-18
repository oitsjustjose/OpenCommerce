import React from 'react';
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react';

export default ({ product }) => {
  const images = product.images.filter((x) => !!x) || ['https://dv2ls.com/f/PpMcVb8gN'];
  return (
    <Box
      margin="auto"
      role="group"
      maxW="330px"
      w="full"
      bg={useColorModeValue('blackAlpha.300', 'gray.700')}
      transition="all .3s ease"
      cursor="pointer"
      rounded="lg"
      pos="relative"
      zIndex={1}
      _hover={{
        transition: 'all .3s ease',
        boxShadow: 'var(--chakra-shadows-2xl)',
        transform: 'scale(105%)',
      }}
    >
      <Box rounded="lg" pos="relative" height="256px">
        <Image
          loading="lazy"
          roundedTopLeft="lg"
          roundedTopRight="lg"
          height={230}
          width="100%"
          objectFit="cover"
          src={images[0]}
        />
      </Box>
      <Stack p={6} align="center">
        <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
          {product.name}
        </Heading>
        <Text color="gray.500" fontSize="sm" textTransform="uppercase">
          {product.quantity === 0 ? 'Sold Out' : `$${product.price}`}
        </Text>
      </Stack>
    </Box>
  );
};
