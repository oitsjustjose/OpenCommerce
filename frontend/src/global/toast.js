import store from '../redux/store';

export const clearToast = () => {
  store.dispatch({ type: 'SET_TOAST', data: null });
};

export const setToast = (header, content, status) => {
  store.dispatch({
    type: 'SET_TOAST',
    data: { header, content, status },
  });
  setTimeout(clearToast, 5000);
};
