import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/SeriesShower.css';

class SeriesShower extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageIndex: 0
    };
    setInterval(this.coverRight,15000);
  }
  coverLeft = ()=>{
    if(this.state.imageIndex === 0){
      this.setState({imageIndex: this.props.covers.length-1})
    }else{
      let newIndex = this.state.imageIndex-1;
      this.setState({imageIndex: newIndex});
    }
  }
  coverRight = ()=>{
    if(this.state.imageIndex === this.props.covers.length-1){
      this.setState({imageIndex: 0});
    }else{
      let newIndex = this.state.imageIndex+1;
      this.setState({imageIndex: newIndex});
    }
  }
  goToIssue = ()=>{
    console.log(this.props.id);
  }




  render(){
    return (
        <div className="pure-u-1-2 pure-u-md-1-3 seriesCard" onClick={this.goToIssue}>
          <div className="seriesContent">
            <br/>
            <div className="coverHolder">
              <img src ={this.props.covers[this.state.imageIndex]} alt={`cover art for ${this.props.title}'s issues`} className="seriesCover"/>
            </div>
            {false?
              <div className="coverControl">
                <div className="chooseArrow left" onClick={this.coverLeft}></div>
                <div className="chooseArrow right" onClick={this.coverRight}></div>
              </div>
            :null}
            <h3>{`${this.props.title} V${this.props.volume}`}</h3>
          </div>
        </div>
    )
  }

}
export default SeriesShower;
