import React from 'react';
import Navbar from './Navbar.js';
import IssueShower from './IssueShower.js';
import NewIssue from './NewIssue.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles/Main.css';

class MainIssues extends React.Component{
  constructor(props){
    super(props);
    if(window.location.host.indexOf('herokuapp')>-1){
      this.host = 'http://miucomics-api.herokuapp.com';
    }else{
      this.host = 'http://localhost:8000'
    }
    this.state ={
      issues: [],
      checkedApi: false,
      addNewIssue: false,
      seriesId: this.props.match.params.seriesId,
      seriesTitle: this.props.match.params.seriesTitle.split('-').join(' ')
    }
  }
  componentDidMount= async ()=>{
    let call = await fetch(`${this.host}/comics/series/${this.state.seriesId}`);
    let issues = await call.json();
    this.setState({issues, checkedApi:true})
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
  deleteIssue = async (index)=>{
    confirmAlert({
      title: 'Delete Issue',
      message: 'This will delete this issue on all applications that it\'s registered with. This can not be undone. Are you sure?',
      confirmLabel: 'DELETE',
      cancelLabel: 'CANCEL',
      onConfirm: async ()=>{
        let copy = this.state.issues.slice();
        let deletedPost = copy[index];
        await fetch(`${this.host}/comics/issues/${deletedPost.id}`,{
          method: "DELETE"
        });
        copy.splice(index,1);
        this.setState({issues:copy});
      }
    });
  }
  editIssue = async (issueId,issueEdit)=>{
    let body;
    let headers;
    if(issueEdit.cover_image && issueEdit.cover_image.type === 'upload'){
      issueEdit.cover_image = issueEdit.cover_image.value;
      body = new FormData();
      for(let key in issueEdit){
        body.append(key, issueEdit[key]);
      }
      body.append('seriesTitle', this.props.match.params.seriesTitle);
      if(body.get('number')===null){
        let issueNumber = this.state.issues.find((issue)=>(issue.id===issueId)).number;
        body.append('number',issueNumber);
      }
    }else{
      if(issueEdit.cover_image){
        issueEdit.cover_image = issueEdit.cover_image.value;
      }
      body = JSON.stringify(issueEdit);
      headers = {
        'Content-Type': 'application/json'
      }
    }
    let request = await fetch(`${this.host}/comics/issues/${issueId}`,{
      method: 'PATCH',
      body,
      headers
    });
    let response = await request.json();
    let copy = this.state.issues.slice();
    let relevantIssue = copy.find((issue)=>(issue.id===response.id));
    for(let key in response){
      if(response[key] !== relevantIssue[key]){
        relevantIssue[key] = response[key];
      }
    }
    this.setState({issues:copy});
  }
  toggleShopify = async (issueId)=>{
    let request = await fetch(`${this.host}/comics/issues/${issueId}`,{
      method: 'PATCH',
      body: JSON.stringify({
        shopify: 'toggle',
        seriesTitle: this.props.match.params.seriesTitle
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let response = await request.json();
    console.log(response);
  }
  deleteSeries = async ()=>{
    confirmAlert({
      title: 'Delete Series',
      message: 'This will delete this series and all of its issues on all applications that they\'re registered with. This can not be undone. Are you sure?',
      confirmLabel: 'DELETE',
      cancelLabel: 'CANCEL',
      onConfirm: async ()=>{
        let seriesId = this.props.match.params.seriesId;
        await fetch(`${this.host}/comics/series/${seriesId}`,{
          method: 'DELETE'
        });
        window.location = '/';
      }
    });
  }
  render(){
    if (this.state.checkedApi) return (
      <div>
        <Navbar action={this.toggleNewIssueForm} buttonText={'ISSUE'} show={true}/>
        {this.state.addNewIssue?<NewIssue cancel={this.toggleNewIssueForm} seriesId={Number(this.state.seriesId)} seriesTitle={this.state.seriesTitle}
        newIssueHandler={this.newIssueHandler}/>:null}
        <div className="App">
          <h1>{this.state.seriesTitle}</h1>

          <div className="pure-g">
            {this.state.issues.length?this.state.issues.map((issue,index)=>{
              return <IssueShower key ={index} index={index} id={issue.id} number={issue.number} cover={issue.cover_image} series={this.state.seriesTitle} stock={issue.stock} shopify={issue.shopify} ebay={issue.ebay} deleteIssue={this.deleteIssue} pub_date={issue.pub_date} editIssue={this.editIssue}
              toggleShopify={this.toggleShopify}/>
            }):<h3 className="pure-u-1">There are no issues in this series.</h3>}
          </div>
        </div>
        <button className="button-error deleteSeries" onClick={this.deleteSeries}>Delete this series.</button>
      </div>
    )
    return (
      <div>
        <Navbar action={this.toggleNewIssueForm} buttonText={'ISSUE'} show={true}/>
        {this.state.addNewIssue?<NewIssue seriesId={Number(this.state.seriesId)} cancel={this.toggleNewIssueForm} seriesTitle={this.state.seriesTitle}
        newIssueHandler={this.newIssueHandler}/>:null}
        <div className = "App">
          <h1>{this.state.seriesTitle}</h1>
          <img src="/assets/loading.gif" className="loader" alt="loading spinner"/>
        </div>
      </div>
    )
  }
}
export default MainIssues;
