import React, { useState } from 'react';
import {
  Button,
  FormControl, Heading, Input, InputGroup, InputLeftAddon,
} from '@chakra-ui/react';
import CurrencyInput from 'react-currency-input-field';
import { AiOutlineNumber } from 'react-icons/ai';
import { MdPhotoLibrary, MdTextFields } from 'react-icons/md';
import { BsCurrencyDollar } from 'react-icons/bs';
import IconTextDuo from '../../global/components/IconTextDuo';
import store from '../../redux/store';

const InputGroupStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

const initialState = {
  name: '',
  quantity: 0,
  price: 0.0,
  images: [],
};

const uploadImage = async (file) => {
  const fd = new FormData();
  fd.append('file', file);
  const resp = await fetch('/api/v1/fileupload', { method: 'POST', body: fd });
  const { output, error } = await resp.json();
  if (error) return null;
  return `/api/v1/fileupload/${output}`;
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

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
        // eslint-disable-next-line no-underscore-dangle
        store.dispatch({ type: 'SET_ALERT', data: { header: 'Item Added!', content: `Item created with ID ${data._id}` } });
        setState(initialState);
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: 'Failed to Add Item', content: data.error } });
      }
    } catch (ex) {
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Failed to Add Item', content: ex } });
    }

    setLoading(false);
  };

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
          <InputLeftAddon backgroundColor="#53b0fb" color="black"><IconTextDuo icon={(<MdPhotoLibrary />)} text="Images" /></InputLeftAddon>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            background="gray.50"
            onChange={(evt) => setState({ ...state, images: Array.from(evt.target.files) })}
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
