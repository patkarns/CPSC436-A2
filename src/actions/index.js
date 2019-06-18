import axios from 'axios';
let MessageId = 3;
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


export const addMessage = (id, text) => {
  return {
    type: 'ADD_MESSAGE',
    id,
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
        dispatch(addMessage(res.data[res.data.length-1].id, res.data[res.data.length-1].text));
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


export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  };
};

export const clearMess = (arr) => {
  return (dispatch, getState) => {
    dispatch(clearMessageStarted());
    // changed text: text to just text
    axios
      .delete(`http://localhost:9000/messages`, {
        arr
      })
      .then(res => {
        dispatch(clearMessage());
        dispatch(clearMessageSuccess(res.text));

      })
      .catch(err => {
        dispatch(clearMessageFailure(err.message));
      });
  };
};

const clearMessageSuccess = text => ({
  type: 'CLEAR_MESSAGE_SUCCESS',
  // id: MessageId++,
  text: [
    ...text
  ]
});

const clearMessageStarted = () => ({
  type: 'CLEAR_MESSAGE_STARTED'
});

const clearMessageFailure = error => ({
  type: 'CLEAR_MESSAGE_FAILURE',
  text: {
    error
  }
});
