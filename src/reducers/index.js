import { combineReducers } from 'redux';

const init =[
    {id: 0, text: 'Good morning!'},
    {id: 1, text: 'cream puffs!'},
    {id: 2, text: 'I want to make cinnamon buns tomorrow'}
];

const addMessageReducer = (currentState, action) => {
  currentState = currentState || init;

	if (action.type === 'ADD_MESSAGE') {
    let newMessage = {id: action.id, text: action.text};
    // console.log('action: ' + JSON.stringify(action));
    // currentState.push(newMessage);

    console.log('cur_state:' + JSON.stringify(currentState));
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

export default combineReducers({
	text: addMessageReducer,
  disp: displayMessageReducer
});
