const defaultState = {
  isAuthenticated: false,
  user: null,
  i18n: null,
  langs: null,
};

// eslint-disable-next-line default-param-last
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...action.user,
        },
        isAuthenticated: true,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
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
    default:
      return state;
  }
};
