import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Shower.css';

class IssueShower extends React.Component{
  render(){
    return (
      <Link className="pure-u-1-2 pure-u-md-1-3" to={`/`}>
        <div className=" seriesCard">
          <div className="seriesContent">
            <br/>
            <div className="coverHolder">
              <img src ={this.props.cover} alt={`cover art for volume ${this.props.title}`} className="seriesCover"/>
            </div>
            {false?
              <div className="coverControl">
                <div className="chooseArrow left" onClick={()=>{}}></div>
                <div className="chooseArrow right" onClick={()=>{}}></div>
              </div>
            :null}
            <h3>{`#${this.props.number}`}</h3>
          </div>
        </div>
        </Link>
    )
  }
}

export default IssueShower;
