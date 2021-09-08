const Reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default Reducer;
