import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_task } from '../ajax';
import store from '../store';


function state2props(state) {
  //console.log("inside new .jsx" + state.forms.new_task);
  

  return state.forms.new_task;
}
class TasksNew extends React.Component {
  constructor(props) {
    super(props);
  
    let storeGot = store.getState();
    let userid = 0;
   // console.log(storeGot);
    //if(storeGot){
      //userid = storeGot.user_name;
      //console.log( "username" + userid);
    //}

    //console.log(store.getState().session.user_name)
    //console.log("props " + props);
    this.state = {
      redirect: null,
    };
  }

  redirect(path) {
    this.setState({
      redirect: path,
    });
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_TASK',
      data: data,
    });
  }

  

  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    let {jobcode, hours, errors} = this.props;
    let error_msg = null;
    
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
      //error_msg = null;
    }

    //console.log(this.state)
    return (
      <div>
        <h1>Enter Your Efforts Here!! (Check Jobs Tab for job code)</h1>
        { error_msg }
        <Form.Group controlId="jobcode">
          <Form.Label>Job Code</Form.Label>
          <Form.Control type="text" onChange={
            (ev) => this.changed({jobcode: ev.target.value})} />
        </Form.Group>
        <Form.Group controlId="hours">
          <Form.Label>Hours</Form.Label>
          <Form.Control type="text" onChange={
            (ev) => this.changed({hours: ev.target.value})} />
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary" onClick={() => submit_task(this)}>
            Submit
          </Button>
        </Form.Group>
      </div>
    );
  }
}



export default connect(state2props)(TasksNew);
