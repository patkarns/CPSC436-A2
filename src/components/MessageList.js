import React/*, {Component}*/ from 'react'
import { connect } from 'react-redux'
import { addMessage, removeMessage, displayMessage, clearMess } from '../actions/index'
import {bindActionCreators} from 'redux'
import '../App.css';
const axios = require('axios');
// import { addMessage } from '../actions/index'

class MessageList extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          disp: '',
          apiResponse: []
      };
      this.handleClick = this.handleClick.bind(this);
  }

  callMessageApp() {

    axios.get('http://localhost:9000/messages')
    .then(response => {
      for (let entry of response.data) {
        this.props.addMessage(entry.id, entry.text);
      }
    })
    .catch(error => {
    console.log(error);
    });

    // fetch('http://localhost:9000/messages')
    //     .then(res => res.text())
    //     .then(res => this.setState({ apiResponse: res }));
    //     console.log(this.props.apiResponse);
  }

    componentDidMount() {
      this.callMessageApp();
    }

    handleClick(id) {
      for (let entry of this.props.text) {
        if (entry.id === id) {
          let total = entry.text.length;
          let str = '"' + entry.text + '"    - Post ID: ' + entry.id + ' (character count: ' + total + ')';

          this.props.displayMessage(str);
        }
      }
    }

    handleRemove(id) {
      this.props.removeMessage(id);
    }

    handleClear() {
      console.log('handle clear')
      console.log(this.props.text)
      this.props.clearMess(this.props.text);
    }

    render(){
      // const listItems = data.map((d) => <li key={d.id}>{d.text}</li>);
      //const listItems = this.props.text.map((d) => <li onClick={ () => {this.handleClick(d.id);} } key={d.id}> <button className="removeButton" onClick={ () => {this.handleRemove(d.id);} }> remove </button>  {d.text} </li>);
      const logo = require('../message.png');
      const listItems = this.props.text.map((d) => <li class = "expand" onClick={ () => {this.handleClick(d.id);} } key={d.id}> <img alt="mail" src={logo} class="Mail" /> {d.text} </li>);
      return (
                  <div>
                    <h2> {this.props.disp.disp} </h2>
                      <h3> Messages Submitted:
                    <button type="button" className = "clearButton" onClick={ () => {this.handleClear();} }>Clear All Messages</button>
                    </h3>
                    <div className="MessageBox">
                      <p> {listItems} </p>
                    </div>
                  </div>
        );
    }
}

const mapStateToProps = (state) => {
  return { text: state.text, disp: state.disp };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addMessage,
      displayMessage,
      removeMessage,
      clearMess
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MessageList);

/*

import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../actions';


class InputBar extends React.Component {
  onSubmit(e) {
  	e.preventDefault();
    let text = this.refs.text.value;
    this.props.addTodo(text);
    this.refs.form.reset();
  }

	render() {
		return (
      <form onSubmit={this._onSubmit} ref='form'>
      	<input type='text' ref='text' />
        <input type='submit' value='Add Todo' />
      </form>
    );
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
	return { messages: state.messages }; //now it will appear as props
}

export default connect(mapStateToProps, { increment })(InputBar);

*/
