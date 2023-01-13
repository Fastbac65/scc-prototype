const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };
    case 'MODAL':
      return { ...state, modal: action.payload };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };
    //OPEN_LIGHTBOX needs payload to receive currentIndx to open on that image
    case 'OPEN_LIGHTBOX':
      return { ...state, lightbox: action.payload };
    case 'CLOSE_LIGHTBOX':
      return { ...state, lightbox: { ...state.lightbox, open: false } };
    case 'LIGHTBOX+1':
      return { ...state, lightbox: { ...state.lightbox, currentIndx: state.lightbox.currentIndx + 1 } };
    case 'LIGHTBOX-1':
      return { ...state, lightbox: { ...state.lightbox, currentIndx: state.lightbox.currentIndx - 1 } };

    default:
      throw new Error('no action');
  }
};

export default reducer;

// reference copy
// const initialstate = {
//   alert: { open: false, severity: 'info', message: '', duration: 1000 },
//   modal: { open: false, title: '', content: '' },
//   loading: false,
//   lightbox: { open: false, currentIndx: 0 },
// };
