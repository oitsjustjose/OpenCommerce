/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Heading, Grid, GridItem, Box,
} from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import store from '../../redux/store';
import Card from './components/Card';
import { Home as i18n } from '../../global/i18n';
import Loading from '../../global/components/Loading';
import InlineLabelInput from '../../global/components/FormControl/InlineLabelInput';
import search from '../../global/search';

export default () => {
  const [hasLoaded, setLoaded] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (hasLoaded) return () => {};

    const _ = async (setProductsPt, setLoadedPt) => {
      const resp = await fetch('/api/v1/products');
      const data = await resp.json();
      if (resp.ok) {
        setProductsPt(data);
        setAllProducts(data);
        setLoadedPt(true);
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: i18n.downloadFailedAlert.header, content: JSON.stringify(data.error) } });
      }
    };

    _(setProducts, setLoaded);
    return () => {};
  }, [hasLoaded, setLoaded, setProducts, setAllProducts]);

  if (!hasLoaded) {
    return (<Loading />);
  }

  return (
    <div>
      <Heading textAlign="center">
        OpenCommerce Store
      </Heading>
      <Box maxW="400px" m="auto">
        <InlineLabelInput
          propChangeEvt={(evt) => setProducts(search(evt.target.value, allProducts))}
          propKeyPressEvt={() => {}}
          propSubmitEvt={() => {}}
          type="text"
          labelBgColor="green.400"
          labelFgColor="white"
          labelIcon={(<BiSearchAlt2 />)}
          labelText="Search.."
          error={null}
        />
      </Box>

      <hr />

      <Grid templateColumns="repeat(auto-fit, minmax(384px, 1fr));" rowGap={6} mt={2}>
        {products.map((x) => (
          <GridItem key={x._id}>
            <Card product={x} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
