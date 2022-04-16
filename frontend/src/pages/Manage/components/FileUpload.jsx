// Yoinked from https://github.com/chakra-ui/chakra-ui/issues/457#issuecomment-1079961123
import React, { useRef, useState } from 'react';
import {
  Input, InputGroup, InputLeftElement, Icon,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';

export const FileUpload = ({
  name,
  placeholder,
  propagateChange,
  inputProperties,
  acceptedFileTypes = '',
  allowMultipleFiles = false,
  required = false,
}) => {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);

  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={FiFile} />
      </InputLeftElement>

      <input
        required={required}
        type="file"
        onChange={(x) => { setFiles(Array.from(x.target.files)); propagateChange(x); }}
        accept={acceptedFileTypes}
        name={name}
        ref={inputRef}
        multiple={allowMultipleFiles}
        {...inputProperties}
        style={{ display: 'none' }}
      />
      <Input
        cursor="pointer"
        placeholder={placeholder || 'Your file ...'}
        onClick={() => inputRef.current.click()}
        readOnly
        value={`${files.length || 'No'} ${files.length === 1 ? 'File' : 'Files'} Selected`}
      />
    </InputGroup>
  );
};

export default FileUpload;
