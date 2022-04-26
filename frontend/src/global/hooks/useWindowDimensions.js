import { useState, useEffect } from 'react';

const get = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export default () => {
  const [dim, setDim] = useState(get());
  useEffect(() => {
    const resize = () => setDim(get());
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return dim;
};
