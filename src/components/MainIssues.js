import React from 'react';
import Navbar from './Navbar.js';
import IssueShower from './IssueShower.js';
import '../styles/Main.css';

class MainIssues extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      issues: []
    }
  }
  componentDidMount= async ()=>{
    let call = await fetch(`http://localhost:8000/comics/series/${this.props.match.params.seriesId}`);
    let issues = await call.json();
    this.setState({issues})
  }
  render(){
    if (this.state.issues.length > 0) return (
      <div className="App">
        <Navbar/>
        <h1>{this.props.match.url.split('/')[2].split('-').join(' ')}</h1>
        <div className="pure-g">
          {this.state.issues.map((issue,i)=>{
            return <IssueShower key ={i} id={issue.id} number={issue.number} cover={issue.cover_image}/>
          })}
        </div>
      </div>
    )
    return (
      <div className = "App">
      <Navbar/>
        <h1>There are no issues in this series...</h1>
      </div>
    )
  }
}
export default MainIssues;
