import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{
  constructor(props){
    super(props);
    if(window.location.host.indexOf('herokuapp')>-1){
      this.host = 'http://miucomics-api.herokuapp.com';
    }else{
      this.host = 'http://localhost:8000'
    }
  }
  logout = ()=>{
    fetch(`${this.host}/login`,{
      method: 'DELETE',
      credentials: 'include'
    });
    window.location.pathname = '/';
  }
  render(){
    return (
      <nav className="pure-g">
        <Link to="/">
          <img id="logo" src="/assets/miu-logo.png" alt="Mix It Up Comics Logo"  />
        </Link>
        <button
        onClick={this.props.action}
        hidden={!this.props.show}
        className="pure-u-1-5 pure-button button-warning navButton pure-visible-l"
        >
        <i className="fa fa-plus" aria-hidden="true"></i> {this.props.buttonText}
        </button>
        <Link to="/account" className="pure-u-1-5 pure-visible-l account">
          <button className="pure-button button-warning navButton pure-u-1 ">ACCOUNT</button>
        </Link>
        <div className="pure-u-1-5 pure-visible-l account">
          <button className="pure-button button-error navButton pure-u-1 " onClick={this.logout}>LOGOUT</button>
        </div>
      </nav>
    )
  }
}

export default Navbar;
