import React, { useState } from 'react';
import {
  Button, Heading, Text, Box,
} from '@chakra-ui/react';
import { MdAlternateEmail, MdPassword, MdSend } from 'react-icons/md';
import { BiRename } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store';
import IconTextDuo from '../../global/components/IconTextDuo';
import { Register as i18n } from '../../global/i18n';
import StandardInput from '../../global/components/FormControl/StandardInput';

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
    const message = resp.ok ? i18n.createAccountSuccess : i18n.createAccountFailure(data);
    store.dispatch({ type: 'SET_ALERT', data: message });
    resp.ok && navigate('/login', { replace: true });
    setLoading(false);
  };

  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">Account Setup</Heading>
      <Text
        color="purple.600"
        cursor="pointer"
        transition="all"
        textAlign="center"
        marginBottom="0.5rem"
        onClick={() => navigate('/login', { replace: true })}
        _hover={{ fontWeight: 600, color: 'var(--chakra-colors-purple-500) !important' }}
      >
        {i18n.labels.login}
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
          type="text"
          propSubmitEvt={register}
          propKeyPressEvt={(e) => e.key === 'Enter' && register()}
          propChangeEvt={(e) => setState({ ...state, first: e.target.value })}
          value={state.first}
          labelText={i18n.labels.first}
          labelIcon={(<BiRename />)}
          error={!state.first.length ? i18n.labels.required : null}
        />

        <StandardInput
          required
          type="text"
          propSubmitEvt={register}
          propKeyPressEvt={(e) => e.key === 'Enter' && register()}
          propChangeEvt={(e) => setState({ ...state, last: e.target.value })}
          value={state.last}
          labelText={i18n.labels.last}
          labelIcon={(<BiRename />)}
          error={!state.last.length ? i18n.labels.required : null}
        />

        <StandardInput
          required
          type="email"
          propSubmitEvt={register}
          propKeyPressEvt={(e) => e.key === 'Enter' && register()}
          propChangeEvt={(e) => setState({ ...state, email: e.target.value })}
          value={state.email}
          labelText={i18n.labels.email}
          labelIcon={(<MdAlternateEmail />)}
          error={!state.email.length ? i18n.labels.required : null}
        />

        <StandardInput
          required
          type="password"
          propSubmitEvt={register}
          propKeyPressEvt={(e) => e.key === 'Enter' && register()}
          propChangeEvt={(e) => setState({ ...state, password: e.target.value })}
          value={state.password}
          labelText={i18n.labels.password}
          labelIcon={(<MdPassword />)}
          error={(!state.password.length && i18n.labels.required)
             || (state.password !== state.conf && i18n.labels.match)
             || null}
        />

        <StandardInput
          required
          type="password"
          propSubmitEvt={register}
          propKeyPressEvt={(e) => e.key === 'Enter' && register()}
          propChangeEvt={(e) => setState({ ...state, conf: e.target.value })}
          value={state.conf}
          labelText={i18n.labels.conf}
          labelIcon={(<MdPassword />)}
          error={(!state.conf.length && i18n.labels.required)
            || (state.password !== state.conf && i18n.labels.match)
            || null}
        />

        <Button
          display="block"
          mt={4}
          mx="auto"
          colorScheme="green"
          isLoading={loading}
          type="submit"
          onClick={register}
        >
          <IconTextDuo
            iconOnRight
            icon={<MdSend />}
            text={i18n.labels.register}
          />
        </Button>
      </Box>
    </div>
  );
};
