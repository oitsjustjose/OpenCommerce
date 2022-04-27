import React from 'react';
import {
  Button, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/react';
import { General as i18n } from '../../../global/i18n';

export default ({
  open, header, superOnClose, size, children,
}) => (
  <Modal isOpen={open} onClose={superOnClose} size={size || 'md'}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{header}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {children}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={superOnClose}>
          {i18n.close}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
