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
    // console.log('action: ' + JSON.stringify(action));
    // currentState.push(newMessage);

    //console.log('cur_state:' + JSON.stringify(currentState));
    // return currentState;
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
    default:
      return currentState;
  }
}


export default combineReducers({
	text: addMessageReducer,
  disp: displayMessageReducer,
  messagesReducer
});
