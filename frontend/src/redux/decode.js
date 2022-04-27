import { setToast } from '../global/toast';
import store from './store';

const decodeAndDispatch = async (token) => {
  if (!token) return;

  try {
    const resp = await fetch(`/api/v1/user/decode?token=${token}`);
    const data = await resp.json();

    if (resp.ok) {
      store.dispatch({ type: 'SET_USER', data: { ...data, token } });
      setToast(`Welcome ${data.email}!`, '', 'info');
    } else {
      if (resp.status === 410 && window.localStorage.getItem('auth-token')) {
        window.localStorage.removeItem('auth-token');
      }
      window.location.href = '/login?invalidOrExpired=true';
    }
  } catch (ex) {
    window.location.href = '/login?invalidOrExpired=true';
  }
};

export const decodeFromToken = async (token) => {
  await decodeAndDispatch(token);
};

export const decodeFromLocalStorage = async () => {
  await decodeAndDispatch(window.localStorage.getItem('auth-token'));
};
