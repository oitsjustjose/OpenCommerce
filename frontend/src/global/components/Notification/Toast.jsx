import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { clearToast } from '../../toast';

const Toast = ({
  open, header, content, status,
}) => (open ? (
  <Alert
    position="fixed"
    bottom="1rem"
    right="1rem"
    width="unset"
    maxWidth="75vw"
    status={status}
    onClick={clearToast}
    cursor="pointer"
  >
    <AlertIcon />
    <AlertTitle>{header}</AlertTitle>
    <AlertDescription>{content}</AlertDescription>
  </Alert>
) : (<div />));

const mapStateToProps = ({ toast }) => ({
  open: !!toast,
  header: toast?.header || null,
  content: toast?.content || null,
  status: toast?.status || null,
});

export default connect(mapStateToProps)(Toast);
