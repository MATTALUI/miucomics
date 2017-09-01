import React, { Component } from 'react';
import Navbar from './Navbar.js';
import SeriesShower from './SeriesShower.js'
import NewSeries from './NewSeries';
import '../styles/Main.css';
import '../styles/index.css';

class NewComic extends Component {
  constructor(props){
    super(props);
    if(window.location.host.indexOf('herokuapp')>-1){
      this.host = 'http://miucomics-api.herokuapp.com';
    }else{
      this.host = 'http://localhost:8000'
    }
    this.state = {
      series:[],
      newSeries: false
    };
  }
  componentDidMount= async()=>{
    let call = await fetch(`${this.host}/comics/series`)
    let series = await call.json();
    this.setState({series})
  }
  submit = async (data)=>{
    let call = await fetch(`${this.host}/comics/series`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let newPost = await call.json();
    let copy = this.state.series.slice();
    copy.push(newPost);
    this.setState({newSeries:false, series: copy});
  }
  cancel = ()=>{
    this.setState({newSeries:false});
  }
  toggleNewSeriesForm=()=>{
    this.setState({newSeries:true});
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        {this.state.newSeries?<NewSeries cancelCallback={this.cancel} submitCallback={this.submit}/>:<button style={{height: '10vh'}} className="pure-u-1-5 pure-button button-warning" onClick={this.toggleNewSeriesForm}>ADD NEW SERIES</button>}
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
