import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Heading,
  InputGroup, InputLeftAddon, Text, Textarea, useColorModeValue,
} from '@chakra-ui/react';
import CurrencyInput from 'react-currency-input-field';
import { AiOutlineFileText, AiOutlineNumber } from 'react-icons/ai';
import { BsCurrencyDollar, BsMarkdown } from 'react-icons/bs';
import InlineLabelInput from '../../../../global/components/FormControl/InlineLabelInput';
import IconTextDuo from '../../../../global/components/IconTextDuo';
import { Manage as i18n } from '../../../../global/i18n';
import store from '../../../../redux/store';
import FileUpload from '../FileUpload';
import { uploadImage } from '../../../../global/api';

const InputGroupStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

export default () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: '',
    description: '',
    quantity: null,
    price: null,
    images: [],
  });

  const save = async () => {
    setLoading(true);
    if (!state.name.length || !state.quantity || !state.price || !state.description) {
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
          images: imageUrls.length ? imageUrls : ['https://dv2ls.com/f/PpMcVb8gN'],
        }),
      });

      const data = await resp.json();
      if (resp.ok) {
        store.dispatch({ type: 'SET_ALERT', data: { header: 'Added New Product!', content: 'Your New Product has Been Saved and Will Be Reflected on the Management Page' } });
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: 'Failed to Add Product', content: JSON.stringify(data) } });
      }
    } catch (ex) {
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Failed to Add Product', content: ex } });
    }
    setLoading(false);
  };

  return (
    <div>
      <Heading textAlign="center" marginBottom="1rem">
        {i18n.title}
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
          labelText={i18n.labels.name}
          labelIcon={(<AiOutlineFileText />)}
          labelBgColor="#fa6663"
          labelFgColor="black"
          error={!state.name.length ? i18n.labels.required : null}
        />

        <FormControl
          onSubmit={() => {}}
          padding="0.5rem"
          borderRadius="8px"
          margin="auto"
          variant="floating"
        >
          <Textarea
            id="manage-text-area"
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
            background={useColorModeValue('gray.50', 'gray.700')}
            resize="vertical"
            size="md"
          />

          {state.description.length === 0 && (
          <FormLabel background="green.400" borderTopLeftRadius="8px" px={2} py={1}>
            <IconTextDuo icon={(<BsMarkdown />)} text={i18n.labels.desc} />
          </FormLabel>
          )}

          <Text fontSize=".75rem" color="red.500">{!state.description.length ? i18n.labels.required : null}</Text>
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
          <Text fontSize=".75rem" color="red.500">{!state.quantity ? i18n.labels.required : null}</Text>
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
          <Text fontSize=".75rem" color="red.500">{!state.price ? i18n.labels.required : null}</Text>
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
          {i18n.labels.save}
        </Button>
      </Box>
    </div>
  );
};
