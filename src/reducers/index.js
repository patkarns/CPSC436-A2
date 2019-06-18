import { combineReducers } from 'redux';

const init =[
    // {id: 0, text: 'Good morning!'},
    // {id: 1, text: 'cream puffs!'},
    // {id: 2, text: 'I want to make cinnamon buns tomorrow'}
];

const addMessageReducer = (currentState, action) => {
  currentState = currentState || init;

	if (action.type === 'ADD_MESSAGE') {
    let newMessage = {id: action.id, text: action.text};
    return [...currentState, newMessage
          ]
	} else if (action.type === 'REMOVE_MESSAGE') {
    let newState = [];
    for (let entry of currentState) {
      if (entry.id !== action.id) {
          newState.push(entry);
      }
    }
    currentState = newState;
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
      case 'REMOVE_MESSAGE_STARTED':
        return {
          ...currentState,
          loading: true
        };
      case 'REMOVE_MESSAGE_SUCCESS':
        return {
          ...currentState,
          loading: false,
          error: null,
          messages: [...currentState.messages, action.text]
        };
      case 'REMOVE_MESSAGE_FAILURE':
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
