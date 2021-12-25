const TweetsReducer = (state, action) => {
    switch (action.type) {
      case "set_chart_data":
        return {
          ...state,
          chartData: action.payload
        };
      case "set_word1":
        return {
          ...state,
          word1: action.payload
        };
      case "set_word2":
        return {
          ...state,
          word2: action.payload
        };
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
          errors: []
        };
      case "clear_tweet1":
        return {
          ...state,
          tweets1: []
        }
      case "add_tweet2":
        return {
          ...state,
          tweets2: [action.payload, ...state.tweets2],
          error: null,
          errors: [],
        };
      case "clear_tweet2":
        return {
          ...state,
          tweets2: []
        }
      case "update_submited":
        return {
          ...state,
          isSubmitted: action.payload
        }
      case "show_error":
        return {
          ...state,
          error: action.payload,
      };
      case "add_errors":
        return {
          ...state,
          errors: action.payload,
        };
      default:
        return state;
    }
  };
  export default TweetsReducer;
