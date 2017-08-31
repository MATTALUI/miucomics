import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from './components/Main.js';
import MainIssues from './components/MainIssues.js';
import NewSeries from './components/NewSeries.js';
import TheChicken from './components/TheChicken.js';
import FourOhFour from './components/FourOhFour.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class View extends React.Component{
  render(){
    return (
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/new" exact component={NewSeries}/>
          <Route path="/:seriesId/:seriesTitle" exact component={MainIssues}/>
          <Route path="/🐔" exact component={TheChicken}/>
          <Route component={FourOhFour}/>
        </Switch>
    )
  }
}


ReactDOM.render( <Router><View/></Router>, document.getElementById('root'));
