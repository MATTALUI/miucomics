import React, { Component } from 'react';
import Navbar from './Navbar.js';
import SeriesShower from './SeriesShower.js'
import '../styles/Main.css';

class NewComic extends Component {
  constructor(props){
    super(props);
    this.state = {series:[]};
  }
  componentDidMount= async()=>{
    let call = await fetch('http://localhost:8000/comics/series')
    let series = await call.json();
    console.log(series);
    this.setState({series})
  }
  render() {

    return (
      <div className="App">
        <Navbar />
        <div className="pure-g">
          {this.state.series.map((series,i)=>{
            return <SeriesShower key={i} title={series.title} covers={series.issue_covers} volume={series.volume} id={series.id}/>
          })}
        </div>
      </div>
    );
  }
}

export default NewComic;
