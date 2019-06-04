import React, {Component} from 'react'
import { connect } from 'react-redux';
import { addMessage, displayMessage } from '../actions/index'
import {bindActionCreators} from 'redux'
import '../App.css';

class InputBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeText(e){
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let text = this.refs.text.value;
        this.props.addMessage(text);
        this.setState({ text: this.text });
        this.refs.form.reset();
        // console.log('input bar props: ' +  JSON.stringify(this.props.text));
    }

    render(){
        const logo = require('../paper-plane.png');
        return (
                  <div>
                  <h1> Messages Display
                      <img src={logo} alt="paper plane icon"/>
                  </h1>
                  <p className="helpText"> Type your message here: </p>
                    <form onSubmit={this.handleSubmit} ref='form' align='center'>
                      <input type='text' ref='text' />
                      <input type='submit' value='Add Todo' />
                    </form>
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
      addMessage
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(InputBar);
