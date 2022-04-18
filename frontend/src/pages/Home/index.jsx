/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Heading, Grid, GridItem } from '@chakra-ui/react';
import { connect } from 'react-redux';
import store from '../../redux/store';
import Card from './components/Card';
import { Home as i18n } from '../../global/i18n';

const Home = ({ user }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch('/api/v1/products');
      const data = await resp.json();
      if (resp.ok) {
        setProducts(data);
      } else {
        store.dispatch({ type: 'SET_ALERT', data: { header: i18n.downloadFailedAlert.header, content: JSON.stringify(data.error) } });
      }
    })();

    return () => {};
  }, [products, setProducts]);

  return (
    <div>
      <Heading textAlign="center">
        Hello
        {' '}
        {user?.first}
        !
      </Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(384px, 1fr));" rowGap={6}>
        {products.map((x) => (
          <GridItem key={x._id}>
            <Card product={x} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(Home);
