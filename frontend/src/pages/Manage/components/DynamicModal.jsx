import React from 'react';
import {
  Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
} from '@chakra-ui/react';

export default ({
  open, header, superOnClose, size, children,
}) => (
  <Modal
    isOpen={open}
    onClose={superOnClose}
    size={size || 'md'}
    closeOnOverlayClick={false}
    closeOnEsc={false}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{header}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {children}
      </ModalBody>
    </ModalContent>
  </Modal>
);
