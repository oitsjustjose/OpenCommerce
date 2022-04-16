import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../../redux/store';

export default ({ func, dispatch, redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    func && func();
    dispatch && store.dispatch(dispatch);
    redirect && navigate(redirect, { replace: true });
    return () => {};
  }, [func, dispatch, redirect]);

  return (<div />);
};
