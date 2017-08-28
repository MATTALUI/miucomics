import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{
  render(){
    return (
      <nav className="pure-g">
        <Link to="/">
          <img id="logo" src="/assets/miu-logo.png" alt="Mix It Up Comics Logo"  />
        </Link>
      </nav>
    )
  }
}

export default Navbar;
