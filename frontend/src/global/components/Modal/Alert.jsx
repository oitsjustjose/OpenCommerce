import React from 'react';
import {
  Button, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import store from '../../../redux/store';

const AlertModal = ({
  open, header, content,
}) => (
  <Modal isOpen={open} onClose={() => store.dispatch({ type: 'SET_ALERT', data: null })}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{header}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <p>{content}</p>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={() => store.dispatch({ type: 'SET_ALERT', data: null })}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const mapStateToProps = ({ alert }) => ({
  open: !!alert,
  header: alert?.header || null,
  content: alert?.content || null,
});

export default connect(mapStateToProps)(AlertModal);
