import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App.js';
import NewComic from './components/NewForm.js';
import FourOhFour from './components/FourOhFour.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class View extends React.Component{
  render(){
    return (
        <Switch>
          <Route path="/" exact component={App}/>
          <Route path="/new" component={NewComic}/>
          <Route component={FourOhFour}/>
        </Switch>
    )
  }
}


ReactDOM.render( <Router><View/></Router>, document.getElementById('root'));
