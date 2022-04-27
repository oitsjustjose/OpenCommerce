import { Code, useColorMode } from '@chakra-ui/react';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import atomOneLight from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light';

export default ({
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
