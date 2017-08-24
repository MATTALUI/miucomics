import React from 'react';
import Navbar from './Navbar.js';

class NewComic extends React.Component{
  showChange=()=>{
    console.log(this.refs);
    console.log(this.refs.cover.files[0]);
  }
  render(){
    return (
      <div>
      <Navbar/>
        <div className="pure-g">
          <div className="pure-u-1 pure-u-md-2-3">
            <form className="pure-form" onChange={this.showChange}>
              <input type="text" placeholder="Title" className="pure-u-1" ref="title"/>
              <input type="text" placeholder="Issue" className="pure-u-1-2" ref="issue"/>
              <input type="text" placeholder="Series" className="pure-u-1-2" ref="series"/>
              <input type="date" className="pure-u-1" ref="date"/>
              <input type ="file" ref="cover" className="pure-u-1"/>
            </form>
          </div>
          <div className="pure-hidden-sm pure-hidden-xs pure-u-md-1-3">
            <button className="pure-button button-error" hidden={false}>BUTTON TEST</button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewComic;
