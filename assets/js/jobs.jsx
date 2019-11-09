import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_jobs} from './ajax'



class JobList extends React.Component  {
    constructor(props) {
      super(props);
      //console.log("indjdjd");
      this.state = {
        job_list: [],
        items: ""
      };      
    }



   componentDidMount(){
    var resp =  list_jobs().then((resp) => {
      var dataDisplay = resp.data;
    
      
      this.setState({job_list: resp.data})});;;
    //console.log("response" + resp);
   }



    render(){
   
      console.log("jobs " + this.state.job_list)
      var tab = []
      const listItems = this.state.job_list.map((d)=> <tr><td>{d.job_code}</td><td>{d.budget}</td><td>{d.name}</td><td>{d.description}</td></tr>)
      tab.push(<table className="table table-dark"><thead><tr><th>Job Code</th><th>Hours</th><th>Name</th><th>Description</th></tr></thead><tbody>{listItems}</tbody></table>)
        return(
            <div>
              <h1>Jobs</h1>
              {tab}
            </div>
        )
    }
}
    
export default JobList;