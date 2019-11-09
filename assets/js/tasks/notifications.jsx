import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_tasks, update_task } from '../ajax';
import store from  '../store';


class Notifications extends React.Component  {
    constructor(props) {
      super(props);
      //console.log("indjdjd");
      this.state = {
        list_tasks_new: [],
        items: ""
      };      
    }



   componentDidMount(){
    var resp =  list_tasks().then((resp) => {
    var dataDisplay = resp.data;
  
    
    this.setState({list_tasks_new: resp.data})});
    //console.log("response" + resp);
   }



    render(){
        let localStore = store.getState();
        let managerId = localStore.session;
        if(managerId == null){
          return (<div><h1>Kindly Login First</h1></div>);
        }
        managerId = localStore.session.user_id;
        if(managerId != 1){
         return (<div><h1>You are not the Manager, You dont have the rights!!</h1></div>);
        }
     var tab = []
      
    const listItems = this.state.list_tasks_new.map((d)=> {
        var hours = d.hours;
        console.log("Notoficati" + hours);
        if(hours < 8){
           return <tr><td>{d.job_code}</td><td>{d.hours}</td><td>{d.manager}</td></tr>
        } 
    })
        tab.push(<table className="table table-dark"><thead><tr><th>Job Code</th><th>Hours</th><th>User ID</th></tr></thead><tbody>{listItems}</tbody></table>)
   
    
     

    // var tab = []
   // const listItems = this.state.list_tasks_new.map((d)=> <tr><td>{d.job_code}</td><td>{d.hours}</td><td>{JSON.stringify(d.approved)}</td><td><button onClick = {() => update_task(d)}>Approve</button></td></tr>)
   // tab.push(<table className="table table-dark"><thead><tr><th>Job Code</th><th>Hours</th><th>Current Status</th><th>Approve/Reject</th></tr></thead><tbody>{listItems}</tbody></table>)
        return(
            <div>
              <h1>Approve Timesheets(After Approving go to Check Sheets For Status)</h1>
            {tab}
            </div>
        )
    }
}
    
export default Notifications;