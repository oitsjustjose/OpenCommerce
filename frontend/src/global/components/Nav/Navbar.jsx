import React from 'react';
import {
  Avatar, Box,
  Flex,
  HStack,
  IconButton, Stack, useColorModeValue, useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaHamburger } from 'react-icons/fa';
import { connect } from 'react-redux';
import { MdLogin, MdLogout } from 'react-icons/md';
import Item from './NavbarItem';
import { Pages } from '../../../App';

const NavBar = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} borderRadius="8px">
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

            {Pages.filter((x) => !x.hidden).map(({ icon, name, path }) => (
              <Item icon={icon} name={name} to={path} />
            ))}

            {!user && (<Item icon={(<MdLogin />)} name="Log In" to="/login" />)}
            {user && (<Item icon={(<MdLogout />)} name="Log Out" to="/logout" />) }
          </HStack>
        </HStack>
      </Flex>

      {/* Handles the mobile version of the menu. */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Pages.filter((x) => !x.hidden).map(({ icon, name, path }) => (
              <Item icon={icon} name={name} to={path} />
            ))}

          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(NavBar);
