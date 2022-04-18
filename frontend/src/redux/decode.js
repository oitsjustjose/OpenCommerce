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
      window.location.href = '/login?invalidOrExpired=true';
    }
  } catch (ex) {
    window.location.href = '/login?invalidOrExpired=true';
  }
};

export const decodeFromToken = async (token) => {
  decodeAndDispatch(token);
};

export const decodeFromLocalStorage = async () => {
  decodeAndDispatch(window.localStorage.getItem('auth-token'));
};
