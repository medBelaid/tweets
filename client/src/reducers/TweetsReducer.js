const TweetsReducer = (state, action) => {
    switch (action.type) {
      case "inc_counter1":
        return {
          ...state,
          counter1: state.counter1 + 1
        };
      case "inc_counter2":
      return {
        ...state,
        counter2: state.counter2 + 1
      };
      case "init_counter1":
        return {
          ...state,
          counter1: 0
        };
      case "init_counter2":
      return {
        ...state,
        counter2: 0
      };
      case "add_tweet1":
        return {
          ...state,
          tweets1: [action.payload, ...state.tweets1],
          error: null,
          isWaiting: false,
          errors: [],
        };
      case "clear_tweet1":
        return {
          ...state,
          tweets1: [],
        }
        case "clear_tweet2":
          return {
            ...state,
            tweets2: [],
          }
      case "add_tweet2":
        return {
          ...state,
          tweets2: [action.payload, ...state.tweets2],
          error: null,
          isWaiting: false,
          errors: [],
        };
      case "show_error":
        return { ...state, error: action.payload, isWaiting: false };
      case "add_errors":
        return { ...state, errors: action.payload, isWaiting: false };
      case "update_waiting":
        return { ...state, error: null, isWaiting: true };
      default:
        return state;
    }
  };
  export default TweetsReducer;
