import store from './store';

const decodeAndDispatch = async (token) => {
  if (!token) return;

  try {
    const resp = await fetch(`/api/v1/user/decode?token=${token}`);
    const data = await resp.json();

    if (resp.ok) {
      store.dispatch({ type: 'SET_USER', data: { ...data, token } });
    } else {
      if (resp.status === 410 && window.localStorage.getItem('auth-token')) {
        window.localStorage.removeItem('auth-token');
      }
      store.dispatch({ type: 'SET_ALERT', data: { header: 'Login Is Invalid', content: resp.error } });
    }
  } catch (ex) {
    store.dispatch({ type: 'SET_ALERT', data: { header: 'Login Is Invalid', content: ex } });
  }
};

export const decodeFromToken = async (token) => {
  decodeAndDispatch(token);
};

export const decodeFromLocalStorage = async () => {
  decodeAndDispatch(window.localStorage.getItem('auth-token'));
};
