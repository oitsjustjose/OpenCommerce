import React, { useState } from 'react';
import {
  Button, FormControl, FormLabel, Input, Heading, Text, FormHelperText,
} from '@chakra-ui/react';
import { MdAlternateEmail, MdPassword, MdSend } from 'react-icons/md';
import { BiRename } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store';
import IconTextDuo from '../../global/components/IconTextDuo';

export default () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    first: '', last: '', email: '', password: '', conf: '',
  });

  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    const resp = await fetch('/api/v1/user/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    const data = await resp.json();
    const message = {
      header: resp.ok ? 'Account Created!' : 'Unable to Create Account',
      content: resp.ok ? 'You will receive an account confirmation email shortly! Sit tight until you have verified your account.' : data.error,
    };

    store.dispatch({ type: 'SET_ALERT', data: message });
    resp.ok && navigate('/login', { replace: true });
    setLoading(false);
  };
  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">Account Setup</Heading>
      <Text textAlign="center" marginBottom="0.5rem">
        Already have an account? Sign in
        {' '}
        <a href="/login">here!</a>
      </Text>

      <FormControl
        onKeyPress={(e) => e.key === 'Enter' && register()}
        onSubmit={register}
        backgroundColor="gray.100"
        padding="2rem"
        borderRadius="8px"
        maxW="50%"
        margin="auto"
      >
        <FormHelperText marginBottom="0.5rem" marginTop="0 !important">None of this information will be shared</FormHelperText>

        <FormLabel htmlFor="first">
          <IconTextDuo icon={(<BiRename />)} text="First Name " />
        </FormLabel>
        <Input
          id="first"
          type="text"
          required
          value={state.first}
          background="gray.50"
          onChange={(e) => setState({ ...state, first: e.target.value })}
        />

        <FormLabel htmlFor="last">
          <IconTextDuo icon={(<BiRename />)} text="Last Name" />
        </FormLabel>
        <Input
          id="last"
          type="text"
          required
          value={state.last}
          background="gray.50"
          onChange={(e) => setState({ ...state, last: e.target.value })}
        />

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

        <FormLabel htmlFor="conf">
          <IconTextDuo icon={(<MdPassword />)} text="Verify Password" />
        </FormLabel>
        <Input
          id="conf"
          type="password"
          required
          value={state.conf}
          background="gray.50"
          onChange={(e) => setState({ ...state, conf: e.target.value })}
        />

        <Button
          mt={4}
          colorScheme="blue"
          isLoading={loading}
          type="submit"
          onClick={register}
        >
          <IconTextDuo iconOnRight icon={(<MdSend />)} text="Register" />
        </Button>
      </FormControl>
    </div>
  );
};
