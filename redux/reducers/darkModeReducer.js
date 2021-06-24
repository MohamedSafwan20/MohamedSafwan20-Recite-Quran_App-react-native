let initialState = false;

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE':
      initialState = action.payload;
      return initialState;
    default:
      return initialState;
  }
};

export default darkModeReducer;
