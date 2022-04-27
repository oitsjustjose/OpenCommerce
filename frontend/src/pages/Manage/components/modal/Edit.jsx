import React, { useState } from 'react';
import {
  Box, Button, ButtonGroup, FormControl, FormLabel, Grid, GridItem, Heading,
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
import DeletableImage from '../DeletableImage';
import { getAuthHeaders, uploadImage } from '../../../../global/api';
import { setToast } from '../../../../global/toast';

const InputGroupStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

export default ({ product, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: product.name,
    description: product.description,
    quantity: product.quantity,
    price: product.price,
    images: product.images,
    newImages: [],
  });

  const save = async () => {
    setLoading(true);
    if (!state.name.length || !state.quantity || !state.price || !state.description) {
      store.dispatch({ type: 'SET_ALERT', data: i18n.missingInfo });
      setLoading(false);
      return false;
    }

    try {
      const imageUrls = (await Promise.all(state.newImages.map(uploadImage))).concat(state.images);
      // eslint-disable-next-line no-underscore-dangle
      const resp = await fetch(`/api/v1/products/${product._id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...state, images: imageUrls }),
      });

      const data = await resp.json();
      if (resp.ok) {
        setToast(i18n.edit.alerts.success, '', 'success');
        setLoading(false);
        return true;
      }
      setToast(i18n.edit.alerts.failure, data?.error || '', 'error');
    } catch (ex) {
      setToast(i18n.edit.alerts.failure, ex || '', 'error');
    }
    setLoading(false);
    return false;
  };

  const del = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(i18n.edit.alerts.delete)) {
      // eslint-disable-next-line no-underscore-dangle
      const resp = await fetch(`/api/v1/products/${product._id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      setToast(`Deleted ${product.name} Successfully`, '', 'info');
      return resp.ok;
    }
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
              <IconTextDuo icon={(<AiOutlineNumber />)} text={i18n.labels.qty} />
            </InputLeftAddon>
            {/* Use currency input to nicely handle whole numerical values */}
            <CurrencyInput
              prefix=""
              allowDecimals={false}
              className="chakra-input currency"
              defaultValue={state.quantity}
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
            <InputLeftAddon backgroundColor="#fbb355" color="black">
              <IconTextDuo icon={(<BsCurrencyDollar />)} text={i18n.labels.price} />
            </InputLeftAddon>
            <CurrencyInput
              prefix="$"
              decimalsLimit={2}
              className="chakra-input currency"
              defaultValue={state.price}
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
                newImages: Array.from(evt.target.files),
              })}
            />
          </InputGroup>
        </FormControl>

        <Grid templateColumns="repeat(auto-fit, minmax(384px, 1fr));" rowGap={6} mt={2}>
          {state.images.map((x) => (
            <GridItem key={x}>
              <DeletableImage
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  if (window.confirm(i18n.edit.alerts.deleteImage)) {
                    setState({
                      ...state,
                      images: state.images.filter((i) => i !== x),
                    });
                  }
                }}
                src={x}
              />
            </GridItem>
          ))}
        </Grid>

        <ButtonGroup textAlign="center" display="block" mx="auto" mt={4}>
          <Button
            colorScheme="green"
            isLoading={loading}
            type="submit"
            onClick={() => save().then((x) => { if (x) closeModal(); })}
          >
            {i18n.labels.saveChanges}
          </Button>

          <Button
            colorScheme="red"
            type="button"
            onClick={() => del().then((x) => { if (x) closeModal(); })}
          >
            {i18n.labels.delete}
          </Button>
        </ButtonGroup>

      </Box>
    </div>
  );
};
