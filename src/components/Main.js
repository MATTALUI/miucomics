import React, { Component } from 'react';
import Navbar from './Navbar.js';
import SeriesShower from './SeriesShower.js'
import NewSeries from './NewSeries';
import {Link} from 'react-router-dom';
import '../styles/Main.css';
import '../styles/index.css';

class NewComic extends Component {
  constructor(props){
    super(props);
    this.state = {
      series:[],
      newSeries: false
    };
  }
  componentDidMount= async()=>{
    let call = await fetch('http://localhost:8000/comics/series')
    let series = await call.json();
    this.setState({series})
  }
  submit = async (data)=>{
    console.log(data);
    this.setState({newSeries:false});
  }
  cancel = ()=>{
    console.log('cancel');
    this.setState({newSeries:false});
  }
  toggleNewSeriesForm=()=>{
    this.setState({newSeries:true});
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
        {this.state.newSeries?<NewSeries cancelCallback={this.cancel} submitCallback={this.submit}/>:<button style={{height: '10vh'}} className="pure-u-1-5 pure-button button-warning" onClick={this.toggleNewSeriesForm}>ADD NEW SERIES</button>}

      </div>
    );
  }
}

export default NewComic;
