import axios from 'axios';
let MessageId = 0;
/*
export const addMessage = text => {
  return {
    type: 'ADD_MESSAGE',
    id: MessageId++,
    text
  };
};
*/

export const displayMessage = disp => {
  return {
    type: 'DISPLAY_MESSAGE',
    disp
  };
};

export const removeMessage = id => {
  return {
    type: 'REMOVE_MESSAGE',
    id: id
  };
};

/*
export const REQUEST_MESSAGES = text => {
  return {
    type: 'REQUEST_MESSAGES',
    text
  };
}

export const RECEIVE_MESSAGES = () => {
  return {
    type: 'REQUEST_MESSAGES',
    text
  };
}
*/


export const addMessage = text => {
  return {
    type: 'ADD_MESSAGE',
    id: MessageId++,
    text
  };
};

export const addMess = ({text}) => {
  return (dispatch, getState) => {
    dispatch(addMessageStarted());
    // changed text: text to just text
    axios
      .post(`http://localhost:9000/messages`, {
        id: MessageId++,
        text
      })
      .then(res => {
        dispatch(addMessage(res.data[res.data.length-1].text));
        dispatch(addMessageSuccess(res.text));

      })
      .catch(err => {
        dispatch(addMessageFailure(err.message));
      });
  };
};

const addMessageSuccess = text => ({
  type: 'ADD_MESSAGE_SUCCESS',
  // id: MessageId++,
  text: [
    ...text
  ]
});

const addMessageStarted = () => ({
  type: 'ADD_MESSAGE_STARTED'
});

const addMessageFailure = error => ({
  type: 'ADD_MESSAGE_FAILURE',
  text: {
    error
  }
});
