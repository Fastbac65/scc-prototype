const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };
    case 'OPEN_LIGHTBOX':
      return { ...state, lightbox: action.payload };
    case 'CLOSE_LIGHTBOX':
      return { ...state, lightbox: { ...state.lightbox, open: false } };

    case 'LIGHTBOX+1':
      // state.lightbox.image += 1;
      return { ...state, lightbox: { ...state.lightbox, currentIndx: state.lightbox.currentIndx + 1 } };
    case 'LIGHTBOX-1':
      return { ...state, lightbox: { ...state.lightbox, currentIndx: state.lightbox.currentIndx - 1 } };

    default:
      throw new Error('no action');
  }
};

export default reducer;
