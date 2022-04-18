import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MdLogin, MdLogout } from 'react-icons/md';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pages } from '../../../Routes';
import IconTextDuo from '../IconTextDuo';
import { General as i18n } from '../../i18n';

const NavBar = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, setColorMode } = useColorMode();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box bg={useColorModeValue('blackAlpha.300', 'gray.900')} px={4} borderRadius="8px">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Mobile Menu Toggle Icon */}
        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose style={{ margin: 'auto' }} /> : <AiOutlineMenu style={{ margin: 'auto' }} />}
          aria-label={i18n.openMenu}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          colorScheme="gray"
          textAlign="center"
        />

        <HStack spacing={8} alignItems="center">
          <Box>
            <Avatar backgroundColor="transparent" size="sm" src="/img/icon/oc.svg" _placeholderShown={false} />
          </Box>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {
              Pages
                .filter((x) => !x.hidden)
                .filter((x) => !x.adminOnly || (x.adminOnly && user?.admin))
                .map(({ icon, name, path }) => (
                  <Button
                    key={path}
                    onClick={() => navigate(path, { replace: true })}
                    colorScheme={location.pathname === path ? 'blue' : 'gray'}
                  >
                    <IconTextDuo icon={(icon)} text={name} />
                  </Button>
                ))
            }

            {!user && (
            <Button
              onClick={() => navigate('/login', { replace: true })}
              colorScheme={location.pathname === '/login' ? 'blue' : 'gray'}
            >
              <IconTextDuo icon={(<MdLogin />)} text={i18n.login} />
            </Button>
            )}

            {user && (
              <Button
                onClick={() => navigate('/logout', { replace: true })}
                colorScheme={location.pathname === '/logout' ? 'red' : 'gray'}
              >
                <IconTextDuo icon={(<MdLogout />)} text={i18n.logout} />
              </Button>
            )}

            <IconButton
              icon={colorMode === 'light' ? <BsSunFill /> : <BsMoonFill />}
              aria-label={i18n.changeColorMode}
              onClick={() => {
                const newMode = colorMode === 'light' ? 'dark' : 'light';
                setColorMode(newMode);
                window.localStorage.setItem('color-mode', newMode);
              }}
              colorScheme="gray"
              textAlign="center"
            />
          </HStack>
        </HStack>
      </Flex>

      {/* Handles the mobile version of the menu. */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {
              Pages
                .filter((x) => !x.hidden)
                .filter((x) => !x.adminOnly || (x.adminOnly && user?.admin))
                .map(({ icon, name, path }) => (
                  <Button
                    key={path}
                    onClick={() => navigate(path, { replace: true })}
                    colorScheme={location.pathname === path ? 'blue' : 'gray'}
                  >
                    <IconTextDuo icon={(icon)} text={name} />
                  </Button>
                ))
            }

            {!user && (
            <Button
              onClick={() => navigate('/login', { replace: true })}
              icon={MdLogin}
              colorScheme={location.pathname === '/login' ? 'blue' : 'gray'}
            >
              <IconTextDuo icon={(<MdLogin />)} text={i18n.login} />
            </Button>
            )}

            {user && (
              <Button
                onClick={() => navigate('/logout', { replace: true })}
                colorScheme={location.pathname === '/logout' ? 'blue' : 'gray'}
              >
                <IconTextDuo icon={(<MdLogout />)} text={i18n.logout} />
              </Button>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(NavBar);
