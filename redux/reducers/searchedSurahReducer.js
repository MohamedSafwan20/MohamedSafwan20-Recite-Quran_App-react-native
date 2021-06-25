let initialState = null;

const searchedSurahReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      initialState = action.payload;
      return initialState;
    default:
      return initialState;
  }
};

export default searchedSurahReducer;
