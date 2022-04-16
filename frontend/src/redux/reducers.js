import JwtDecode from 'jwt-decode';
import moment from 'moment';

const getUserFromLocalStorage = () => {
  const u = JSON.parse(window.localStorage.getItem('redux-persistent'));
  if (!u) {
    return null;
  }

  if (moment().isAfter(moment(u.expiresAt))) {
    window.localStorage.removeItem('redux-persistent');
    return null;
  }
  return u;
};

const defaultState = {
  user: getUserFromLocalStorage(),
  i18n: null,
  langs: null,
  alert: null,
};

const decodeUser = (token) => {
  const user = JwtDecode(token);
  const userData = { ...user, token };
  window.localStorage.setItem('redux-persistent', JSON.stringify(userData));
  return userData;
};

// eslint-disable-next-line default-param-last
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return {
        ...state,
        user: decodeUser(action.token),
      };
    case 'CLEAR_USER':
      window.localStorage.removeItem('redux-persistent');
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
