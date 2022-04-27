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
import { getAuthHeaders, uploadImage } from '../../../../global/api';
import { setToast } from '../../../../global/toast';

const InputGroupStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

export default ({ closeModal }) => {
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
      return false;
    }

    try {
      const imageUrls = await Promise.all(state.images.map(uploadImage));
      const resp = await fetch('/api/v1/products', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...state, images: imageUrls }),
      });

      const data = await resp.json();
      if (resp.ok) {
        setToast('Added New Product Successfully!', '', 'success');
        setLoading(false);
        return true;
      }
      setToast('Failed to Add Product', data?.error || '', 'error');
    } catch (ex) {
      setToast('Failed to Add Product', ex || '', 'error');
    }
    setLoading(false);
    return false;
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
          propSubmitEvt={() => {}}
          propKeyPressEvt={() => {}}
          propChangeEvt={(e) => setState({ ...state, name: e.target.value })}
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
            paddingTop="32px"
            transition="padding ease-in-out 150ms"
          />

          <FormLabel background="green.400" borderTopLeftRadius="8px" px={2} py={1}>
            <IconTextDuo icon={(<BsMarkdown />)} text={i18n.labels.desc} />
          </FormLabel>

          <Text fontSize=".75rem" color="red.500">{!state.description.length ? i18n.labels.required : null}</Text>
        </FormControl>

        <FormControl
          onSubmit={() => {}}
          onKeyPress={() => {}}
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
          onSubmit={() => {}}
          onKeyPress={() => {}}
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
          onSubmit={() => {}}
          onKeyPress={() => {}}
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
          onClick={() => save().then((x) => { if (x) closeModal(); })}
        >
          {i18n.labels.save}
        </Button>
      </Box>
    </div>
  );
};
