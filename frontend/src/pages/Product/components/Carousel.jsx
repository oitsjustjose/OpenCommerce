import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Flex, Image } from '@chakra-ui/react';
import useWindowDimensions from '../../../global/hooks/useWindowDimensions';

const fwidth = 1024;

export default ({ photos }) => {
  const { width } = useWindowDimensions();

  return (
    <Flex justifyContent="center" alignItems="center">
      <Carousel
        autoPlay
        infiniteLoop
        emulateTouch={width < fwidth}
        renderThumbs={photos.length > 1 ? (x) => (x) : () => {}}
        width={width > fwidth ? '768px' : '98vw'}
      >
        {photos.map((x) => (
          <div>
            <Image key={x} src={x} />
          </div>
        ))}
      </Carousel>
    </Flex>
  );
};
