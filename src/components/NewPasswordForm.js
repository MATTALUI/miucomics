import React from 'react';

export default class NewPasswordForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: '',
      newPassword: '',
      confirmNew: '',
    }
  }
  cancel = (event)=>{
    event.preventDefault();
    this.props.cancel();
  }
  submit = (event)=>{
    event.preventDefault();
    console.log(this.state);
    this.props.submit();
  }
  updateForm = ()=>{
    this.setState({
      current: this.refs.current.value,
      newPassword: this.refs.new.value,
      confirmNew: this.refs.confirm.value
    });
  };
  render(){
    return (
      <div className="App">
        <form className="pure-form" onChange={this.updateForm}>
          <input ref="current" type="password" placeholder="Current Password"/><br/>
          <input ref="new" type="password" placeholder="New password"/><br/>
          <input ref="confirm" type="password" placeholder="Confirm New Password"/><br/>
          <button className="pure-button button-error" onClick={this.cancel}>Cancel</button>
          <button className="pure-button button-success" onClick={this.submit}>Save</button>
        </form>
      </div>
    )
  }
}
