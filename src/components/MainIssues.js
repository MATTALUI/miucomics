import React from 'react';
import Navbar from './Navbar.js';
import IssueShower from './IssueShower.js';
import NewIssue from './NewIssue.js';
import '../styles/Main.css';

class MainIssues extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      issues: [],
      addNewIssue: false
    }
  }
  componentDidMount= async ()=>{
    let call = await fetch(`http://localhost:8000/comics/series/${this.props.match.params.seriesId}`);
    let issues = await call.json();
    this.setState({issues})
  }
  toggleNewIssueForm = ()=>{
    if(this.state.addNewIssue){
      this.setState({addNewIssue: false});
    }else{
      this.setState({addNewIssue: true});
    }
  }
  render(){
    if (this.state.issues.length > 0) return (
      <div>
        <Navbar/>
        {this.state.addNewIssue?<NewIssue cancel={this.toggleNewIssueForm} />:null}
        <div className="App">
          <h1>{this.props.match.url.split('/')[2].split('-').join(' ')}</h1>
          {this.state.addNewIssue?null:<button style={{height: '10vh'}} className="pure-u-1-5 pure-button button-warning" onClick={this.toggleNewIssueForm}>ADD NEW Issue</button>}
          <div className="pure-g">
            {this.state.issues.map((issue,i)=>{
              return <IssueShower key ={i} id={issue.id} number={issue.number} cover={issue.cover_image}/>
            })}
          </div>
        </div>
      </div>
    )
    return (
      <div>
      <Navbar/>
      {this.state.addNewIssue?<NewIssue cancel={this.toggleNewIssueForm} />:null}
      <div className = "App">
        <h1>There are no issues in this series...</h1>
        {this.state.addNewIssue?null:<button style={{height: '10vh'}} className="pure-u-1-5 pure-button button-warning" onClick={this.toggleNewIssueForm}>ADD NEW Issue</button>}
      </div>
      </div>
    )
  }
}
export default MainIssues;
