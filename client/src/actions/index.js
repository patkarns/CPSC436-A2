import axios from 'axios';
//let MessageId = 3;
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


export const addMessage = (_id, text, votes) => {
  return {
    type: 'ADD_MESSAGE',
    _id,
    text,
    votes
  };
};

export const updateAddMessage = newMessages => {
  return {
    type: 'UPDATE_ADD_MESSAGE',
    newMessages
  };
};

export const addMess = ({text}) => {
  return (dispatch, getState) => {
    dispatch(addMessageStarted());
    // changed text: text to just text
    axios
      .post('/messages', {
        // id: MessageId++,
        text,

      })
      .then(res => {
        let addedMessage = res.data[res.data.length-1];
        dispatch(addMessage(addedMessage._id, addedMessage.text, addedMessage.votes));
        //dispatch(updateAddMessage(res.data));
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

export const filterMessage = filtered => {
  return {
    type: 'FILTER_MESSAGE',
    filtered
  };
};

export const filterMess = () => {
  return (dispatch, getState) => {
    dispatch(filterMessageStarted());
    // changed text: text to just text
    axios
      .get('/filtered')
      .then(res => {
        dispatch(filterMessage(res.data));
        dispatch(filterMessageSuccess(res));

      })
      .catch(err => {
        dispatch(filterMessageFailure(err.message));
      });
  };
};

const filterMessageSuccess = text => ({
  type: 'FILTER_MESSAGE_SUCCESS',
  text: [
    ...text
  ]
});

const filterMessageStarted = () => ({
  type: 'FILTER_MESSAGE_STARTED'
});

const filterMessageFailure = error => ({
  type: 'FILTER_MESSAGE_FAILURE',
  text: {
    error
  }
});

// export const voteMessage = (voted) => {
//   return {
//     type: 'VOTE_MESSAGE',
//     voted
//   };
// };

export const voteMessage = (_id) => {
  return {
    type: 'VOTE_MESSAGE',
    _id
  };
};

export const voteMess = ({id}) => {
  return (dispatch, getState) => {
    dispatch(voteMessageStarted());
    // changed text: text to just text
    axios
      .put('/messages', {
        _id: id
      })
      .then(res => {
        dispatch(voteMessage(id));
        //dispatch(voteMessage(res.data));
        dispatch(voteMessageSuccess(res.text));

      })
      .catch(err => {
        dispatch(voteMessageFailure(err.message));
      });
  };
};

const voteMessageSuccess = text => ({
  type: 'VOTE_MESSAGE_SUCCESS',
  // id: MessageId++,
  text: [
    ...text
  ]
});

const voteMessageStarted = () => ({
  type: 'VOTE_MESSAGE_STARTED'
});

const voteMessageFailure = error => ({
  type: 'VOTE_MESSAGE_FAILURE',
  text: {
    error
  }
});
