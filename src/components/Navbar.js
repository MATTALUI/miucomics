import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{
  render(){
    return (
      <nav className="pure-g">
        <Link to="/">

        </Link>
        <button
        onClick={this.props.action}
        hidden={!this.props.show}
        className="pure-u-1-5 pure-button button-warning navButton pure-visible-l"
        >
        <i className="fa fa-plus" aria-hidden="true"></i> {this.props.buttonText}
        </button>
      </nav>
    )
  }
}

export default Navbar;
