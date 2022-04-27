import React, { useEffect, useState } from 'react';

import {
  Box, Button, Code, Heading,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import Loading from '../../global/components/Loading';
import { Product as i18n } from '../../global/i18n';
import store from '../../redux/store';
import Carousel from './components/Carousel';

export default () => {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (loaded) return () => {};

    const _ = async (setProductPt, setLoadedPt) => {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('productId')) {
        store.dispatch({ type: 'SET_ALERT', data: { header: i18n.downloadFailedAlert.header, content: 'URL is invalid as it\'s missing the Product ID' } });
        setErrored(true);
        return;
      }

      const productId = params.get('productId');
      const resp = await fetch(`/api/v1/products/${productId}`);
      const data = await resp.json();
      if (resp.ok) {
        setProductPt(data);
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: i18n.downloadFailedAlert.header, content: JSON.stringify(data.error) } });
      }
      setLoadedPt(true);
    };

    _(setProduct, setLoaded);
    return () => {};
  }, [setProduct, loaded, setLoaded]);

  if (errored) {
    return <div />;
  }

  if (!errored && !loaded) {
    return (<Loading />);
  }

  return (
    <div style={{ maxWidth: '768px', margin: 'auto' }}>
      <Heading textAlign="center" mb={4}>{product.name}</Heading>
      {(product.images && product.images.length) ? (
        <Carousel photos={product.images} />
      ) : (
        <Heading textAlign="center" size="md">
          (No Photos Available)
        </Heading>
      )}

      <hr style={{ margin: '2rem auto' }} />

      <Box my={2} mx="auto" display="block" textAlign="center">
        <Heading my={2} size="md">
          {/* TODO: currency support  */}
          {/* TODO: Support for shipping costs to be paid and selected by user */}
          {`$${product.price} (USD)`}
        </Heading>

        <Button colorScheme="green">
          Add to Cart
        </Button>
      </Box>

      <hr style={{ margin: '2rem auto' }} />

      <div>
        <Heading my={3}>Description</Heading>
        <Heading my={3} size="md">{product.name}</Heading>
        <ReactMarkdown>{product.description || ''}</ReactMarkdown>
      </div>

      <hr style={{ margin: '2rem auto' }} />

      <Code colorScheme="cyan">
        {JSON.stringify(product, null, 2)}
      </Code>
    </div>
  );
};
