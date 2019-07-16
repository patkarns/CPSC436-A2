import React/*, {Component}*/ from 'react'
import { connect } from 'react-redux'
import { addMessage, displayMessage, filterMess, voteMess } from '../actions/index'
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

    axios.get('/messages')
    .then(response => {
      for (let entry of response.data) {
        this.props.addMessage(entry._id, entry.text, entry.votes);
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
      // console.log('click')
      // console.log(id);
      // console.log(this.props.text);
      for (let entry of this.props.text) {
        if (entry._id === id) {
          let total = entry.text.length;
          let str = '"' + entry.text + '"' +'    - Votes: ' + entry.votes + ' (character count: ' + total + ')';

          this.props.displayMessage(str);
        }
      }
    }


    handleVote(id) {
      this.props.voteMess({id});
      this.setState({ text: this.text });
      this.handleClick(id);

    }

    handleFilter() {
      this.props.filterMess();
    }

    render(){
      // const listItems = data.map((d) => <li key={d.id}>{d.text}</li>);
      //const listItems = this.props.text.map((d) => <li onClick={ () => {this.handleClick(d.id);} } key={d.id}> <button className="removeButton" onClick={ () => {this.handleRemove(d.id);} }> remove </button>  {d.text} </li>);
      const logo = require('../message.png');
      const listItems = this.props.text.map((d) =>  <li className = "expand" onClick={ () => {this.handleClick(d._id);} } key={d._id}>
                                                    <img alt="mail" src={logo} className="Mail" />
                                                    <button className="voteButton" onClick={ () => {this.handleVote(d._id);} }> vote! </button>
                                                    {d.text} </li>);
                                                    // console.log('items: ')
                                                    // console.log(this.props.text)
      return (
                  <div>
                    <h2> {this.props.disp.disp} </h2>
                      <h3> Messages Submitted:
                    <button type="button" className = "filterButton" onClick={ () => {this.handleFilter();} }>Top 3 Messages</button>
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
      filterMess,
      voteMess
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
