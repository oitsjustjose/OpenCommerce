import React, { useState, useEffect } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Button, Flex, Heading,
} from '@chakra-ui/react';
import { BiSearchAlt2, BiPlus } from 'react-icons/bi';
import { Manage as i18n } from '../../global/i18n';
import Loading from '../../global/components/Loading';
import store from '../../redux/store';
import InlineLabelInput from '../../global/components/FormControl/InlineLabelInput';
import DynamicModal from './components/DynamicModal';
import New from './components/modal/New';
import Edit from './components/modal/Edit';
import search from '../../global/search';
import IconTextDuo from '../../global/components/IconTextDuo';

const init = async (setProductsPt, setLoadedPt, setAllProductsPt) => {
  const resp = await fetch('/api/v1/products');
  const data = await resp.json();
  if (resp.ok) {
    setProductsPt(data);
    setAllProductsPt(data);
    setLoadedPt(true);
  } else {
    store.dispatch({ type: 'SET_ALERT', data: { header: i18n.downloadFailedAlert.header, content: JSON.stringify(data.error) } });
  }
};

export default () => {
  // New Product Modal management
  const [newModal, setNewModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [hasLoaded, setLoaded] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (hasLoaded) return () => {};
    init(setProducts, setLoaded, setAllProducts);
    return () => {};
  }, [hasLoaded, setLoaded, setProducts, setAllProducts]);

  if (!hasLoaded) {
    return (<Loading />);
  }

  return (
    <div>
      <Heading my={3} textAlign="center">
        {process.env.REACT_APP_NAME}
      </Heading>
      <Heading size="md" my={3} textAlign="center">
        {i18n.title}
      </Heading>

      <Flex justifyContent="center" alignItems="center">
        <Box>
          <InlineLabelInput
            propChangeEvt={(evt) => setProducts(search(evt.target.value, allProducts))}
            propKeyPressEvt={() => {}}
            propSubmitEvt={() => {}}
            type="text"
            labelBgColor="purple.400"
            labelFgColor="white"
            labelIcon={(<BiSearchAlt2 />)}
            labelText={i18n.labels.search}
            error={null}
          />
        </Box>

        <Button colorScheme="blue" onClick={() => setNewModal(true)}>
          <IconTextDuo text={i18n.create.button} icon={(<BiPlus />)} />
        </Button>
      </Flex>

      <hr />

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>{i18n.labels.name}</Th>
              <Th>{i18n.labels.price}</Th>
              <Th>{i18n.labels.qty}</Th>
              <Th>{i18n.labels.rating}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((x) => (
              <Tr
                onClick={() => setEditItem(x)}
                cursor="pointer"
                _hover={{ backgroundColor: 'var(--chakra-colors-green-500)' }}
                key={x.name}
              >
                <Td>{x.name}</Td>
                <Td>{`$${x.price}`}</Td>
                <Td>{x.quantity}</Td>
                <Td>{x.overallRating || i18n.labels.noReview}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <DynamicModal
        open={newModal}
        header={i18n.create.title}
        superOnClose={() => setNewModal(false)}
        size="3xl"
      >
        <New closeModal={() => {
          init(setProducts, setLoaded, setAllProducts).then(() => setNewModal(false));
        }}
        />
      </DynamicModal>

      <DynamicModal
        open={!!editItem}
        header={i18n.edit.title(editItem?.name)}
        superOnClose={() => setEditItem(null)}
        size="3xl"
      >
        <Edit
          product={editItem}
          closeModal={() => {
            init(setProducts, setLoaded, setAllProducts).then(() => setEditItem(null));
          }}
        />
      </DynamicModal>
    </div>
  );
};
