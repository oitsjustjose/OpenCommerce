import React from 'react';
import {
  Avatar, Box,
  Flex,
  HStack,
  IconButton, Stack, useColorModeValue, useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaHamburger } from 'react-icons/fa';
import Item from './Item';

export const Pages = [
  {
    name: 'Home',
    path: '/',
    icon: null,
  },
];

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <FaHamburger />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box><Avatar backgroundColor="transparent" size="sm" src="/img/icon/oc.svg" /></Box>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >

            {Pages.map(({ icon, name, path }) => (
              <Item icon={icon} name={name} to={path} />
            ))}
          </HStack>
        </HStack>
        {/* This chunk handles the dropdown menu */}
        {/* <Flex alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex> */}
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Pages.map(({ icon, name, path }) => (
              <Item icon={icon} name={name} to={path} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
