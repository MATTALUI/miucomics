import React, { Component } from 'react';
import Navbar from './Navbar.js';
import '../styles/App.css';

class NewComic extends Component {
  constructor(props){
    super(props);
    this.state={
      image : 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/comic+cover.jpg'
    };
  }
  componentDidMount(){

  }
  addImage=()=>{
    // console.log(this.refs.addImage.files[0]);
    let form = new FormData();
    form.append('file', this.refs.addImage.files[0]);
    form.append('name', 'cover');
    console.log(form.get('file'));
    fetch('http://localhost:8000',{
      method: 'POST',
      body: form
    });
  }
  render() {

    return (
      <div className="App">
        <Navbar />
        <h1>MIX IT UP!</h1>
          <img src={this.state.image} alt="all american comic cover"/><br/>
          <input ref="addImage" onChange={this.addImage} type="file" accept="image/*"/>
      </div>
    );
  }
}

export default NewComic;
