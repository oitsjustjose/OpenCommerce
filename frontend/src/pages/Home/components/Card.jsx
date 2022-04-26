/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default ({ product }) => {
  const filtered = product.images.filter((x) => !!x);
  const images = filtered.length ? filtered : ['https://dv2ls.com/f/PpMcVb8gN'];
  const nav = useNavigate();

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
      onClick={() => nav(`/product?productId=${product._id}`, { replace: true })}
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
        <Flex>
          { product.overallRating
        && new Array(Math.floor(product.overallRating)).fill('').map((x, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <BsStarFill key={`${product.name}-star-${idx}`} />
        ))}
          {product.overallRating
          && product.overallRating - Math.floor(product.overallRating) >= 0.5
          && (<BsStarHalf />)}
        </Flex>
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
