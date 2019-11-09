import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';


import Login from './login';
import TasksNew from './tasks/new';
import TaskList from './tasks/index';
import store from './store';
import JobList from './jobs';
import ApproveList from './tasks/approve';
import Notifications from './tasks/notifications'

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/jobs" exact activeClassName="active" className="nav-link">
                Jobs
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/tasks/new" exact activeClassName="active" className="nav-link">
                SubmitTasks
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/tasks/index" exact activeClassName="active" className="nav-link">
                CheckSheets
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/tasks/approve" exact activeClassName="active" className="nav-link">
                ApproveSheetsForManager
              </NavLink>
            </Nav.Item> 
            <Nav.Item>
              <NavLink to="/tasks/notifications" exact activeClassName="active" className="nav-link">
                Notifications
              </NavLink>
            </Nav.Item>
          </Nav>
       
      
          <Session />
      
      </Navbar>

      <Switch>
        
      <Route exact path="/">
          <h1>Welcome to TimeSheet Application!!</h1>
          <br/>
          <h1>Kindly Authenticate!!</h1>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/tasks/new">
          <TasksNew />
        </Route>

        <Route exact path="/tasks/index">
        <TaskList />
        </Route>

        <Route exact path="/jobs">
        <JobList />
        </Route>
        

        <Route exact path="/tasks/approve">
        <ApproveList />
        </Route>
        
        <Route exact path="/tasks/notifications">
        <Notifications />
        </Route>
      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to="/login" exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
});
