import React, { useState } from 'react';
import {
  Box, Button, FormControl, Heading,
  InputGroup, InputLeftAddon, Text,
} from '@chakra-ui/react';
import CurrencyInput from 'react-currency-input-field';
import { AiOutlineFileText, AiOutlineNumber } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import ReactMde from 'react-mde';
import InlineLabelInput from '../../../../global/components/FormControl/InlineLabelInput';
import IconTextDuo from '../../../../global/components/IconTextDuo';
import { Manage as i18n } from '../../../../global/i18n';
import store from '../../../../redux/store';
import FileUpload from '../FileUpload';
import { getAuthHeaders, uploadImage } from '../../../../global/api';
import { setToast } from '../../../../global/toast';
import Markdown from '../../../../global/components/Markdown';

const InputGroupStyle = {
  marginTop: '1rem',
  marginBottom: '1rem',
};

export default ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [mdeTab, setMdeTab] = useState('write');
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
      store.dispatch({ type: 'SET_ALERT', data: i18n.missingInfo });
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
        setToast(i18n.create.alerts.success, '', 'success');
        setLoading(false);
        return true;
      }
      setToast(i18n.create.alerts.failure, data?.error || '', 'error');
    } catch (ex) {
      setToast(i18n.create.alerts.failure, ex || '', 'error');
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
              onValueChange={(value) => setState({
                ...state, price: JSON.parse(value),
              })}
            />
          </InputGroup>
          <Text fontSize=".75rem" color="red.500">{!state.price ? i18n.labels.required : null}</Text>
        </FormControl>

        <div style={{ padding: '0.5rem' }}>
          <Heading pb={3} size="md">{i18n.labels.desc}</Heading>

          <ReactMde
            value={state.description}
            onChange={(x) => setState({ ...state, description: x })}
            selectedTab={mdeTab}
            onTabChange={setMdeTab}
            generateMarkdownPreview={(md) => Promise.resolve(<Markdown>{md}</Markdown>)}
            childProps={{ writeButton: { tabIndex: -1 } }}
          />
          <Text fontSize=".75rem" color="red.500">{!state.description ? i18n.labels.required : null}</Text>
        </div>

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
          {i18n.labels.saveProduct}
        </Button>
      </Box>
    </div>
  );
};
