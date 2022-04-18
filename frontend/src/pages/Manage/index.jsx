import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormControl, Heading, InputGroup, InputLeftAddon, Text,
} from '@chakra-ui/react';
import CurrencyInput from 'react-currency-input-field';
import { AiOutlineFileText, AiOutlineNumber } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import InlineLabelInput from '../../global/components/FormControl/InlineLabelInput';
import IconTextDuo from '../../global/components/IconTextDuo';
import { Manage as i18n } from '../../global/i18n';
import store from '../../redux/store';
import { FileUpload } from './components/FileUpload';

const InputGroupStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

const uploadImage = async (file) => {
  const fd = new FormData();
  fd.append('file', file);
  const resp = await fetch('/api/v1/fileupload', { method: 'POST', body: fd });
  const { output, error } = await resp.json();
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
  return `/api/v1/fileupload/${output}`;
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: '',
    quantity: null,
    price: null,
    images: [],
  });

  const save = async () => {
    setLoading(true);
    if (!state.name.length || !state.quantity || !state.price) {
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Missing Info', content: 'Not all required fields have been filled. Please provide this info to proceed.' } });
      setLoading(false);
      return;
    }
    try {
      // Step 1: Upload image files
      const imageUrls = await Promise.all(state.images.map(uploadImage));
      // Step 2: Upload the rest
      const resp = await fetch('/api/v1/products', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${window.localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...state,
          images: imageUrls,
        }),
      });

      const data = await resp.json();
      if (resp.ok) {
        // Workaround for resetting this form as many custom inputs == VERY difficult to do
        // eslint-disable-next-line no-underscore-dangle
        window.location.href = `${window.location.href}?_id=${data._id}`;
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: 'Failed to Add Item', content: JSON.stringify(data) } });
      }
    } catch (ex) {
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Failed to Add Item in Catch Block', content: ex } });
    }
    setLoading(false);
  };

  // Workaround for resetting this form as many custom inputs == VERY difficult to do
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('_id')) {
      store.dispatch({ type: 'SET_ALERT', data: { ...i18n.create.itemCreatedSuccess(params.get('_id')) } });
      window.history.replaceState(null, null, window.location.pathname);
    }
    return () => {};
  }, []);

  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">
        {i18n.create.title}
      </Heading>

      <Box
        borderRadius="2xl"
        padding="2rem"
        backgroundColor="blackAlpha.200"
        w="100%"
        maxW="768px"
        margin="auto"
      >
        <InlineLabelInput
          required
          type="text"
          propSubmitEvt={save}
          propChangeEvt={(e) => setState({ ...state, name: e.target.value })}
          propKeyPressEvt={(e) => e.key === 'Enter' && save()}
          value={state.name}
          labelText={i18n.create.labels.name}
          labelIcon={(<AiOutlineFileText />)}
          labelBgColor="#fa6663"
          labelFgColor="black"
          error={!state.name.length ? i18n.create.labels.required : null}
        />

        <FormControl
          onSubmit={save}
          onKeyPress={(e) => e.key === 'Enter' && save()}
          isRequired
          padding=".5rem"
          borderRadius="8px"
          margin="auto"
        >
          <InputGroup style={InputGroupStyle}>
            <InputLeftAddon backgroundColor="#8a56c2" color="white">
              <IconTextDuo icon={(<AiOutlineNumber />)} text="Qty" />
            </InputLeftAddon>
            {/* Use currency input to nicely handle whole numerical values */}
            <CurrencyInput
              prefix=""
              allowDecimals={false}
              className="chakra-input currency"
              onValueChange={(value) => setState({
                ...state, quantity: JSON.parse(value),
              })}
            />
          </InputGroup>
          <Text fontSize=".75rem" color="red.500">{!state.quantity ? i18n.create.labels.required : null}</Text>
        </FormControl>

        <FormControl
          onSubmit={save}
          onKeyPress={(e) => e.key === 'Enter' && save()}
          isRequired
          padding=".5rem"
          borderRadius="8px"
          margin="auto"
        >
          <InputGroup style={InputGroupStyle}>
            <InputLeftAddon backgroundColor="#fbb355" color="black"><IconTextDuo icon={(<BsCurrencyDollar />)} text="Price" /></InputLeftAddon>
            <CurrencyInput
              prefix="$"
              decimalsLimit={2}
              className="chakra-input currency"
              onValueChange={(value) => setState({
                ...state, price: JSON.parse(value),
              })}
            />
          </InputGroup>
          <Text fontSize=".75rem" color="red.500">{!state.price ? i18n.create.labels.required : null}</Text>
        </FormControl>
        <FormControl
          onSubmit={save}
          onKeyPress={(e) => e.key === 'Enter' && save()}
          isRequired
          padding=".5rem"
          borderRadius="8px"
          margin="auto"
        >
          <InputGroup style={InputGroupStyle}>
            <FileUpload
              name="image"
              acceptedFileTypes="image/*"
              required
              allowMultipleFiles
              propagateChange={(evt) => setState({
                ...state,
                images: Array.from(evt.target.files),
              })}
            />
          </InputGroup>
        </FormControl>

        <Button
          display="block"
          mx="auto"
          mt={4}
          colorScheme="green"
          isLoading={loading}
          type="submit"
          onClick={save}
        >
          {i18n.create.labels.save}
        </Button>
      </Box>
    </div>
  );
};
