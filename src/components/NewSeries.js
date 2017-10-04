import React from 'react';

class NewSeries extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: null,
      volume: null
    };
  }

  updateForm = async ()=>{
    this.setState({
      title: this.refs.title.value,
      volume: Number(this.refs.volume.value)
    });
  }
  submit = async (event)=>{
    event.preventDefault()
    if(this.refs.title.value && this.refs.volume.value){
      this.props.submitCallback(this.state);
    }
  }
  cancel = async (event)=>{
    event.preventDefault()
    this.props.cancelCallback();
  }
  render(){
    return (
      <div className="pure-g newForm series">
        <form className="pure-form pure-u-1" onChange={this.updateForm}>
          <div className="pure-u-1"></div>
          <input type="text" placeholder="Series Title" className="pure-u-9-24" ref="title" required/>
          <input type="number" min = "1" placeholder="Volume" className="pure-u-3-24" ref="volume" required/><br/>
          <div className="pure-u-1"></div>
          <button className="pure-button pure-u-1-4 button-error cancel"  onClick={this.cancel}>CANCEL</button>
          <button className="pure-button pure-u-1-4 button-success submit"  onClick={this.submit}>SUBMIT</button>
        </form>
      </div>
    )
  }
}

export default NewSeries;
