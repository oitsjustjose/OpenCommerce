import React, { useState } from 'react';
import {
  Button, FormControl, FormLabel, Input, Heading, Text,
} from '@chakra-ui/react';
import { MdAlternateEmail, MdPassword, MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import IconTextDuo from '../../global/components/IconTextDuo';
import store from '../../redux/store';

export default () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);

    const resp = await fetch('/api/v1/user/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    const data = await resp.json();

    if (resp.ok) {
      store.dispatch({ type: 'SET_USER_TOKEN', token: data.token });
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Logged In!', content: '' } });
      setTimeout(() => store.dispatch({ type: 'SET_ALERT', data: null }), 1000);
      navigate('/', { replace: true });
    } else {
      store.dispatch({
        type: 'SET_ALERT',
        data: { header: 'There was an Error Logging In', content: data.error },
      });
    }

    setLoading(false);
  };

  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">User Login</Heading>
      <Text textAlign="center" marginBottom="0.5rem">
        Need an account? Click
        {' '}
        <a href="/register">here!</a>
      </Text>

      <FormControl
        onKeyPress={(e) => e.key === 'Enter' && login()}
        onSubmit={login}
        backgroundColor="gray.100"
        padding="2rem"
        borderRadius="8px"
        maxW="50%"
        margin="auto"
      >
        <FormLabel htmlFor="email">
          <IconTextDuo icon={(<MdAlternateEmail />)} text="Email" />
        </FormLabel>
        <Input
          id="email"
          type="email"
          required
          value={state.email}
          background="gray.50"
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />

        <FormLabel htmlFor="password">
          <IconTextDuo icon={(<MdPassword />)} text="Password" />
        </FormLabel>
        <Input
          id="password"
          type="Password"
          required
          value={state.password}
          background="gray.50"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />

        <Button
          mt={4}
          colorScheme="blue"
          isLoading={loading}
          type="submit"
          onClick={login}
        >
          <IconTextDuo iconOnRight icon={(<MdLogin />)} text="Log In" />
        </Button>
      </FormControl>
    </div>
  );
};
