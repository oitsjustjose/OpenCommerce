import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl, Heading, Input, InputGroup, InputLeftAddon,
} from '@chakra-ui/react';
import CurrencyInput from 'react-currency-input-field';
import { AiOutlineNumber } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdTextFields } from 'react-icons/md';
import IconTextDuo from '../../global/components/IconTextDuo';
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
    error(error);
    return null;
  }
  return `/api/v1/fileupload/${output}`;
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: '',
    quantity: 0,
    price: 0.0,
    images: [],
  });

  const save = async () => {
    setLoading(true);
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
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Item Added!', content: `Item created with ID ${params.get('_id')}` } });
      window.history.replaceState(null, null, window.location.pathname);
    }
    return () => {};
  }, []);

  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">Create Product</Heading>

      <FormControl
        onKeyPress={(e) => e.key === 'Enter' && save()}
        onSubmit={save}
        backgroundColor="gray.100"
        padding="2rem"
        borderRadius="8px"
        maxW="50%"
        margin="auto"
      >
        <InputGroup style={InputGroupStyle}>
          <InputLeftAddon backgroundColor="#fa6663" color="black"><IconTextDuo icon={(<MdTextFields />)} text="Name" /></InputLeftAddon>
          <Input
            id="name"
            type="text"
            required
            value={state.name}
            background="gray.50"
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </InputGroup>

        <InputGroup style={InputGroupStyle}>
          <InputLeftAddon backgroundColor="#8a56c2" color="white"><IconTextDuo icon={(<AiOutlineNumber />)} text="Qty" /></InputLeftAddon>
          {/* Use currency input to nicely handle whole numerical values */}
          <CurrencyInput
            prefix=""
            defaultValue={state.quantity}
            allowDecimals={false}
            className="chakra-input currency"
            onValueChange={(value) => setState({
              ...state, quantity: JSON.parse(value),
            })}
          />
        </InputGroup>

        <InputGroup style={InputGroupStyle}>
          <InputLeftAddon backgroundColor="#fbb355" color="black"><IconTextDuo icon={(<BsCurrencyDollar />)} text="Price" /></InputLeftAddon>
          <CurrencyInput
            prefix="$"
            placeholder="Price"
            defaultValue={state.price}
            decimalsLimit={2}
            className="chakra-input currency"
            onValueChange={(value) => setState({
              ...state, price: JSON.parse(value),
            })}
          />
        </InputGroup>

        <InputGroup style={InputGroupStyle}>
          <FileUpload
            name="image"
            acceptedFileTypes="image/*"
            required
            allowMultipleFiles
            propagateChange={(evt) => setState({ ...state, images: Array.from(evt.target.files) })}
            style={{ cursor: 'pointer !important' }}
          />
        </InputGroup>

        <Button
          mt={4}
          colorScheme="blue"
          isLoading={loading}
          type="submit"
          onClick={save}
        >
          Submit
        </Button>
      </FormControl>
    </div>
  );
};
