import React from 'react';
import Navbar from './Navbar.js';
import IssueShower from './IssueShower.js';
import NewIssue from './NewIssue.js';
import '../styles/Main.css';

class MainIssues extends React.Component{
  constructor(props){
    super(props);
    if(process.env.NODE_ENV === 'production'){
      this.host = 'http://miucomics.herokuapp.com/';
    }else{
      this.host = 'http://localhost:8000'
    }
    this.state ={
      issues: [],
      addNewIssue: false,
      seriesId: this.props.match.params.seriesId,
      seriesTitle: this.props.match.params.seriesTitle.split('-').join(' ')
    }
  }
  componentDidMount= async ()=>{
    let call = await fetch(`${this.host}/comics/series/${this.state.seriesId}`);
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
  newIssueHandler = (newIssueInfo)=>{
    let copy = this.state.issues.slice();
    copy.push(newIssueInfo);
    this.setState({
      issues: copy,
      addNewIssue: false
    });
  }
  render(){
    if (this.state.issues.length > 0) return (
      <div>
        <Navbar/>
        {this.state.addNewIssue?<NewIssue cancel={this.toggleNewIssueForm} seriesId={Number(this.state.seriesId)} seriesTitle={this.state.seriesTitle}
        newIssueHandler={this.newIssueHandler}/>:null}
        <div className="App">
          <h1>{this.state.seriesTitle}</h1>
          {this.state.addNewIssue?null:<button style={{height: '10vh'}} className="pure-u-1-5 pure-button button-warning" onClick={this.toggleNewIssueForm}>ADD NEW Issue</button>}
          <div className="pure-g">
            {this.state.issues.map((issue,i)=>{
              return <IssueShower key ={i} id={issue.id} number={issue.number} cover={issue.cover_image} series={this.state.seriesTitle} stock={issue.stock}/>
            })}
          </div>
        </div>
      </div>
    )
    return (
      <div>
      <Navbar/>
      {this.state.addNewIssue?<NewIssue seriesId={Number(this.state.seriesId)} cancel={this.toggleNewIssueForm} seriesTitle={this.state.seriesTitle}
      newIssueHandler={this.newIssueHandler}/>:null}
      <div className = "App">
        <h1>There are no issues in this series...</h1>
        {this.state.addNewIssue?null:<button style={{height: '10vh'}} className="pure-u-1-5 pure-button button-warning" onClick={this.toggleNewIssueForm}>ADD NEW Issue</button>}
      </div>
      </div>
    )
  }
}
export default MainIssues;
