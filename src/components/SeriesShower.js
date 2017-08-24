import React from 'react';

class SeriesShower extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageIndex: 0
    };
    console.log(this.props);
  }

  render(){
    return (
      <div className="pure-u-1-5 pure-u-md-1-3">
        <h1>{this.props.title}</h1>
        <img src ={this.props.covers[this.state.imageIndex]} alt={`cover art for ${this.props.title}'s issues`}/>
      </div>
    )
  }

}
export default SeriesShower;
