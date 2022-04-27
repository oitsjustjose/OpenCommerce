import {
  Code, useColorMode,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import atomOneLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MdCode = ({
  inline, className, children, props,
}) => {
  const { colorMode } = useColorMode();
  const match = /language-(\w+)/.exec(className || '');

  return !inline && match && match.length ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={colorMode === 'dark' ? atomOneDark : atomOneLight}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <Code {...props}>
      {children}
    </Code>
  );
};

const MdTable = ({
  children, props,
}) => (
  <TableContainer>
    <Table {...props}>
      {children}
    </Table>
  </TableContainer>
);

const MdThead = ({ children, props }) => (
  <Thead {...props} background={useColorModeValue('gray.50', 'gray.700')}>
    {children}
  </Thead>
);

export default ({ props, children }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      code: MdCode,
      table: MdTable,
      tr: Tr,
      td: Td,
      th: Th,
      thead: MdThead,
      tbody: Tbody,
    }}
    skipHtml
    {...props}
  >
    {children}
  </ReactMarkdown>
);
