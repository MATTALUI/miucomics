import React from 'react';
import '../styles/Login.css';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userName: 'Name',
      password: 'Password'
    };
  }
  login = (event)=>{
    event.preventDefault();
    this.props.login(this.state);
  }
  updateForm = () =>{
    this.setState({
      userName: this.refs.userName.value,
      password: this.refs.password.value
    });
  }
  render(){
    return (
      <div>
        <div className="pure-g">
          <div className="pure-u-4-24"></div>
          <div className="pure-u-2-3 login">
            <div className="logoHolder">
              <img className="loginLogo" src="/assets/miu-logo.png" alt="Mix It Up Comics Logo"  />
            </div>
            <form onChange={this.updateForm} className="pure-form">
            <div className="pure-u-1-4"></div>
            <input ref="userName" className="pure-u-1-2" type="text" placeholder="Username"/><br/>
            <div className="pure-u-1-4"></div>
            <input ref="password" placeholder="Password" className="pure-u-1-2" type="password" /><br/>
            <div className="pure-u-9-24"></div>
            <button onClick={this.login} className="pure-button button-warning pure-u-1-4">LOG IN</button>
            </form>

          </div>
          {this.props.valid?null:<h3 className="pure-u-1 error">Invalid Login Information.</h3>}
        </div>
      </div>
    )
  }
}
