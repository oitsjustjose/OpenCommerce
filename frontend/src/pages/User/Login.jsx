import React, { useEffect, useState } from 'react';
import {
  Button, Heading, Text, Box,
} from '@chakra-ui/react';
import { MdAlternateEmail, MdPassword, MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store';
import StandardInput from '../../global/components/FormControl/StandardInput';
import IconTextDuo from '../../global/components/IconTextDuo';
import { Login as i18n } from '../../global/i18n';
import { setToast } from '../../global/toast';

export default () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (state.email.length === 0 || state.password.length === 0) return;
    setLoading(true);

    const resp = await fetch('/api/v1/user/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    const data = await resp.json();

    if (resp.ok) {
      store.dispatch({ type: 'SET_USER_TOKEN', token: data.token });
      setToast(`Welcome ${data.first}!`, '', 'info');
      setTimeout(() => store.dispatch({ type: 'SET_ALERT', data: null }), 1000);
      navigate('/', { replace: true });
    } else {
      store.dispatch({
        type: 'SET_ALERT',
        data: { header: i18n.error, content: data.error },
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('invalidOrExpired')) {
      store.dispatch({
        type: 'SET_ALERT',
        data: {
          header: i18n.logoutAlert.header,
          content: i18n.logoutAlert.content,
        },
      });

      // Remove the query to prevent it being annoying
      params.delete('invalidOrExpired');
      navigate({
        pathname: window.location.pathname,
        search: params.toString(),
      }, { replace: true });
    }
    return () => {};
  }, []);

  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">User Login</Heading>
      <Text
        color="purple.600"
        cursor="pointer"
        transition="all"
        textAlign="center"
        marginBottom="0.5rem"
        onClick={() => navigate('/register', { replace: true })}
        _hover={{ fontWeight: 600, color: 'var(--chakra-colors-purple-500) !important' }}
      >
        {i18n.labels.register}
      </Text>

      <Box
        borderRadius="2xl"
        padding="2rem"
        backgroundColor="blackAlpha.200"
        w="100%"
        maxW="768px"
        margin="auto"
      >
        <StandardInput
          required
          type="email"
          propSubmitEvt={login}
          propChangeEvt={(e) => setState({ ...state, email: e.target.value })}
          propKeyPressEvt={(e) => e.key === 'Enter' && login()}
          value={state.email}
          labelText={i18n.labels.email}
          labelIcon={(<MdAlternateEmail />)}
          error={!state.email.length ? i18n.labels.required : null}
        />

        <StandardInput
          required
          type="password"
          propSubmitEvt={login}
          propChangeEvt={(e) => setState({ ...state, password: e.target.value })}
          propKeyPressEvt={(e) => e.key === 'Enter' && login()}
          value={state.password}
          labelText={i18n.labels.password}
          labelIcon={(<MdPassword />)}
          error={!state.password.length ? i18n.labels.required : null}
        />

        <Button
          display="block"
          mt={4}
          mx="auto"
          colorScheme="green"
          isLoading={loading}
          type="submit"
          onClick={login}
        >
          <IconTextDuo iconOnRight icon={(<MdLogin />)} text={i18n.labels.submit} />
        </Button>
      </Box>
    </div>
  );
};
