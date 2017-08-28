import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from './components/Main.js';
import MainIssues from './components/MainIssues.js';
import NewSeries from './components/NewSeries.js';
import NewIssue from './components/NewIssue.js';
import StockForm from './components/StockForm.js';
import FourOhFour from './components/FourOhFour.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class View extends React.Component{
  render(){
    return (
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/new" exact component={NewSeries}/>
          <Route path="/meow" exact component={NewIssue}/>
          <Route path="/:seriesId/:seriesTitle" exact component={MainIssues}/>
          <Route path="/🐔" exact component={StockForm}/>
          <Route component={FourOhFour}/>
        </Switch>
    )
  }
}


ReactDOM.render( <Router><View/></Router>, document.getElementById('root'));
