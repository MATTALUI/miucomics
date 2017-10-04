import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from './components/Main.js';
import MainIssues from './components/MainIssues.js';
import NewSeries from './components/NewSeries.js';
import TheChicken from './components/TheChicken.js';
import FourOhFour from './components/FourOhFour.js';
import Login from './components/Login.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class View extends React.Component{
  constructor (props) {
    super(props);
    if(window.location.host.indexOf('herokuapp')>-1){
      this.host = 'http://miucomics-api.herokuapp.com';
    }else{
      this.host = 'http://localhost:8000'
    }
    this.state = {
      loggedIn: false,
      valid: true
    }
  }
  componentWillMount = async ()=>{
    let call = await fetch(`${this.host}/login`,{
      credentials: 'include'
    });
    let response = await call.json();
    this.setState({loggedIn: response});
  }
  login = async (loginInfo) =>{
    let call = await fetch(`${this.host}/login`,{
      method: "POST",
      body: JSON.stringify(loginInfo),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    });
    let response = await call.json();
    if(response){
      this.setState({loggedIn: true});
    }else{
      this.setState({valid:false});
    }
  }
  render = ()=>{
    if(this.state.loggedIn){
      return (
          <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/new" exact component={NewSeries}/>
            <Route path="/:seriesId/:seriesTitle" exact component={MainIssues}/>
            <Route path="/🐔" exact component={TheChicken}/>
            <Route component={FourOhFour}/>
          </Switch>
      )
    }else{
      return (
        <Login valid={this.state.valid} login={this.login}/>
      )
    }

  }
}
ReactDOM.render( <Router><View/></Router>, document.getElementById('root'));
