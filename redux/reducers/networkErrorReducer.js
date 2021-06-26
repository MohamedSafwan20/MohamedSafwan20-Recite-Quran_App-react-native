let initialState = false;

const networkErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NETWORK_ERROR':
      initialState = action.payload;
      return initialState;
    default:
      return initialState;
  }
};

export default networkErrorReducer;
