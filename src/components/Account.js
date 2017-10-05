import React from 'react';
import Navbar from './Navbar.js';
import NewPasswordForm from './NewPasswordForm.js';

export default class Account extends React.Component{
  constructor (props) {
    super(props);
    if(window.location.host.indexOf('herokuapp')>-1){
      this.host = 'http://miucomics-api.herokuapp.com';
    }else{
      this.host = 'http://localhost:8000'
    }
    this.state = {
      id: null,
      username: '',
      admin: false,
      createNewPassword: false,
      message: null
    }
  }
  componentWillMount = async () =>{
    let call = await fetch(`${this.host}/login/info`,{
      method: 'GET',
      credentials: 'include'
    });
    let response = await call.json();
    this.setState(response);
  }
  toggleNewPassword = () => {
    this.setState({createNewPassword: !this.state.createNewPassword});
  }
  submit = async(passwords) => {
    let call = await fetch(`${this.host}/login`,{
      method: 'PATCH',
      body: JSON.stringify(passwords),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let message = await call.json();
    if(message.class === 'success'){
      this.setState({message, createNewPassword: false});
    }else{
      this.setState({message});
    }
  }
  setMessage = (message)=>{
    this.setState({message});
  }
  render(){
    if(this.state.id != null){
      return (
        <div>
          <Navbar show={false} buttonText="USER"/>

          <table className="pure-table accountInfo">
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>ADMIN?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.username}</td>
                <td>{this.state.admin.toString()}</td>
              </tr>
            </tbody>
          </table>
          {this.state.createNewPassword?<NewPasswordForm cancel={this.toggleNewPassword} submit={this.submit} message={this.setMessage}/>:
            <div className = "App">
              <button className="pure-button button-warning" onClick={this.toggleNewPassword}>Change Password</button>
            </div>
          }
          {this.state.message?
            <h3 className={this.state.message.class}>{this.state.message.text}</h3>
            :null
          }
        </div>
      )
    }else{
      return (
        <div>
          <Navbar show={false} buttonText="USER"/>
          <div className="App">
            <img src="/assets/loading.gif" className="loader" alt="loading spinner"/>
          </div>
        </div>
      )
    }
  }
}
