import { decodeFromLocalStorage, decodeFromToken } from './decode';

const defaultState = {
  user: null,
  i18n: null,
  langs: null,
  alert: null,
};

// eslint-disable-next-line default-param-last
export default (state = defaultState, action) => {
  switch (action.type) {
    case '@@INIT':
      decodeFromLocalStorage();
      return state;
    case 'SET_USER_TOKEN':
      window.localStorage.setItem('auth-token', action.token);
      decodeFromToken(action.token);
      return state;
    case 'SET_USER':
      return {
        ...state,
        user: action.data,
      };
    case 'CLEAR_USER':
      window.localStorage.removeItem('auth-token');
      return {
        ...state,
        user: null,
      };
    case 'SET_I18N':
      return {
        ...state,
        i18n: action.data,
      };
    case 'SET_LANGS':
      return {
        ...state,
        langs: action.data,
      };
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.data || null,
      };
    default:
      return state;
  }
};
