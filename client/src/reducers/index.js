import { combineReducers } from 'redux';

const init =[
    // {_id: 0, text: 'Good morning!'},
    // {_id: 1, text: 'cream puffs!'},
    // {_id: 2, text: 'I want to make cinnamon buns tomorrow'}
];

const addMessageReducer = (currentState, action) => {
  currentState = currentState || init;

	if (action.type === 'ADD_MESSAGE') {
    for (let entry of currentState) {
      if (entry._id === action._id) {
        return currentState;
      }
    }
    let newMessage = {_id: action._id, text: action.text, votes: action.votes};
    return [...currentState, newMessage
          ]
	} else if (action.type === 'UPDATE_ADD_MESSAGE') {
    currentState = action.newMessages;
    return currentState;
	} else if (action.type === 'REMOVE_MESSAGE') {
    let newState = [];
    for (let entry of currentState) {
      if (entry._id !== action._id) {
          newState.push(entry);
      }
    }
    currentState = newState;
  } else if (action.type === 'FILTER_MESSAGE') {
    let newState = action.filtered
    currentState = newState;
  } else if (action.type === 'VOTE_MESSAGE') {
    let newState = [];
    for (let entry of currentState) {
      if (entry._id === action._id) {
          entry.votes++;
      }
      newState.push(entry);
    }
    currentState = newState;
    // currentState = action.voted;
    // return currentState;
  } else if (action.type === 'CLEAR_MESSAGE') {
    let newState = [];
    currentState = newState;
  }
	return currentState;
};

const displayMessageReducer = (old='', action) => {
	if (action.type === 'DISPLAY_MESSAGE') {
    old = action;
	}
	return old;
};

///////////////////////////////////////////////////////
const initialState = {
  loading: false,
  messages: init,
  error: null
};

// export default function
const messagesReducer = (currentState, action) => {
  currentState = currentState || initialState;

  switch (action.type) {
    case 'ADD_MESSAGE_STARTED':
      return {
        ...currentState,
        loading: true
      };
    case 'ADD_MESSAGE_SUCCESS':
      return {
        ...currentState,
        loading: false,
        error: null,
        messages: [...currentState.messages, action.text]
      };
    case 'ADD_MESSAGE_FAILURE':
      return {
        ...currentState,
        loading: false,
        error: action.text.error
      };
      case 'FILTER_MESSAGE_STARTED':
        return {
          ...currentState,
          loading: true
        };
      case 'FILTER_MESSAGE_SUCCESS':
      console.log('filter message success')
      console.log(action.filtered)
        return {
          ...currentState,
          loading: false,
          error: null,
          messages: [...currentState.messages, action.text]
        };
      case 'FILTER_MESSAGE_FAILURE':
        return {
          ...currentState,
          loading: false,
          error: action.text.error
        };
        case 'VOTE_MESSAGE_STARTED':
          return {
            ...currentState,
            loading: true
          };
        case 'VOTE_MESSAGE_SUCCESS':
          return {
            ...currentState,
            loading: false,
            error: null,
            messages: [...currentState.messages, action.text]
          };
        case 'VOTE_MESSAGE_FAILURE':
          return {
            ...currentState,
            loading: false,
            error: action.text.error
          };
    default:
      return currentState;
  }
}


export default combineReducers({
	text: addMessageReducer,
  disp: displayMessageReducer,
  messagesReducer
});
