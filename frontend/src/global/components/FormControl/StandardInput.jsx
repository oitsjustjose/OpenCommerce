import React from 'react';
import {
  FormControl, Input, Text, useColorModeValue,
} from '@chakra-ui/react';
import IconTextDuo from '../IconTextDuo';

export default ({
  type, value, propKeyPressEvt, propSubmitEvt,
  propChangeEvt, required, error, labelText, labelIcon,
}) => {
  const id = Math.random().toString(36);
  return (
    <FormControl
      onKeyPress={propKeyPressEvt}
      onSubmit={propSubmitEvt}
      isRequired={required}
      padding=".5rem"
      borderRadius="8px"
      margin="auto"
    >
      <IconTextDuo icon={labelIcon} text={labelText} />
      <Input
        mt={4}
        id={id}
        type={type}
        isRequired={required}
        onChange={propChangeEvt}
        background={useColorModeValue('gray.50', 'gray.700')}
        color={useColorModeValue('black', 'white')}
        value={value}
      />

      <Text fontSize=".75rem" color="red.500">{error}</Text>
    </FormControl>
  );
};
