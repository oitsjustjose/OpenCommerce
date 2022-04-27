import React, { useEffect, useState } from 'react';

import { Box, Button, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../global/components/Loading';
import { Product as i18n } from '../../global/i18n';
import store from '../../redux/store';
import Carousel from './components/Carousel';
import Code from './components/Code';

export default () => {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (loaded) return () => {};

    const _ = async (setProductPt, setLoadedPt, setErroredPt) => {
      // const productId = params.get('productId');
      const productId = params.id;
      const resp = await fetch(`/api/v1/products/${productId}`);
      const data = await resp.json();
      if (resp.ok) {
        setProductPt(data);
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: i18n.downloadFailedAlert.header, content: JSON.stringify(data.error) } });
        setErroredPt(true);
      }
      setLoadedPt(true);
    };

    _(setProduct, setLoaded, setErrored);
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
      <Button colorScheme="purple" onClick={() => navigate('/', { replace: true })}>
        <MdOutlineArrowBackIosNew />
      </Button>
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
        <ReactMarkdown
          components={{ code: Code }}
          skipHtml
        >
          {product.description || ''}
        </ReactMarkdown>
      </div>
    </div>
  );
};
