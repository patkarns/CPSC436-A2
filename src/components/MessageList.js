import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addMessage, removeMessage, displayMessage, addMess } from '../actions/index'
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
      //this.props.addWeatherData(response);
      //console.log(this.props.weather);
      //const {weather} = this.props;
      for (let entry of response.data) {
        this.props.addMessage(entry.text);
      }

      //this.setState( { disp: response.data } )
    })
    .catch(error => {
    console.log(error);
    });

    // fetch('http://localhost:9000/messages')
    //     .then(res => res.text())
    //     .then(res => this.setState({ apiResponse: res }));
    //     console.log(this.props.apiResponse);
  }

    componentWillMount() {
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

    render(){
      // const listItems = data.map((d) => <li key={d.id}>{d.text}</li>);
      const listItems = this.props.text.map((d) => <li onClick={ () => {this.handleClick(d.id);} } key={d.id}> <button className="removeButton" onClick={ () => {this.handleRemove(d.id);} }> remove </button>  {d.text} </li>);
      /*console.log('apiResponse: ')
      console.log(this.state.apiResponse)
      */
      return (
                  <div>

                    <h2> {this.props.disp.disp} </h2>
                    <h3> Messages Submitted: </h3>
                    <p> {listItems} </p>

                  </div>
        );
    }
}
//<p>{this.state.apiResponse}</p>

const mapStateToProps = (state) => {
  return { text: state.text, disp: state.disp };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addMessage,
      displayMessage,
      removeMessage
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
