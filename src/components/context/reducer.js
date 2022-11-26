const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };
    case 'OPEN_LIGHTBOX':
      return { ...state, lightbox: true };
    case 'CLOSE_LIGHTBOX':
      return { ...state, lightbox: false };

    default:
      throw new Error('no action');
  }
};

export default reducer;
